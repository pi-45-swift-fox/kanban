<template>
  <div>
    <g-signin-button
      class="btn btn-light"
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >Google</g-signin-button>
  </div>
</template>

<script>
import axios from '../api/axios';
import Swal from "sweetalert2";

export default {
  name: "GoogleSignIn",
  data() {
    return {
      googleSignInParams: {
        client_id:
          "124181030642-4d1m4s0cpaqu47lvvp41191e3913l2uh.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      
      axios({
          method: 'POST',
          url: '/google-login',
          headers: {
              token: id_token
          }
      })
      .then((res) => {
          console.log(res);
          const user = res.data;
        localStorage.username = user.username;
        localStorage.access_token = user.token;
        this.$emit("changePage", "home");
      })
      .catch((error) => {
          console.log(error);
      })
    },
    onSignInError(error) {
      if (error.error === "popup_closed_by_user") {
        console.log("window closed");
      } else {
        Swal.fire({
          title: "Doot doot!",
          text: "Something went terribly wrong!",
          icon: "error",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    },
  },
};
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>