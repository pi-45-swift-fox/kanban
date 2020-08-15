<template>
    <div class="w-6/6 max-w-xs mx-auto form-register " style="font-family: 'Copse';">
            <form v-on:submit.prevent="registerButton" class="  bg-transparent rounded px-8 pt-6 pb-6">
                <div>
                    <div class="mx-auto items-center">
                        <h2 id="welcome-text" class="text-center">Please register your data</h2>
                        
                    </div>
                    <br>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold py-4">
                            Email
                        </label>
                        <input v-model="registerEmail" class="shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Email">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input v-model="registerPassword"
                            class="shadow appearance-none border border-red-500 rounded w-full py-4 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password" placeholder="*****">
                    </div>
                    <div class="flex justify-center">
                        <button class="hover:bg-red-500 text-red-500 font-semibold hover:text-white py-4 px-6 border border-red-500 hover:border-transparent rounded-full transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300"
                            type="submit">
                            Register
                        </button>
                    </div>
                    <br>
                    <div class="ERROR"></div>
                </div>
            </form>
        </div>
</template>

<script>
import Axios from 'axios'

export default {

    name: "RegisterPage",
    data(){
        return {
            registerEmail: "",
            registerPassword: ""
        }
    },
    methods: {
        changePage(page){
            this.$emit('changePage', page)
        },
        changeMessage(email){
            this.$emit('changeMessage', email)
        },

        registerButton(){
            console.log(this.registerEmail)
            Axios('http://localhost:3000/register',{
                method : "POST",
                data :{
                    email : this.registerEmail,
                    password : this.registerPassword
                }
            })
            .then(res=>{
                this.changePage('Login')
                this.changeMessage(this.registerEmail)
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
}
</script>

<style scoped>
*{
    font-family: 'Copse';
}

.form-register{
    background-color: transparent;
    border: 2px solid lightgray;
    border-radius: 20px;
    box-shadow: 14px 18px 6px -5px rgba(0,0,0,0.58);
    transition: box-shadow 0.2s ease-in-out;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.form-register:hover{
    box-shadow: 14px 18px 20px 10px rgba(0,0,0,0.64);
}
</style>