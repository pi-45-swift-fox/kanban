<template>
  <div>
      <h1>{{message}}</h1>
      <Login v-if="page==='home' && !dataToken" @emitFromLogin="changeToMain" @emitToRegister="changeToRegister"></Login>
        <Register v-else-if="page==='register'" @emitFromRegister="changeToLogin"></Register>
      <Main v-if=" page==='main' || dataToken " @getToMain="getMain"></Main>
      
  </div>
</template>

<script>
import Home from './views/Home'
import Main from './views/Main'
import Login from './views/Login'
import Register from './views/Register'
export default {
    components:{
        Login,
        Main,
        Register
    },
    data(){
        return {
            message:`Welcome to Kanban :)`,
            dataToken:localStorage.access_token,
            page:'home'

        }
    },
    methods:{
        changeToMain(){
            this.page='main'
        },
        changeToRegister(){
            this.page='register'
        },
        changeToLogin(){
            this.page='home'
        },
        getMain(){
            this.page='home'
            this.page='main'
        }
    }
}
</script>

<style scoped>

</style>