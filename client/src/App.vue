

<template>
  <div>
    <Navbar
      :statusLogin="isLoggedIn"
      @emitShowRegister="showRegister"
      @emitShowLogin="showLogin"
      @emitLogOut="logOut"
    ></Navbar>
    <Login @emitloginStatus="successLogin" v-if="!isLoggedIn && !isRegister"></Login>
    <Register v-if="!isLoggedIn && isRegister"></Register>
    <TaskList v-if="isLoggedIn"></TaskList>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      isRegister: false,
    };
  },
  components: {
    Navbar: Navbar,
    Login: Login,
    Register: Register,
    TaskList: TaskList,
  },
  methods: {
   
    successLogin() {
      this.isLoggedIn = true;
    },
    showRegister() {
      this.isRegister = true;
      this.isLoggedIn = false;
    },
    showLogin() {
      this.isRegister = false;
      this.isLoggedIn = false;
    },
    logOut() {
      console.log("logout");
      localStorage.clear();
      this.isRegister = false;
      this.isLoggedIn = false;
    },
  },
  created() {
    if (localStorage.token) {
      this.successLogin();
    } else {
      this.showLogin();
    }
  },
};
</script>

<style scoped>
</style>

