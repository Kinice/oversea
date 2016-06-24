<template>
	<header class="g-hd">
		<div class="m-logo"><b>Admin</b>LTE</div>
		<div class="m-top-opr">
			<span class="username">{{user.username}}</span>
			<a class="logout" @click="goSignout"><i class="fa fa-power-off"></i></a>
		</div>
	</header>
</template>
<script>
	import utils from '../libs/utils'
	import api from '../api/'
	import { logout } from '../vuex/actions.js'
	import { getUser } from '../vuex/getters.js'

	export default {
		vuex: {
			actions: {
				logout
			},
			getters: {
				user: getUser
			}
		},
		methods: {
			goSignout (){
				this.logout()
				this.$route.router.go({name:'login'})
			}
		}
    }
</script>
<style lang="less">
	@import "../assets/less/var.less";
	.m-logo{
		float: left;
		width: @sideWidth;
		font-size: 20px;
		color:#fff;
		font-weight: 300;
		text-align: center;
		b{
			line-height: @headerHeight;
		}
	}
	.m-top-opr{
		float: right;
		padding-right: 20px;
		margin-top: 15px;
		span{
			float: left;
			color:#fff;
			line-height: 20px;
		}
		a{
			float: left;
			width: 20px;
			height: 20px;
			line-height: 20px;
			text-align: center;
			cursor: pointer;
			transition: all .5s ease;
			color:#fff;
			&:hover{
				opacity: .8;
			}
		}
	}
</style>