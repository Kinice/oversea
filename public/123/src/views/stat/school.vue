<template>
	<div class="m-item">
		<div class="item-tit">
			<h2 class="tit cursor" v-el:tit @click="fnShowSizer()">机构统计<i class="fa fa-caret-down v-caret"></i></h2>
		</div>
		<div class="item-con">
			<grid :columns="gridOption.columns" :data="gridOption.data" :filter-key="query" :item-actions="gridOption.itemActions" :break-word="true" :on-each-side="3"></grid>
		</div>
	</div>

	<spinner :size="'md'" text="正在查询..." v-ref:spinner></spinner>
	<sizer :show.sync="showSizer" :x="sizerX" :y="sizerY"></sizer>
	<modal title="机构详情" :show.sync="showModal" cancel-text="关闭" :show-ok-text="false" effect="fade" width="800">
		<div slot="modal-body" class="modal-body">
			<div class="m-show-text">
				<p>机构名称：{{viewSchoolData.name}}</p>
				<p>机构代码：{{viewSchoolData.code}}</p>
				<p>机构规模：{{viewSchoolData.student_num || 0}}个学生</p>
				<p>机构地址：{{viewSchoolData.address}}</p>
				<p>负责人：{{viewSchoolData.contact_name}}</p>
				<p>联系电话：{{viewSchoolData.phone}}</p>
				<p>教室详情：<span v-for="classroom in viewSchoolData.classrooms" class="label" :class="classroom.is_install?'bg-green':'bg-red'">{{classroom.name}}({{classroom.capacity}})</span></p>
			</div>
		</div>
		<div slot="modal-footer" class="modal-footer">
			<button type="button" class="btn btn-default" @click="showModal=false">关闭</button>
		</div>
	</modal>
	
</template>
<script>
	import api from '../../api/'
	import utils from '../../libs/utils.js'

	export default{
		data (){
			return {
				showModal: false,
				showSizer: false,
				sizerX: 0,
				sizerY: 0,

				viewSchoolData: {},

				gridOption: {
					columns: [{
						key: 'name',
						label: '机构名称'
					},{
						key: 'school_type',
						label: '机构类型'
					},{
						key: 'area',
						label: '地区'
					},{
						key: 'created_at',
						label: '创建日期'
					},{
						key: 'classroom_cnt',
						label: '教室数'
					},{
						key: 'class_cnt',
						label: '班级数'
					},{
						key: 'active_class_7',
						label: '近7天活跃班级'
					},{
						key: 'valid_class',
						label: '有效班级数'
					},{
						key: 'student_cnt',
						label: '学生数'
					},{
						key: 'is_trained',
						label: '是否培训'
					}],
					itemActions: [
						{ name: 'view-item', label: '详情', class: 'btn btn-success btn-xs' },
                    ],
					data: []
				}
			}
		},
		methods: {
			fnShowSizer (){
				var crect = this.$els.tit.getBoundingClientRect()
				this.sizerX = crect.left;
				this.sizerY = crect.top + crect.height;

				this.showSizer = true;
			},
			viewProfile (id){
				this.$http.post(api.getSchoolDetail, {
					id: id
				}).then(({data}) => {
					if(data.meta.code === 0){
						this.viewSchoolData = data.data
						this.$refs.spinner.hide()
						this.showModal = true
					}else{
						throw new Error('getSchoolDetail errCode: ' + data.meta.code)
					}
				}).catch((err) => {
					console.error(err)
					utils.alert('查询失败')
				})
			}
		},
		events: {
			'searchSchool' (data){
				//显示spinner
				this.$refs.spinner.show()

				this.$http.post(api.getStatisticSchool, data).then(({ data }) => {
					if(data.meta.code === 0){
						this.gridOption.data = data.data
					}else{
						throw new Error('getStatisticSchool errCode: ' + data.meta.code)
					}
				}).catch((err) => {
					console.error(err)
					utils.alert('查询失败')
					this.gridOption.data = []
				}).finally(() => {
					this.$refs.spinner.hide() //无论查询结果怎样，隐藏spinner
				})
			},
			'grid:action' (action, data){
				if(action == 'view-item'){
					this.viewProfile(data.id)
				}
			}
		},
		components: {
			sizer: require('../../components/Sizer.vue'),
			grid: require('../../components/Grid.vue'),
			spinner: require('../../components/vue-strap/Spinner.vue'),
			modal: require('../../components/vue-strap/Modal.vue'),
		}
	}
</script>
<style lang="less">
	.m-show-text{
		p{
			margin-top: 10px;
		}
		.bg-green{
			background-color: #00a65a !important;
		}
		.bg-red{
			background-color: #dd4b39 !important;
		}
	}
</style>