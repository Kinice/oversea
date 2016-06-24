import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user: {}
}

const mutations = {
	USER(state, user) {
        state.user = user
    },
}

export default new Vuex.Store({
	state,
	mutations
})