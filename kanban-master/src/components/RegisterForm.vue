<template>
  <div class="container-fluid register-page">
    <div class="col-12">
      <div class="alert alert-danger alert-dismissible collapse" role="alert" id="alertError">
        <a href="/" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>{{errorStatus}}</strong> {{errorMsg}}
      </div>
      <form @submit.prevent="registerForm">
        <h1>Register</h1>
        <div class="form-group">
          <label for="register-email">Email address</label>
          <input type="email" class="form-control" id="register-email" v-model="email"  aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="register-password">Password</label>
          <input type="password" class="form-control" id="register-password" v-model="password" aria-describedby="emailHelp">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <a v-on:click="loginBtn"><span class="btn btn-danger">Login Page</span></a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterPage',
    data() {
        return {
            email: '',
            password: '',
            errorStatus: '',
            errorMsg: ''
        }
    },
    methods: {
        registerForm() {
            axios({
                method: 'post',
                url: 'https://aarsandi-kanband.herokuapp.com/register',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                this.$emit('toDashboard')
            })
            .catch(err => {
              if(err.response.status == '400') {
                $('#alertError').show()
                this.errorStatus = err.response.status
                this.errorMsg = err.response.data.errors
              } else if (err.response.status == '401') {
                $('#alertError').show()
                this.errorStatus = err.response.status
                this.errorMsg = err.response.data.errors
              } else {
                this.$emit('toError')
              }
            })
        },
        loginBtn() {
            this.$emit('toLoginForm')
        }
    }
}
</script>

<style>

</style>