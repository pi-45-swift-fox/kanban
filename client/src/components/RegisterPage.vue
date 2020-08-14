<template>
  <div class="center-content">
      <div v-if="message">
          <ul class="bg-red-600 text-white" >
              <div v-html="message"></div>
          </ul>
      </div>
      <div class="w-full max-w-xs">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="registerNewUser" >
              <div class="text-2xl">Register Below</div> 
              <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="userNameRegister">
                      Name
                  </label>
                  <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username" v-model="userNameRegister" type="text" placeholder="Name">
              </div>
              <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                      Email
                  </label>
                  <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="usernameReg" v-model="emailRegister" type="email" placeholder="Email">
              </div>
              <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="passwordRegister">
                      Password
                  </label>
                  <input
                      class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password" v-model="passwordRegister" type="password" placeholder="*****">
                  <p class="text-red-500 text-xs italic">Please choose a password.</p>
              </div>
              <div class="flex items-center justify-between">
                  <button 
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit">
                      Sign Up
                  </button>
              </div>
             <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
                <br>
              <a href="#" @click="changePage('loginPage')">Already have an account? Click here.</a>
          </form>
          <p class="text-center text-gray-500 text-xs">
              &copy;2020 . All rights reserved.
          </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
    name:'RegisterPage',
    data(){
        return {
            userNameRegister:'',
            emailRegister:'',
            passwordRegister:'',
            message:'',
            clientId: '881671303594-on0gj82t4apid6hsqa3tsdshpl1bgr5v.apps.googleusercontent.com'
        }
    },
    props:['baseUrl'],
    methods:{
        registerNewUser(){
                axios({
                    method:'POST',
                    url: this.baseUrl + '/register',
                    data:{
                        name:this.userNameRegister,
                        email:this.emailRegister,
                        password:this.passwordRegister
                    }
                })
                .then(res=>{
                    localStorage.setItem('access_token',res.data.access_token)
                    this.changePage('dashboard')
                })
                .catch(err=>{
                    let msg = []
                    
                    if(Array.isArray(err.response.data.message)){
                        err.response.data.message.forEach(el => {
                            msg.push(`<li>${el}</li>`)
                        });
                        this.message = msg.join(' ')
                    } else {
                        this.message = err.response.data.message
                    }
                    
                })
        },
        changePage(page){
            this.$emit('changePage',page)
        },
        OnGoogleAuthSuccess (idToken) {
            console.log(idToken)
            // Receive the idToken and make your magic with the backend
           
            axios({
                method:'POST',
                url: this.baseUrl+'/loginGoogle',
                headers:{
                    google_token:idToken
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
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>
.google-signin-button {
  color: rgb(87, 83, 83);
  background-color: rgb(243, 189, 189);
  height: 30px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>