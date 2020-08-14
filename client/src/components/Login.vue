<template>
  <div class="row">
    <div class="col-md-5 mx-auto">
      <div id="first">
        <div class="myform form">
          <div class="logo mb-3">
            <div class="col-md-12 text-center">
              <h1 class="text-white">Login</h1>
            </div>
          </div>
          <form action method="post" name="login" @submit.prevent="submitLogin()">
            <div class="form-group">
              <label for="exampleInputEmail1" class="text-white">Email address</label>
              <input
                type="email"
                name="email"
                class="form-control"
                v-model="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text-white">Password</label>
              <input
                type="password"
                name="password"
                v-model="password"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
              />
            </div>
            <br />
            <div class="col-md-12 text-center">
              <input type="submit" class="btn btn-block mybtn btn-primary tx-tfm" value="Login" />
            </div>
            <div class="col-md-12 text-center">
              <div class="login-or">
                <hr class="hr-or" />
                <span class="span-or text-white">or you can use</span>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="mx-auto my-4" style="width: 5rem;">
                <GoogleSignIn @changePage="changePage"></GoogleSignIn>
              </div>
            </div>
            <div class="form-group">
              <p class="text-center text-white">
                Don't have account?
                <a href="#" id="signup" @click="changePage('register')">
                  Sign up
                  here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";
import Swal from "sweetalert2";
import GoogleSignIn from "./GoogleSignIn";

export default {
  name: "Login",
  components: {
    GoogleSignIn,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    changePage(val) {
      this.$emit("changePage", val);
    },
    submitLogin() {
      axios
        .post("/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          const data = res.data;

          localStorage.username = data.username;
          localStorage.access_token = data.token;

          this.changePage("home");
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              title: "Doot doot!",
              text: "Wrong email or password",
              icon: "error",
              showConfirmButton: false,
              timer: 1200,
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
};
</script>

<style>
</style>