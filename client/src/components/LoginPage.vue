<template>
  <section id="login-page" class="vh-100 home-page">
    <NavHome @showPage="loginPage"></NavHome>

    <div class="shadow-sm p-3 mb-5 rounded rounded-sm text-center container form-container">
      <p style="font-size: 3vw;">Login here</p>
      <form @submit.prevent="loginPost">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="form-group">
          <a @click.prevent="loginPage('RegisterPage')" style="color: #0540F2" href="">Register Here</a>
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-light button-size btn-color1 shadow-sm p-3 mb-5">Log in</button>
          <button @click="loginPage('HomePage')" type="button" class="btn btn-danger button-size shadow-sm p-3 mb-5">Cancel</button>
        </div>
        <div class="g-signin2" data-width="400" data-height="50" data-longtitle="true" data-theme="dark" data-onsuccess="onSignIn"></div>
      </form>

    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import NavHome from './NavHome.vue';

  export default {
    name: "LoginPage",
    data() {
      return {
        email: '',
        password: ''
      }
    },
    components: {
      NavHome
    },
    methods: {
      loginPage(val)
      {
        this.$emit('showLoginPage', val);
      },
      loginPost()
      {
        console.log('submit login');
        axios({
          method: "post",
          url: "http://localhost:3000/login",
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(response => {
            console.log(response.data);
            localStorage.access_token = response.data.access_token;
            this.$emit('afterPost', 'HomePage');
          })
          .catch(err => {
            console.log(err);
          })
      },
      onSignIn(googleUser)
      {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }
    },
    created() {
      this.email = '';
      this.password = '';
    }
  }
</script>

<style media="screen">

</style>
