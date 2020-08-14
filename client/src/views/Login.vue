<template>

    <div class="col-10 offset-4">
        <div class="container mt-1">
          <div class="row">

            <div class="col-sm-4" id="login-form">
              <form class="mt-3" @submit.prevent="processLogin()">
                <h4 style="text-align: center;">Login</h4>
                <label class="badge badge-danger text-wrap error" id="error" v-if="showError" > {{ errMsg }} </label>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" v-model="emailLogin" aria-describedby="emailHelp">
                  <small id="emailHelpLogin" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" v-model="passwordLogin">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Organization</label>
                  <input type="password" class="form-control" placeholder="Hacktiv8" disabled>
                </div>
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="submit" class="btn btn-primary btn-md">Login</button>
                  </div>
                  <div class="btn-group mr-2" role="group" aria-label="Second group">
                    <button class="btn btn-info g-signin2 ml-2" data-onsuccess="onSignIn" @click.prevent="googleAuth()"> Google </button>
                  </div>
                </div>
                <h5>Don't have account? Click <a class="navbar-brand text-primary mt-2" href="#" @click.prevent="makeAccount()">
                  here</a>
                </h5>
              </form>
            </div>

        </div>
      </div>
    </div>

</template>

<script>

import axios from "axios"
export default {
  name: "login",
  data() {
    return {
      showError : false,
      errMsg: null,
      emailLogin: '',
      passwordLogin: ''
    };
  },

  methods: {
    makeAccount () {
      this.$emit('toRegister')
    },

    processLogin () {
      axios({
        method: "POST",
        url: "https://arcane-river-55482.herokuapp.com/login",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin,
        }
      })
      .then(result => {
        localStorage.setItem('access_token', result.data.access_token)
        this.$emit("emitLogin")
      })
      .catch(err => {
        console.log(err);
        this.showError = true
        // this.errMsg = err.response.data.message
      })
    },

    googleAuth () {
      this.$gAuth.signIn()
      .then((result) => {
        const dataGoogle = result.getAuthResponse()
        const id_token = dataGoogle.id_token
        this.googleLogin(id_token)
      })
      .catch((err) => {
        console.log(err);
      });
      this.isSignIn = this.$gAuth.isAuthorized
    },

    googleLogin (idToken) {
      axios({
        method: "POST",
        url: `http://localhost:3000/googleSignIn`,
        headers: {
          google_token: idToken
        }
      })
        .then(result => {
          localStorage.setItem("access_token", result.data.access_token);
          this.$emit("emitLogin");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};

</script>

<style scoped></style>