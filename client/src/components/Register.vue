<template>
  <div class="container mt-3">
    <h1 style="text-align:center">REGISTER</h1>
    <form v-on:submit.prevent="regis">
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
      <button type="submit" class="btn btn-primary">Register</button>
      or signIn with Google
      <div class="g-signin2 btn btn-primary" data-onsuccess="onSignIn" @click="googleSignIn">SignIn</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    regis() {
      axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          this.$emit(1);
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
          console.log(id_token);
          axios({
            method: "POST",
            url: "http://localhost:3000/googlesignin",
            data: {
              id_token,
            },
          }).then((res) => {
            localStorage.setItem("token", res.data.access_token);
            this.$emit("emitloginStatus");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>