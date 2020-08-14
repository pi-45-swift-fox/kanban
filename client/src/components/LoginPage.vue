<template>
  <div>
    <div class="login-page cs-opacity container center-content">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <a @click.prevent="register" href="" ><button type="button" class="btn-primary">No account? Register here!</button></a>
        <br><br>
        <button type="submit" class="btn btn-primary btn-success">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginPage',
    props: ['server'],
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        axios({
          method: 'POST',
          url: `${this.server}/login`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(data=>{
          localStorage.setItem('access_token', data.data.access_token)
          this.$emit('pageStatus', 'main-page')
          this.email = ''
          this.password = ''
        })
        .catch(err=>{
          console.log(err);
        })
      },
      register() {
        this.$emit('pageStatus', 'register-page')
      }
    }
};
</script>

<style>
</style>