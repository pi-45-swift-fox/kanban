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
      <div class="g-signin2 btn btn-primary" data-onsuccess="onSignIn" @click="googleSignIn">SignIn</div>
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
        url: "https://kanban-swift.herokuapp.com/login",
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          this.$emit("emitloginStatus");
          this.$emit("emitnotif", { text: "berhasil login", status: true });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    googleSignIn() {
      this.$gAuth
        .signIn()
        .then((response) => {
          const id_token = response.getAuthResponse().id_token;
          axios({
            method: "POST",
            url: "https://kanban-swift.herokuapp.com/googlesignin",
            data: {
              id_token,
            },
          }).then((res) => {
            localStorage.setItem("token", res.data.access_token);
            this.$emit("emitShowLogin");
            this.$emit("emitnotif", {
              text: "berhasil login dengan google sigin",
              status: true,
            });
          });
        })
        .catch((err) => {
          console.error(err);
          localStorage.setItem("token", res.data.access_token);
          this.$emit("emitloginStatus");
        });
    },
  },
};
</script> 