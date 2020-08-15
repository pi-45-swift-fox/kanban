<template>
        <div class="w-6/6 max-w-xs mx-auto form-login top" style="font-family: 'Copse';">
            <form @submit.prevent="login" class="bg-transparent rounded px-8 pt-6 pb-6">
                <div>
                    <div class="text-center">
                        <h2 id="welcome-text" class="mx-auto" :message="message">{{message}}</h2>
                    </div>
                    <br>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold py-4">
                            Email
                        </label>
                        <input v-model="loginEmail" class="shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Email">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input v-model="loginPassword"
                            class="shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password" placeholder="*****">
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class=" hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded-full transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300"
                            type="submit">
                            Sign In
                        </button>
                        <button @click.prevent="changePage('Register')"
                            class="hover:bg-red-500 text-red-500 font-semibold hover:text-white py-4 px-6 border border-red-500 hover:border-transparent rounded-full transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300"
                            type="button">
                            Register
                        </button>
                    </div>
                    <br>
                    <div class="g-signin2" style="width: 250px;" data-onsuccess="onSignIn"></div>
                    <div class="ERROR"></div>
                </div>
            </form>
        </div>
</template>

<script>
import Axios from 'axios'

export default {
    name: "LoginPage",
    data(){
        return {
            loginEmail : '',
            loginPassword : '',
            message: 'Welcome to our site! Please Login or Register'
        }
    },
    methods : {
        changePage(page){
            this.$emit('changePage', page)
        },
        changeMessage(email){
            let str = ''
            for (let i = 0; i < email.length; i++) {
                if(email[i] == '@'){
                    break
                }
                str += email[i]
            }
            this.message = `WELCOME USER ${str}`
        },
        login(){
            Axios('http://localhost:3000/login',{
                method : "POST",
                data :{
                    email : this.loginEmail,
                    password : this.loginPassword
                }
            })
            .then(res=>{
                this.changePage('Dashboard')
                localStorage.access_token = res.data.token
                localStorage.id = res.data.id
                localStorage.email = res.data.email
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.form-login{
    background-color: transparent;
    border: 2px solid lightgray;
    border-radius: 20px;
    box-shadow: 14px 18px 6px -5px rgba(0,0,0,0.58);
    transition: box-shadow 0.2s ease-in-out;

    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.form-login:hover{
    box-shadow: 14px 18px 20px 10px rgba(0,0,0,0.64);
}

</style>