

<template>
  <div>
    <Navbar
      :statusLogin="isLoggedIn"
      @emitShowRegister="showRegister"
      @emitShowLogin="showLogin"
      @emitLogOut="logOut"
    ></Navbar>
    <Notif :notif="notification" v-if="notification"></Notif>
    <Login @emitloginStatus="successLogin" v-if="!isLoggedIn && !isRegister" @emitnotif="notif"></Login>
    <Register v-if="!isLoggedIn && isRegister" @emitShowLogin="showLogin" @emitnotif="notif"></Register>
    <TaskList v-if="isLoggedIn" @emitnotif="notif"></TaskList>
  </div>
</template>

<script>
import Notif from "./components/Notif";
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
      notification: '',
    };
  },
  components: {
    Notif: Notif,
    Navbar: Navbar,
    Login: Login,
    Register: Register,
    TaskList: TaskList,
  },
  methods: {
    notif(notification) {
      this.notification = notification;
      setTimeout(function () {
        console.log('<<<<<<')
        this.notification = '';
      }, 5000);
    },
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

