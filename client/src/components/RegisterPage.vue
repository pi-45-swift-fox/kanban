<template>
  <div class="center-content border-radius-task">
      <div v-if="message">
          <ul class="bg-red-600 text-white" >
              <div v-html="message"></div>
          </ul>
      </div>
      <div>
          <form class="shadow-md rounded px-8 pt-6 pb-8 mb-4 regBox" v-on:submit.prevent="registerNewUser" >
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
             <button @click.prevent="" v-google-signin-button="clientId"> <img src="../assets/btn-Google.png" alt=""></button>
                <br> <br>
              <a @click.prevent="changePage('loginPage')" id="redirect" class="mt-5 bg-transparent hover:bg-blue-200 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded" >Already have an account? Click here.</a>
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
import google from './google.vue'
export default {
    name:'RegisterPage',
    data(){
        return {
            userNameRegister:'',
            emailRegister:'',
            passwordRegister:'',
            message:'',
            clientId: '492684105259-2th7q858luhjha31snjuvm6m3el5u0d1.apps.googleusercontent.com'
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
                    google_token: idToken
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
img {
    height: 50px;
}

img:hover {
    box-shadow: 0px -2px 14px -1px rgba(255,255,255,1);
}

.bg{
    background: linear-gradient(21deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}

.regBox {
    background: linear-gradient(252deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    box-shadow: -1px 3px 15px 0px rgba(0,0,0,1);
    border-radius:25px;
    width:500px;
    align-items: center;
    align-self: center;
    text-align: center;

}

#redirect:hover {
    cursor: pointer;
}
</style>
