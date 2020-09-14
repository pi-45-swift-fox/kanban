<template>
  <nav id="font" class="navbar navbar-light border-bottom border-info">
    <a style="color: #f2f2f2;" class="navbar-brand" href="">Kanban.</a>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a @click.prevent="showHomePage" class="nav-link" href="">Home</a>
      </li>
      <li class="nav-item">
        <a @click.prevent="showLoginPage" class="nav-link" href="#">Login</a>
      </li>
      <li class="nav-item">
        <a @click.prevent="showRegisterPage" class="nav-link" href="#">Register</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "NavHome",
    data() {
      return {

      }
    },
    methods: {
      showHomePage(event)
      {
        this.$emit('showPage', 'HomePage');
      },
      showLoginPage(event)
      {
        this.$emit('showPage', 'LoginPage');
      },
      showRegisterPage(event)
      {
        this.$emit('showPage', 'RegisterPage');
      }

    }
  }
</script>

<style media="screen">

</style>
