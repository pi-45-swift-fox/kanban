<template>
    <div class="appnew">
        <LoginForm v-if="isPage == 'login'" v-on:toDashboard="toDashboard" v-on:toRegisterForm="toRegisterForm" v-on:toError="toError"></LoginForm>
        <RegisterForm v-else-if="isPage == 'register'" v-on:toDashboard="toDashboard" v-on:toLoginForm="toLoginForm" v-on:toError="toError"></RegisterForm>
        <Error v-else-if="isPage == 'error'" v-on:toDashboard="toDashboard"></Error>
        <Dashboard v-else :tasks="tasks" v-on:toDashboard="toDashboard" v-on:toLoginForm="toLoginForm" v-on:toError="toError"></Dashboard>
    </div>
</template>

<script>
import axios from 'axios'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import Error from './components/Error'

export default {
    name: 'App',
    data() {
        return {
            isPage: 'login',
            tasks: []
        }
    },
    methods: {
        fetchTasks() {
            axios({
                method: 'get',
                url: 'http://localhost:3000//task',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                this.tasks = res.data
            })
            .catch(err => {
                this.isPage = 'error'
            })
        },
        toDashboard() {
            this.fetchTasks()
            this.isPage = 'dashboard'
        },
        toLoginForm() {
            this.isPage = 'login'
        },
        toRegisterForm() {
            this.isPage = 'register'
        },
        toError() {
            this.isPage = 'error'
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.isPage = 'dashboard'
            this.fetchTasks()
        } else {
            this.isPage = 'login'
        }
    },
    components: {
        LoginForm,
        RegisterForm,
        Dashboard,
        Error
    }
}
</script>

<style>

</style>