<template>
  <div>
    <navbar @emitLogOut="emitLogOut" :btnLogOut="isLogin"> </navbar>
    <register v-if="isRegister && !isLogin" @toLogin="emitLogOut" @processRegister="emitLogin"> </register>
    <login v-else-if="!isLogin && !isRegister" @emitLogin="emitLogin" @toRegister="emitRegister"> </login>
    <home v-else-if="isLogin"> </home>
  </div>
</template>

<script>
import Login from './views/Login'
import Navbar from './components/Navbar'
import Register from './views/Register'
import Home from './views/Home'
import axios from 'axios'
export default {
  components: {
    Navbar,
    Login,
    Register,
    Home
  },
  data() {
    return {
      page: "",
      isLogin: false,
      isRegister: false
    };
  },
  created() {
    if (localStorage.access_token) {
      this.emitLogin()
    } else {
      this.emitLogOut()
    }
  },
  methods: {
    emitLogin () {
      this.isLogin = true
    },
    emitLogOut () {
      this.isLogin = false
      this.isRegister = false
    },
    emitRegister () {
      this.isRegister = true
    }
  },
};
</script>

<style scoped>
</style>