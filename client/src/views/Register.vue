<template>
  <div>
    <div class="col-10 offset-4">
        <div class="container mt-1">
          <div class="row">

            <div class="col-sm-4" id="register-form">
              <form class="mt-3" @submit.prevent="processRegister()">
                <h4 style="text-align: center;">Register</h4>
                <label class="badge badge-danger text-wrap error" id="error" v-if="showError" > {{ errMsg }} </label>
                <div class="form-group">
                  <label for="exampleInputName1">Name</label>
                  <input type="text" class="form-control" id="nameRegister" v-model="nameRegister">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="emailRegister" v-model="emailRegister" aria-describedby="emailHelp">
                  <small id="emailHelpRegister" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="passwordRegister" v-model="passwordRegister">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Confirm Password</label>
                  <input type="password" class="form-control" id="passwordRegister" v-model="confirmPassword">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Organization</label>
                  <input type="text" class="form-control" id="organizationRegister" placeholder="Hacktiv8" disabled>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button> <br><br>
                <h5>Have an account? Click <a class="navbar-brand" href="#" @click.prevent="haveAccount()"> here</a></h5>
              </form>
            </div>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: "Register",
  data() {
    return {
      nameRegister: "",
      emailRegister: "",
      passwordRegister: "",
      confirmPassword: null,
      showError: false,
      errMsg: null
    };
  },
  methods: {
    haveAccount () {
      this.$emit('toLogin')
    },
    processRegister () {
      if (this.passwordRegister !== this.confirmPassword) {
        this.showError = true
        this.errMsg = "The password must match"
        console.log("The password must match");
      } else {
        axios({
          method: "POST",
          url: "https://arcane-river-55482.herokuapp.com/register",
          data: {
            name: this.nameRegister,
            email: this.emailRegister,
            password: this.passwordRegister
          }
        })
        .then(result => {
          this.$emit("toLogin")
        })
        .catch(err => {
          console.log(err);
          this.showError = true
          this.errMsg = err.response.data.message
        })
      }
    }
  },
};

</script>

<style scoped></style>