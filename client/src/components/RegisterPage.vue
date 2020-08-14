<template id="">
  <section id="register-page" class="vh-100 home-page">
    <NavHome @showPage="registerPage"></NavHome>

    <div class="shadow-sm p-3 mb-5 rounded rounded-sm text-center container form-container">
      <p style="font-size: 3vw;">Register here</p>
      <form @submit.prevent="registerUser">
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
          <a @click.prevent="registerPage('LoginPage')" style="color: #0540F2" href="">Login Here</a>
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-light button-size btn-color1 shadow-sm p-3 mb-5">Register</button>
          <button @click="registerPage('HomePage')" type="button" class="btn btn-danger button-size shadow-sm p-3 mb-5">Cancel</button>
        </div>
      </form>

    </div>
  </section>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import NavHome from './NavHome.vue';

  export default {
    name: "RegisterPage",
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
      registerPage(val)
      {
        this.$emit('showRegisterPage', val);
      },
      registerUser()
      {
        axios({
          method: 'post',
          url: 'http://localhost:3000/register',
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(response => {
          console.log(response.data);
          axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then(response => {
            this.$emit('afterPost');
          })
          .catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          console.log(err);
        })
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
