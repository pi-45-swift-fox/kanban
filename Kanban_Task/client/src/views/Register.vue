<template>
  <div>
      <h2>Register </h2>
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
        <button type="submit" class="btn btn-primary" @click.prevent="registerUser">Register</button>
        <button type="submit" class="btn btn-primary" @click.prevent="goToLogin"> Go to Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            email:'',
            password:''
        }
    },
    methods:{
        registerUser(){
            axios({
                method:'post',
                url:'http://localhost:3000/register',
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then(data=>{
                this.goToLogin()
            })
            .catch(err=>{
                console.log('Register Error',err)
            })
        },
        goToLogin(){
        this.$emit('emitFromRegister')
    }
    },
    
}
</script>

<style>

</style>