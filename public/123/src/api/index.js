'use strict'

var apiPath = '/api/';

export default {
    /*
        获取机构统计， get, 
        school_type:
        created_at_from:
        install_status:
        is_trained:
        last_active_class_days:
        valid_class:
        lesson_progress_from: 0
        lesson_progress_to: 100
        keyword:
        province:北京
        city:东城区
    */
    getStatisticSchool: apiPath + 'statistic/school',

    /**
        获取机构详情
        method: post
        params: id
     */
    getSchoolDetail: apiPath + 'school/detail',

    /*
        登录
        method: POST
        params: 
            username:
            password:
    */
    userLogin: apiPath + 'manage/login',

    /*
        退出
        method: POST,
        params: 无
     */
     userLogout: apiPath + 'manage/logout',


    /*
        获取宏观数据
        method: POST
        params: 空
    */
    getMacroData: apiPath + 'statistic/macro',

    /*
        获取宏观活跃数据
        method: POST
        params: 空
    */
    getMacroActiveData: apiPath + 'statistic/macro_active'
}