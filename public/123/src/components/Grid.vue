<template>
	<table class="m-grid" :class="{nowrap:!breakWord}">
		<thead>
			<tr>
				<th v-if="checkAble" class="check-op"><input type="checkbox" v-model="checkAll"></th>
				<th v-for="item in columns"
					@click="sortBy(item.key)"
					:class="{active:sortKey == item.key}">
					{{item.label}}
					<span class="arrow"
						:class="sortOrders[item.key] > 0?'asc':'dsc'"></span>
				</th>
				<th v-if="itemActions.length">{{actionTitle}}</th>
			</tr>
		</thead>
		<tbody>
			<template v-if="pageAble">
				<template v-if="filterRows.length>0">
					<tr v-for="entry in data | filterBy filterKey | orderBy sortMethods[sortKey]||sortKey sortOrders[sortKey] | limitBy pageSize pageStart">
						<td v-if="checkAble"><input :disabled="entry._disable" type="checkbox" value="{{entry[checkedField]}}" v-model="checkedFields"></td>

						<template v-for="item in columns">
							<td v-if="hasCallback(item)">
								{{{ doCallback(entry[item.key], item) }}}
							</td>
							<td v-else>
								{{{ entry[item.key] }}}
							</td>
						</template>

						<td v-if="itemActions.length" class="btnbox">
							<button v-for="action in itemActions" :disabled="entry._disable" :class="action.class" @click="callAction(action.name, entry)">
								<i class="{{ action.icon }}"></i> {{ action.label }}
							</button>
						</td>
					</tr>
				</template>
				<template v-else>
	            	<tr><td :colspan="100">{{tips}}</td></tr>
	          	</template>
			</template>
			<template v-else>
				<template v-if="filterRows.length>0">
					<tr v-for="entry in data | filterBy filterKey | orderBy sortMethods[sortKey]||sortKey sortOrders[sortKey]">
						<td v-if="checkAble"><input :disabled="entry._disable" type="checkbox" value="{{entry[checkedField]}}" v-model="checkedFields"></td>

			        	<template v-for="item in columns">
			        		<td v-if="hasCallback(item)">
			        			{{{ doCallback(entry[item.key], item) }}}
			        		</td>
			        		<td v-else>
			        			{{{ entry[item.key] }}}
			        		</td>
			        	</template>

			        	<td v-if="itemActions.length" class="btnbox">
							<button v-for="action in itemActions" :disabled="entry._disable" :class="action.class" @click="callAction(action.name, entry)">
								<i class="{{ action.icon }}"></i> {{ action.label }}
							</button>
						</td>
			        </tr>
		        </template>
		        <template v-else>
		        	<tr><td :colspan="100">{{tips}}</td></tr>
		        </template>
			</template>
		</tbody>
	</table>
	<template v-if="pageAble">
		<pagination :page-size.sync="pageSize" :page-sizes="pageSizes" :on-each-side="onEachSide" :rows-total="filterRows.length" :page.sync="page"></pagination>
	</template>
</template>
<script>
	export default {
		props: {
			breakWord: {
				type: Boolean,
				default: false
			},
			pageAble: {
				type: Boolean,
				default: true
			},
			columns: {
				type: Array,
				required: true
			},
			actionTitle: {
				type: String,
				default: '操作'
			},
			data: {
				type: Array,
				default: function(){
					return [];
				},
				required: true
			},
			filterKey: {
				type: String,
				default: ''
			},
			onEachSide: Number,
			itemActions: {
				type: Array,
				default: function(){
					return [];
				}
			},
			pageSize: {
				type: Number,
				default: 50
			},
			pageSizes: {
				type: Array,
	            default (){
	                return [10, 25, 50, 75, 100]
	            }
	        },
			checkedField: {
				type: String,
				default: 'id'
			},
			checkedFields: {
				type: Array,
				default: function(){
					return [];
				},
				twoWay: true
			},
			checkAble: {
				type: Boolean,
				default: false
			},
			tips: {
				type: String,
				default: '暂无查询数据'
			}
		},
		data (){
			var sortOrders = {}
			this.columns.forEach(function(item){
				sortOrders[item.key] = 1
			})

			var sortMethods = {}
			this.columns.forEach(function(item){
				sortMethods[item.key] = item.sortMethod
			})

			return {
				sortKey: '',
				page: 1,
				sortOrders: sortOrders,
				sortMethods: sortMethods,
				checkAll: false
			}
		},
		computed: {
			filterRows (){
				return this.$options.filters.filterBy(this.data, this.filterKey);
			},
			pageStart (){
				return (this.page - 1) * this.pageSize
			},
			allValues (){
				var values = [];
				this.data.forEach(function(d){
					if(!d._disable){
						values.push(d[this.checkedField]+'');
					}
				})
				return values;
			}
		},
		watch: {
			'checkAll' (val){
				if(val){
					this.checkedFields = this.allValues.slice(0);
				}else{
					this.checkedFields = [];
				}
			}
		},
		methods: {
			sortBy (key){
				this.sortKey = key;
				this.sortOrders[key] *= -1;
			},
			callAction (action, data){
				this.$dispatch('grid:action', action, data)
			},
			hasCallback (item){
				return item.callback ? true : false
			},
			doCallback (value, item){
				if( !this.hasCallback(item)) return;
				var args = item.callback.split('|')
	            var func = args.shift()
	            if (typeof this.$parent[func] == 'function') {
	                return (args.length > 0)
	                    ? this.$parent[func].apply(this.$parent, [value].concat(args))
	                    : this.$parent[func].call(this.$parent, value)
	            }
	            return null
			}
		},
		components: {
			'pagination': require('./Pagination.vue')
		}
	}
</script>
<style lang="less" scoped>
	@import '~assets/less/var.less';
	.m-grid{
		margin:0 auto;
		width: 100%;
		border-collapse: collapse;
		&.nowrap{
			white-space: nowrap;
		}
		td,th{
			padding:6px 5px;
			line-height: 20px;
			border:1px solid @borderColor;
			border-left:none;
			text-align: center;
			&:last-child{
				border-right: none;
			}
		}
		th{
			padding-top:8px;
			padding-bottom: 8px;
			background-color: #f1f1f1;
			background-image: linear-gradient(top,#fff,#f7f7f7);
			font-weight: normal;
			.arrow{
				display: inline-block;
				vertical-align: middle;
				width: 0;
				height: 0;
				margin-left: 5px;margin-top: -3px;
				&.asc{
					border-left: 5px solid transparent;
					border-right: 5px solid transparent;
					border-bottom: 5px solid #999;
				}
				&.dsc{
					border-left: 5px solid transparent;
					border-right: 5px solid transparent;
					border-top: 5px solid #999;
				}
			}
			&.active{
				font-weight: bold;
				.arrow{
					&.asc{
						border-bottom-color:#333;
					}
					&.dsc{
						border-top-color:#333;
					}
				}
			}
		}
		tbody tr{
			background-color: #fff;
			&:nth-child(even){
				background-color: #f9f9f9;
			}
			&:hover{
				background-color: #FFFAED;
			}
		}
		.center{
			text-align: center;
		}
		.left{
			text-align: left;
		}
		.right{
			text-align: right;
		}
		.bold{
			font-weight: bold;
		}
		.btnbox{
			white-space: nowrap;
			button{
				margin: 0 3px;
			}
		}
		input[type="checkbox"][disabled]{
			cursor: not-allowed;
		}
	}
</style>