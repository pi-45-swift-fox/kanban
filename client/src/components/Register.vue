<template>
  <div class="row">
    <div class="col-md-5 mx-auto">
      <div id="second">
        <div class="myform form">
          <div class="logo mb-3">
            <div class="col-md-12 text-center">
              <h1 class="text-white">Register</h1>
            </div>
          </div>
          <form action method="post" name="registration">
            <div class="form-group">
              <label for="exampleInputEmail1" class="text-white">Email address</label>
              <input
                type="email"
                name="email"
                class="form-control bg-dark border border-dark text-white"
                v-model="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text-white">Username</label>
              <input
                type="text"
                name="Username"
                class="form-control bg-dark border border-dark text-white"
                v-model="username"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" class="text-white">Password</label>
              <input
                type="password"
                name="password"
                v-model="password"
                class="form-control bg-dark border border-dark text-white"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
              />
            </div>
            <div class="col-md-12 text-center mb-3">
              <button
                type="submit"
                @click.prevent="submitRegister()"
                class="btn btn-block mybtn btn-primary tx-tfm"
              >
                Get
                Started For Free
              </button>
            </div>
            <div class="form-group">
              <p class="text-center">
                <a href="#" @click="changePage()">Already have an account?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../api/axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    changePage() {
      this.$emit("changePage", "login");
    },
    submitRegister() {
      axios({
        method: "POST",
        url: "/register",
        data: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          Swal.fire({
            title: "Nice, you've been registered!",
            text: "Try logging in now",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          this.changePage();
        })
        .catch((error) => {
          if (error.response) {
            Swal.fire({
              title: "Whoops!",
              text: error.response.data.msg,
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