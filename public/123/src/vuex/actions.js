import Vue from 'vue'
import utils from '../libs/utils'
import { setHttpAuth } from '../libs/resource.js'
import { HEADER_TOKEN } from '../libs/const.js'
import api from '../api/'

export const setUser = ({
    dispatch
}) => {
    var user = {
        username: utils.getStore('username'),
        token: utils.getStore('token'),
    }
    dispatch('USER', user)
    setHttpAuth()
}

export const logout = ({
    dispatch
}) => {
    var token = utils.getStore('token') //记录下退出前的token
    utils.removeLogon()
    setUser({ dispatch })
    Vue.http.post(api.userLogout, {}, {
        headers: {
            [HEADER_TOKEN]: token
        }
    })
}