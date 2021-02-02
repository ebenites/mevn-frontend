<template>
    <div class="container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" class="form-control my-2" placeholder="email" v-model="user.email" />
            <input type="text" class="form-control my-2" placeholder="password" v-model="user.password" />
            <b-button type="submit">Ingresar</b-button>
        </form>
        <div v-if="mensaje !== ''">
            <p>{{mensaje}}</p>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import router from '../router';

export default {
    data() {
        return {
            user: { email: 'erick.benites@gmail.com', password: 'Tecsup123' },
            mensaje: '',
        }
    },
    methods:{
        ...mapActions(['guardarUsuario']),
        login() {
            this.axios.post('/login', this.user).then(res => {
                console.log(res.data);
                this.guardarUsuario(res.data.token)
            }).catch(err => {
                console.log(err);
                this.mensaje = err.response.data.mensaje
            })
        }
    }
}
</script>