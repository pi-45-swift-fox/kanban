<template>
  <div class="navbar navbar-dark bg-info box-shadow">
    <div class="container d-flex justify-content-between">
      <strong class="navbar-brand">Kanban</strong>
      <div class="ml-auto">
        <button class="btn btn-primary" v-show="!statusLogin" @click="showLogin">Login</button>
        <button class="btn btn-primary" v-show="!statusLogin" @click="showRegister">Register</button>
        <button class="btn btn-danger" v-show="statusLogin" @click="logoutKanban">Logout</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  props: ["statusLogin"],
  watch: {},
  methods: {
    showRegister() {
      this.$emit("emitShowRegister");
    },
    showLogin() {
      this.$emit("emitShowLogin");
    },
    logoutKanban() {
      this.$emit("emitLogOut");
    },
  },
};
</script>