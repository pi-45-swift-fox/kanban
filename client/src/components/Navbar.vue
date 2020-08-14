<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand text-info" href="#">Kanban App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
      <div class="form-inline no-p navbar-right">
          <ul class="navbar-nav">
            <li class="nav-item dropdown" v-if="btnLogOut">
              <a href="#" id="userMenu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle toggle-user"> <span class="users">User</span> </a> 
                <div aria-labelledby="userMenu" class="dropdown-menu dropdown-menu-right user-div-menu">
                  <a class="dropdown-item logout" @click.prevent="logOut" href="#">Logout</a>
                </div>
            </li>
          </ul>
      </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ['btnLogOut'],
  data() {
    return {
      message: 'Hello navbar',
    };
  },
  methods: {
    logOut() {
      localStorage.clear()
      this.$emit("emitLogOut")
    }
  },
};
</script>

<style scoped>
</style>