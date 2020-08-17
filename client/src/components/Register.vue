<template>
  <div>   
    <div class="container-fluid fill">
        <div class="mt-5 mb-5">
            <div class="card p-3 bg-dark">
                <h4 class="text-center text-white">Register To <span class="font-weight-bold">かんばん</span></h4>
                <form action="" method="post" @submit.prevent="register">
                    <div class="form-group">
                        <label for="email" class="text-white">Email</label><br>
                        <input type="text" class="form-control" name="email" placeholder="Input Your Email" v-model="emailRegister">
                        <small id="emailHelp" class="form-text text-muted text-white">We'll never share your email with anyone else.</small> <br>
                        <label for="password" class="text-white">Password</label><br>
                        <input type="text" class="form-control" name="password" placeholder="Input Your Password" v-model="passwordRegister"> <br>
                        <br>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label text-white" for="exampleCheck1">Check me out if you have fill it alright</label>
                        </div>
                        <div class="mx-auto w-55 float-right">
                            <button type="submit" class="btn btn-light">Register</button> <button id="" class="btn btn-danger" @click.prevent="backLogin">Back</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    props: ['baseUrl','showAlert'],
    data(){
        return {
            emailRegister: '',
            passwordRegister: '',
        }
    },
    methods: {
        register(){
            axios({
                method: 'POST',
                url: `${this.baseUrl}/register`,
                data: {
                    email: this.emailRegister,
                    password: this.passwordRegister
                }
            })
            .then((result) => {  
                this.$emit('changeLogin', false)
                this.$emit('changePage', 'login-page')
                this.$emit('showAlertSuccess', result.data)  
                console.log('berhasil', result.data)
            }).catch((err) => {
                console.log('error', err)
                this.$emit('showAlert', err)
            });
        },
        backLogin(){
            this.$emit('changePage', 'login-page') 
        },
    }
}
</script>

<style>

</style>