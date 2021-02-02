<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!islogged">Login</router-link> |
      <a href="javascript:void(0)" @click="cerrarSesion()" v-if="islogged">Logout</a> |
      <router-link to="/notes" v-if="islogged">Notes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods:{
    ...mapActions(['cerrarSesion', 'leerToken'])
  },
  computed:{
    ...mapGetters(['islogged'])
  },
  created(){
    this.leerToken()
  }
}
</script>