<template>
  <div class="container mt-3">
    <h1 style="text-align:center">LOGIN</h1>
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="username">username</label>
        <input
          type="username"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      or signIn with Google
      <div class="g-signin2 btn btn-primary" data-onsuccess="onSignIn" @click="google">SignIn</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          this.$emit("emitloginStatus");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async google() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        console.log("getId", googleUser.getId());
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
        );
        this.isSignIn = this.$gAuth.isAuthorized;
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    googleSignIn() {
      this.$gAuth
        .signIn()
        .then((response) => {
          const id_token = response.getAuthResponse().id_token;
          console.log(id_token, "<<<<");
          axios({
            method: "POST",
            url: "http://localhost:3000/googlesignin",
            data: {
              id_token,
            },
          }).then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.access_token);
            this.$emit("emitloginStatus");
          });
        })
        .catch((err) => {
          console.error(err, "<<<<<<<<");
        });
    },
  },
};
</script> 