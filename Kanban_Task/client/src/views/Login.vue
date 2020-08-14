<template>
    <div>
      <h2>Login </h2>
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" >
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>

        <button type="submit" class="btn btn-primary" @click.prevent="loginUser">Submit</button>
        <button type="submit" class="btn btn-primary" @click.prevent="goToRegister"> Go to Register</button>
    </form>
  </div>
</template>

<script>
// const axios = require('axios').default;
import axios from 'axios'
export default {
    data(){
        return {
            email:'',
            password:''
        }
    },
    methods:{
        loginUser(){
            axios({
                method:'POST',
                url:'http://localhost:3000/login',
                data: {
                    email:this.email,
                    password:this.password
                }
            })
            .then(data=>{
                    console.log(data.data)
                    localStorage.access_token=data.data.token
                    this.$emit('emitFromLogin')

                })
            .catch(err=>{
                    console.log(err)
            })
        },
        goToRegister(){
            this.$emit('emitToRegister')
        },
        onSignIn(){
            function onSignIn(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token)
    axios({
        url:'http://localhost:3000/googleSignIn',
        method:'POST',
        data:{id_token}
    })
    .then(data=>{
        afterLogin()
        $('#tableTitle').text(`Todo of ${data.email}`)

        localStorage.token=data.access_token
        showTodos()
    })
    .catch(err=>{
        console.log(err)
    })
    
  }

        }
    }
}
</script>

<style>

</style>