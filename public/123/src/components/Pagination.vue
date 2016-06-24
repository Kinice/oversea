<template>
  <div class="m-pagination">
    <template v-if="rowsTotal > 0">
        <ul class="pagination">
            <li @click="first" :class="{'disabled':isFirst}">首页</li>
            <li @click="prev" :class="{'disabled':isFirst}">上一页</li>

            <template v-if="notEnoughPages">
                <li v-for="n in pageTotal" :class="{'active':this.page === n+1}" @click="nav( n+1 )">{{n + 1}}</li>
            </template>
            <template v-else>
                <li v-for="n in windowSize" :class="{'active':this.page === windowStart+n}" @click="nav( windowStart+n )">{{windowStart+n}}</li>
            </template>

            <li @click="next" :class="{'disabled':isLast}">下一页</li>
            <li @click="last" :class="{'disabled':isLast}">尾页</li>
        </ul>
        <div class="stastics">
            共<span>{{rowsTotal}}</span>条记录，<span>{{page}}/{{pageTotal}}</span>页
            <select class="page-select" v-model="pageSize" v-if="pageSizes.length">
                <option v-for="value in pageSizes" value="{{value}}">{{value}}</option>
            </select>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
	export default {
		props: {
	      pageSize: {
            twoWay: true,
	      },
	      rowsTotal: {
	        type: Number,
	        required: true
	      },
	      page: {
	        type: Number,
	        required: true
	      },
          pageSizes: {
            type: Array
          },
          onEachSide: {
            type: Number,
            coerce (value) {
                return Math.abs(parseInt(value))
            },
            default (){
                return 2
            }
          }
	    },
	    watch: {
    		pageTotal (newVal, oldVal) {
                if(this.page >= newVal){
                    this.page = newVal
                    this.isLast = true
                }else{
                    this.isLast = false
                }
    			if (newVal === 1) {
    				this.isFirst = true
    				this.isLast = true
    			}
    		},
            pageSize (newVal, oldVal){
                if (newVal !== oldVal) {
                    if(this.page > this.pageTotal){
                        this.page = this.pageTotal
                        this.isLast = true
                    }
                }
            }
    	},
    	computed: {
    		pageTotal () {
    			let total = Math.ceil(this.rowsTotal / this.pageSize)
    			if (total === 1) {
    				this.isLast = true
    				this.isFirst = true
    			}
    			return total
    		},
            notEnoughPages () {
                return this.pageTotal < this.onEachSide*2 + 4
            },
            windowSize () {
                return this.onEachSide*2 +1;
            },
            windowStart () {
                if (this.page <= this.onEachSide) {
                    return 1
                } else if (this.page >= (this.pageTotal - this.onEachSide)) {
                    return this.pageTotal - this.onEachSide*2
                }
                return this.page - this.onEachSide
            },
    	},
    	data () {
    		return {
    			isLast: false,
    			isFirst: true,
    		}
    	},
    	methods: {
    		nav (n) {
    			n === 1 ? this.isFirst = true : this.isFirst = false
    			this.pageTotal === n ? this.isLast = true : this.isLast = false
    			this.page = n
    		},
    		next () {
                if(this.page + 1 <= this.pageTotal) {
                    this.nav(this.page + 1)
                }
    		},
    		prev () {
                if(this.page - 1 >= 1) {
                    this.nav(this.page - 1)
                }
    		},
            first (){
                this.nav(1)
            },
            last (){
                this.nav(this.pageTotal)
            }
    	}
	}
</script>
<style lang="less">
	@import '~assets/less/var.less';
	.m-pagination{
		padding:20px 10px;
		.clearfix();
		.pagination{
			float: right;
            margin: 0;
			li{
				float: left;
                margin-left: -1px;
				padding: 3px 10px;
				background-color: #fafafa;
				line-height: 24px;
				font-size: 12px;
                color: #666;
                border: 1px solid @borderColor;
				cursor: pointer;
                &:first-child{
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                }
                &:last-child{
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                }
                &:hover{
                    background-color: #eee;
                    color: #23527c;
                }
				&.active{
					color: #fff;
                    cursor: default;
                    background-color: #337ab7;
                    border-color: #337ab7;
				}
				&.disabled{
					color: #777;
                    cursor: not-allowed;
                    background-color: #eee;
                    color: #bbb;
				}
			}
		}
		.stastics{
			float: left;
			line-height: 24px;
			font-size: 14px;
		}
        .page-select{
            margin: -1px 0 0 3px;
            padding: 0 12px;
            width: 50px;
            height: 24px;
            background-color: #fff;
            vertical-align: middle;
        }
	}
</style>