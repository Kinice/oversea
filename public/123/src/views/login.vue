<template>
	<div class="page">
		<div class="loginbox">
			<h2>The ONE钢琴教室运营系统</h2>
			<form @submit.prevent="login">
				<table class="login">
					<tr>
						<td class="text">用户名</td>
						<td class="input">
							<input type="text" v-model="username">
						</td>
					</tr>
					<tr>
						<td class="text">密　码</td>
						<td class="input">
							<input type="password" v-model="password">
						</td>
					</tr>
					<tr>
						<td class="text"></td>
						<td><input type="submit" value="登录"></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<spinner :size="'md'" text="正在登录..." v-ref:spinner></spinner>
</template>
<script>
	import api from '../api/'
	import utils from '../libs/utils.js'
	import { setUser } from '../vuex/actions.js'

	export default{
		vuex: {
			actions: { setUser }
		},
		data (){
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login (){
				this.$refs.spinner.show()

				this.$http.post(api.userLogin, {
					username: this.username,
					password: this.password
				}).then(({data}) => {
					if(data.meta.code === 0){
						utils.storeLogon(false, data.data)
						this.setUser()
						var redirect = this.$route.query.redirect || '/'
						this.$route.router.replace(redirect)
					}
				}).catch((err) => {
					console.error(err)
					utils.alert('登录失败')
				}).finally(() => {
					this.$refs.spinner.hide() 
				})
			}
		},
		components: {
			spinner: require('../components/vue-strap/Spinner.vue'),
		}
	}
</script>
<style lang="less" scoped>
	.page{
		position: relative;
		height: 100%;
		background-color: #FFF6EA;
		.loginbox{
			position: absolute;
			left: 0;right:0;top:25%;
			margin:0 auto;
			width: 280px;
			h2{
				margin-bottom: 20px;
				font-weight: normal;
				text-align: center;
				font-size: 24px;
				white-space: nowrap;
			}
		}
		.login{
			width: 100%;
			font-size: 16px;
		}
		.login td{
			padding:3px 5px;
			line-height: 30px;
			white-space: nowrap;
		}
		.login .text{
			width: 60px;
			text-align: right;
			font-size: 16px;
		}
		input[type='text'],input[type='password']{
			padding:3px 5px;
			line-height: 24px;
			width: 100%;
			color:#666;
			font-size: 14px;
			border-left: 1px solid #aaa;
			border-top: 1px solid #aaa;
			border-right: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			outline: none;
		}
		input[type='submit']{
			width: 100px;
			border:1px solid #ccc;
			background-color: #fff;
			height: 30px;
			font-size: 16px;
			outline: none;
			color: #333;
			cursor: pointer;
		}
	}
</style>