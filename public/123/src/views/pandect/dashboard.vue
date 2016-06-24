<template>
	<div class="m-item">
		<div class="item-con">
			<div class="m-overview">
				<div class="overview-title">宏观数据</div>
				<div class="u-loading" v-if="loadingMacroData">数据加载中...</div>
				<template v-else>
					<div class="u-loading-error" v-if="!macroData">数据加载失败</div>
					<ul class="m-cell-list" v-else>
						<li class="cell" v-for="(key, value) in macroData">
							<span class="tt">{{dataLabels[key]}}总数</span>
							<span class="data">{{value}}</span>
						</li>
					</ul>
				</template>
			</div>
			
			<div class="m-overview">
				<div class="overview-title">近六周周活跃各项指标</div>
				<div class="u-loading" v-if="loadingMacroData">数据加载中...</div>
				<template v-else>
					<div class="u-loading-error" v-if="!macroActiveData">数据加载失败</div>
					<table class="table table-bordered table-hover" v-else>
						<thead>
							<tr>
								<th>日期范围</th>
								<th>学校</th>
								<th>教室</th>
								<th>老师</th>
								<th>学生</th>
								<th>班级</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="data in macroActiveData">
								<td>{{data.start_datetime}}至{{data.end_datetime}}</td>
								<td>{{data.school}}</td>
								<td>{{data.music_class}}</td>
								<td>{{data.teacher}}</td>
								<td>{{data.student}}</td>
								<td>{{data.classroom}}</td>
							</tr>
						</tbody>
					</table>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../../api/'
	import utils from '../../libs/utils.js'

	export default {
		data (){
			return {
				dataLabels: {
					school_num: '学校', 
					mc_num: '教室', 
					teacher_num: '老师', 
					stu_num: '学生', 
					classroom_num: '班级',
				},
				macroData: {
					school_num: 0, 
					mc_num: 0,
					teacher_num: 0, 
					stu_num: 0, 
					classroom_num: 0, 
				},
				macroActiveData: [],
				loadingMacroData: true,
				loadingMacroActiveData: true
			}
		},
		created (){
			this.getMacroData()
			this.getMacroActiveData()
		},
		methods: {
			getMacroData (){
				this.loadingMacroData = true
				this.$http.post(api.getMacroData).then(({data}) => {
					if(data.meta.code === 0){
						this.macroData = data.data
					}else{
						throw new Error('getStatisticSchool errCode: ' + data.meta.code)
					}
				}).catch((err) => {
					console.error(err)
					this.macroData = null
				}).finally(() => {
					this.loadingMacroData = false
				})
			},
			getMacroActiveData (){
				this.loadingMacroActiveData = true
				this.$http.post(api.getMacroActiveData).then(({data}) => {
					if(data.meta.code === 0){
						this.macroActiveData = data.data
					}else{
						throw new Error('getStatisticSchool errCode: ' + data.meta.code)
					}
				}).catch((err) => {
					console.error(err)
					this.macroActiveData = null
				}).finally(() => {
					this.loadingMacroActiveData = false
				})
			}
		}
	}
</script>
<style lang="less">
	.m-overview{
		padding-bottom: 10px;
		.overview-title{
			line-height: 40px;
			font-size: 16px;
		}
	}
    .m-cell-list{
    	margin: 0 -5px;
    	overflow: hidden;
    	.cell{
    		display: inline-block;
		    margin: 0 5px 10px;
		    padding: 10px;
		    width: 120px;
		    height: 80px;
		    vertical-align: top;
		    border-radius: 4px;
		    color: #fff;
		    background-color: #59D690;
		    line-height: 30px;
		    -webkit-transition: all 0.3s ease;
		    transition: all 0.3s ease;
	    	text-align: center;
		    .tt{
		    	display: block;
	    	    font-size: 16px;
		    }
		    .data{
		    	display: block;
		    	font-size: 14px;
		    }
    	}
    }
    .u-loading, .u-loading-error{
    	margin: 10px 0;
    	font-size: 14px;
    	color:#666;
    }
    .u-loading-error{
    	color:#f30;
    }
</style>