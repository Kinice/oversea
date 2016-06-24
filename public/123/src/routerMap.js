export const routerMap = {
    'login': {
        name: 'login',
        component(resolve) {
            require(['./views/login.vue'], resolve);
        },
        pageSign: true
    },
    //总览
    '/pandect': {
        name: 'pandect',
        component(resolve) {
            require(['./views/frame.vue'], resolve);
        },
        subRoutes: {
            //信息总览
            '/dashboard': {
                name: 'dashboard',
                component(resolve) {
                    require(['./views/pandect/dashboard.vue'], resolve);
                }
            }
        },
        auth: true
    },
    //统计信息
    '/stat': {
        name: 'stat',
        component(resolve) {
            require(['./views/frame.vue'], resolve);
        },
        subRoutes: {
            //机构统计
            '/school': {
                name: 'school',
                component(resolve) {
                    require(['./views/stat/school.vue'], resolve);
                }
            },
        },
        auth: true
    },
    '*': {
        component: function(resolve) {
            require(['./views/404.vue'], resolve);
        }
    },
}

export const redirectMap = {
    '/': '/pandect/dashboard',
    '/pandect': '/pandect/dashboard',
    '/stat': '/stat/school',
}