<template>
  <div>
    <div class="login-page cs-opacity container center-content">
      <form @submit.prevent="register">
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
        <button type="submit" class="btn btn-primary btn-success">Submit</button>
        <a @click.prevent="cancel" href=""><button class="btn btn-primary btn-danger">Cancel</button></a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterPage',
    props: ['server'],
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      register() {
        axios({
          method: 'POST',
          url: `${this.server}/register`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(data=>{
          this.$emit('pageStatus', 'login-page')
          this.email = ''
          this.password = ''
        })
        .catch(err=>{
          console.log(err);
        })
      },
      cancel() {
        this.$emit('pageStatus', 'login-page')
      }
    }
};
</script>

<style>
</style>