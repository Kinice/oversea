import Vue from 'vue'
import utils from './utils'
import { HEADER_TOKEN } from '../libs/const.js'

let retCode = {
	10003: '请求参数错误',
	31001: '用户不存在',
	31002: '密码错误',

	500: '服务请求失败'
}

export const setHttpAuth = () => {
	Vue.http.headers.common[HEADER_TOKEN] = utils.getBasicAuth();
}

//ajax拦截器
export const setInterceptors = () => {
	Vue.http.interceptors.push(function() {
		//todo
		return {
			request: function(request) {
				//todo
				return request;
			},
			response: function(response) {
				let data = response.data;
				if(data) {
					let code = data.meta.code;
					if (retCode[code]) {
						utils.alert(retCode[code])
					}
					if (code == 30001 || code == 10001) {
						utils.removeLogon()
						utils.alert('登录失效，请重新登录')
					}
				}

				return response;
			}

		};
	});
}