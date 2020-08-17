<template>
    <div>
    <Login v-if="page === 'login-page'" @changeLogin="changeLogin" @changePage="changePage" :base-url="baseUrl" @showAlert="showAlert" @showAlertSuccess="showAlertSuccess"></Login>    
    <Register v-else-if="page === 'register-page'" @changeLogin="changeLogin" @changePage="changePage" :base-url="baseUrl" @showAlert="showAlert" @showAlertSuccess="showAlertSuccess"></Register>
    <Dashboard v-else-if="page === 'kanban-home-page'"  @changeLogin="changeLogin" @changePage="changePage" :base-url="baseUrl" @showAlert="showAlert"  ></Dashboard>
    </div>
</template>

<script>
import axios from 'axios';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import VueSweetalert2 from 'vue-sweetalert2'


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
            baseUrl: 'http://localhost:3000'
        }
    },
    methods: {      
        changePage(page){
            this.page = page
        },
        changeLogin(data){
            this.isLogin = data
        },
        showAlert(message){
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: message
        });
        },
        showAlertSuccess(message){
          this.$swal({
            icon: 'success',
            title: 'SUCCESS',
            text: message
        });
        },
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
</script>

<style>

</style>