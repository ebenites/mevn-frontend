import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import router from '../router'

// para decodificar el jwt
import decode from 'jwt-decode'

export default new Vuex.Store({
  state: {
    token: '',
    user: ''
  },
  mutations: {
    obtenerUsuario(state, payload){
      state.token = payload;
      if(payload === ''){
        state.user = ''
      }else{
        state.user = decode(payload);

        let searchParams = new URLSearchParams(window.location.search);
        if(searchParams.has("redirect")) {
          router.push({ path: searchParams.get("redirect") })
        } else {
          router.push({name: 'notes'})
        }

      }
    }
  },
  actions: {

    guardarUsuario({commit}, payload){
      localStorage.setItem('token', payload)
      commit('obtenerUsuario', payload)
    },

    cerrarSesion({commit}){
      commit('obtenerUsuario', '')
      localStorage.removeItem('token')
      router.push({name: 'login'})
    },

    leerToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('obtenerUsuario', token);
      }else{
        commit('obtenerUsuario', '');
      }
    },

  },
  getters:{
    islogged: state => !!state.token
  },
  modules: {

  }
})
