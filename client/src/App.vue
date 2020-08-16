<template>
    <div>
    <Login v-if="page === 'login-page'" @changeLogin="changeLogin" @changePage="changePage"></Login>    
    <Register v-else-if="page === 'register-page'" @changeLogin="changeLogin" @changePage="changePage" ></Register>
    <Dashboard v-else-if="page === 'kanban-home-page'"  @changeLogin="changeLogin" @changePage="changePage"></Dashboard>
    </div>
</template>

<script>
import axios from 'axios';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

export default {
    name: 'App',
    components: {
        Login,
        Register,
        Dashboard
    },
    data() {
        return {
            page: 'login-page',
            panggilan: localStorage.panggilan,
            isLogin: false,
        }
    },
    methods: {      
        changePage(page){
            this.page = page
        },
        changeLogin(data){
            this.isLogin = data
        },
        created(){
            if(localStorage.getItem('access_token')){
                this.page = 'kanban-home-page'
                this.isLogin = true
            } else {
                this.page = 'login-page'
                this.isLogin = false
            }
        }
    }
}
</script>

<style>

</style>