<template>
  <div>
        <div>
            <LoginPage @changePage="changePage" v-if="page === 'Login'"></LoginPage>
            <RegisterPage @changePage="changePage" v-if="page == 'Register'"></RegisterPage>
            <Dashboard @changePage="changePage" v-if="page === 'Dashboard'" :tasks="tasks"></Dashboard>
            
        </div>
  </div>
</template>

<script>

import LoginPage from './Components/01-login-page.vue'
import RegisterPage from './Components/02-register-page.vue'
import Dashboard from './Components/03-Dashboard.vue'
import Axios from 'axios'

export default {
    name: 'app',
    data(){
        return {
            page: "Login",
            tasks: [],
        }
    },
    components: {
        LoginPage,
        RegisterPage,
        Dashboard
    },
    methods: {
        changePage(page){
            this.page = page
        },
        fetchData(){
            Axios("http://localhost:3000/tasks",{
                method : 'GET',
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(res=>{
                this.tasks = res.data.data
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created() {
        if(localStorage.getItem('access_token')){
            this.page = "Dashboard"
            this.fetchData()
        }else{
            this.page = "Login"
        }
    },
}
</script>

<style scoped>

</style>