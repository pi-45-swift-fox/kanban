<template>
  <div>
      <Navbar v-if="page == 'main-page'" @pageStatus="pageStatus"></Navbar>
      <LoginPage v-if="page == 'login-page'" :server="server" @pageStatus="pageStatus"></LoginPage>
      <RegisterPage v-if="page == 'register-page'" :server="server" @pageStatus="pageStatus"></RegisterPage>
      <MainPage v-if="page == 'main-page'" :server="server" :tasks="tasks" @pageStatus="pageStatus"></MainPage>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './components/Navbar.vue'
import LoginPage from './components/LoginPage.vue'
import MainPage from './components/MainPage.vue'
import RegisterPage from './components/RegisterPage.vue'

export default {
    name: 'App',
    data() {
        return {
            server: 'http://localhost:3000',
            page: 'login-page',
            tasks: []
        }
    },
    components: {
        LoginPage,
        MainPage,
        Navbar,
        RegisterPage
    },
    methods: {
        pageStatus(status) {
            if (localStorage.getItem('access_token')) {
                this.fetchTasks()
            } 
            this.page = status
        },
        fetchTasks() {
            axios({
                method: 'GET',
                url: `${this.server}/tasks`,
                headers: { access_token: localStorage.getItem('access_token') }
            })
                .then(tasks=>{
                this.tasks = tasks.data
                console.log(tasks)
                })
                .catch(err=>{
                console.log(err)
                })
        }
    },
    created() {
        if (localStorage.getItem('access_token')) {
            this.fetchTasks()
            this.page = 'main-page'
        } else {
            this.page = 'login-page'
        }
    }
};
</script>

<style>
</style>
