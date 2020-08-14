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
        <!-- <br>
        <label for="" class="mt-4">Log In Using Google</label>
        <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
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
      },
      // onSignIn(googleUser) {
      //   var profile = googleUser.getBasicProfile();
      //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      //   console.log('Name: ' + profile.getName());
      //   console.log('Image URL: ' + profile.getImageUrl());
      //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      // }
    }
};
</script>

<style>
</style>