<template>
  <div>
    <nav class="navbar navbar-dark h1" id="navbar-custom">
      <a class="navbar-brand kanban mr-auto " href="#" @click="refresh">Kanban</a>
      <a class="btn btn-danger" @click="logout">Logout</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      // userEmail: localStorage.currentUserEmail
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$emit('successLogout')
    },
    refresh() {
      this.$emit('refresh')
    }
  }
};
</script>

<style lang="stylus">
#navbar-custom {
  background: #292827;
}
</style>