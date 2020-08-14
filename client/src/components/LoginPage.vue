<template>
    <div>
        <div class="center-content border-radius-task">
            <div v-if="message">
          <ul class="bg-red-600 text-white" >
              <div v-html="message"></div>
          </ul>
        </div>
            
            <div class="w-full max-w-xs">
                
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " v-on:submit.prevent="login">
                    <div class="text-2xl ">Login Below</div> 
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email-login">
                            Email
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" v-model="email" type="email" placeholder="Email">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" v-model="password" type="password" placeholder="*****">
                        <p class="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Sign In
                        </button>
                    </div>
                    <div class="pt-4">
                       <a href="#" @click.prevent="changePage('registerPage')" >Register Here</a> 
                    </div>
                </form>
                <p class="text-center text-gray-500 text-xs">
                    &copy;2020 . All rights reserved.
                </p>
            </div>
        </div>
    </div>
       
</template>

<script>

import axios from 'axios'

export default {
    name:'LoginPage',
    data(){
        return{
            email: '',
            password: '',
            message:'',
        }
    },
    props:['baseUrl'],
    methods:{
        login() {
            axios({
                method:'POST',
                url: this.baseUrl+'/login',
                data:{
                    email:this.email,
                    password:this.password,
                    message:''
                }
            })
            .then(res=>{
                localStorage.setItem('access_token',res.data.access_token)
                this.changePage('dashboard')
            })
            .catch(err=>{
                this.message = err.response
                console.log(err);
            })
            
        },
        changePage(page){
            this.$emit('changePage', page)
        },
        
    }
}
</script>

<style scoped>

</style>
