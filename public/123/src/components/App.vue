<template>
	<router-view keep-alive></router-view>
</template>
<script>
	import store from '../vuex/store'
	import { setUser } from '../vuex/actions'

	export default {
		replace: false,
		store,
		vuex: {
			actions: {
			  setUser: setUser
			}
		},
		ready (){
			this.setUser()
		}
	}	
</script>
<style lang="less">
	//引入样式
	@import '~assets/css/bootstrap.css';
    @import '~assets/less/reset.less';
    @import '~assets/less/var.less';
	@import '~assets/css/font-awesome.css';
    @import '~assets/less/common.less';
</style>