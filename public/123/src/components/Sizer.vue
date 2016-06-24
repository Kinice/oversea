<template>
	<div class="g-popup" v-show="show" :style="{left: x+'px',top: y+'px'}"
		transition="fade">
		<div class="m-layer-sizer">
			<div class="sizer-tit">
				<h2>筛选条件</h2>
				<div class="ctrl">
					<i class="fa fa-close v-close" @click="show=false"></i>
				</div>
			</div>
			<div class="sizer-con">
				<form class="form-horizontal" style="width:600px;" @submit.prevent="search">
					<div class="form-group">
						<label class="col-sm-2 control-label">地区</label>
						<div class="col-sm-10">
							<div class="form-inline">
								<select class="form-control" v-model="searchFileds.province">
									<option v-for="item in cityData" :name="item.id" :value="item.name">{{item.name}}</option>
					            </select>
					            <select class="form-control" v-model="searchFileds.city">
									<option v-for="item in cities" :name="item.id" value="{{item.name}}">{{item.name}}</option>
					            </select>
				            </div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">机构类型</label>
						<div class="col-sm-4">
							<select class="form-control" v-model="searchFileds.school_type">
								<option value="">所有</option>
								<option value="1">幼儿园</option>
								<option value="2">培训机构</option>
								<option value="4">琴行</option>
								<option value="5">代理商</option>
				            </select>
						</div>
						<label class="col-sm-2 control-label">安装状态</label>
						<div class="col-sm-4">
							<select class="form-control" v-model="searchFileds.install_status">
				            	<option value="">所有</option>
				            	<option value="1">已安装</option>
				            	<option value="2">未安装</option>
				            </select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">参加培训</label>
						<div class="col-sm-4">
							<select class="form-control" v-model="searchFileds.is_trained">
					            <option value="">所有</option>
					            <option value="1">已参加</option>
					            <option value="2">未参加</option>
				            </select>
						</div>
						<label class="col-sm-2 control-label">班级数量</label>
						<div class="col-sm-4">
							<select class="form-control" v-model="searchFileds.class_cnt">
				            	<option value="">所有</option>
				            	<option value="3">达到3个班</option>
				            	<option value="2">不到3个班</option>
				            </select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">活跃班级</label>
						<div class="col-sm-4">
							<select class="form-control" v-model="searchFileds.last_active_class_days">
				            	<option value="">所有</option>
	            	            <option value="7">近7天内活跃</option>
	            	            <option value="30">近30天内活跃</option>
				            </select>
						</div>
						<label class="col-sm-2 control-label">有效班级</label>
						<div class="col-sm-4">
							<select class="form-control" v-model="searchFileds.valid_class">
								<option value="">所有</option>
								<option value="1">有有效班级</option>
								<option value="2">无有效班级</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">上课进度</label>
						<div class="col-sm-4">
							<div class="form-inline">
								<label for="">从</label>
								<input type="number" class="form-control" min="0" max="100" placeholder="0" v-model="searchFileds.lesson_progress_from">
								<label for="">到</label>
								<input type="number" class="form-control" min="0" max="100" placeholder="100" v-model="searchFileds.lesson_progress_to">
							</div>
						</div>
						<label class="col-sm-2 control-label">创建时间</label>
						<div class="col-sm-4">
							<datepicker
								:value.sync="searchFileds.created_at_from"
								:format="'yyyy-MM-dd'"
								:width="'100%'"
								:show-reset-button="true"></datepicker>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">关键词</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" placeholder="名称、代码、地址、联系人、联系电话" v-model="searchFileds.keyword">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<button type="submit" class="btn btn-info">查询</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import cityData from '../api/city.js'

	export default{
		props: {
			show: {
				type: Boolean,
				twoWay: true,
				default: false
			},
			x: Number,
			y: Number
		},
		data (){
			return {
				searchFileds: {
					province: '全国',
					city: '全省',
					created_at_from: '',
					school_type: '',
					install_status: '',
					is_trained: '',
					class_cnt: '',
					last_active_class_days: '',
					valid_class: '',
					lesson_progress_from: 0,
					lesson_progress_to: 100,
					keyword: '',
				},

				cityData: cityData,
			}
		},
		ready (){
			this.$dispatch('searchSchool', this.searchFileds)
		},
		computed: {
			cities (){
				var cities = this.queryCities(this.searchFileds.province)
				this.searchFileds.city = cities[0].name
				return this.queryCities(this.searchFileds.province)
			}
		},
		methods: {
			search (){
				this.$dispatch('searchSchool', this.searchFileds)
				this.show = false
			},
			queryCities (provinceName){
				for(var i = 0; i < this.cityData.length; i++){
					if(this.cityData[i].name == provinceName){
						return this.cityData[i].cities
					}
				}
				return []
			}
		},
		components: {
			datepicker: require('../components/vue-strap/Datepicker.vue'),
		}
	}
</script>
<style lang="less">
	.fade-enter, .fade-leave {
		opacity: 0;
	}
	.fade-transition {
		transition: opacity .3s ease;
	}
	.m-layer-sizer{
		position: relative;
	    border: 1px solid #e1e1e1;
	    box-shadow: 3px 3px 5px #eee;
	    .sizer-tit{
	    	position: relative;
    	    padding: 9px 15px;
    	    height: 20px;
    	    background: #f5f5f5;
    	    border-bottom: 1px solid #e1e1e1;
    	    box-sizing: content-box;
    	    z-index: 9;
    	    h2{
    	    	float: left;
    	    	font-weight: normal;
    	    	line-height: 20px;
    	    	font-size: 16px;
    	    }
		    .ctrl{
		    	float: right;
		    	.v-close{
		    		width: 20px;
		    		height: 20px;
		    		text-align: center;
		    		line-height: 20px;
		    		cursor: pointer;
		    		color:#666;
		    	}
		    }
	    }
	    .sizer-con{
	    	position: relative;
	    	padding: 15px 20px;
	    	background: #fbfbfb;
	    }
	}
</style>