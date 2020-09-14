<template>
  <section id="home-page" class="vh-100 home-page">
    <NavHome @showPage="homePage"></NavHome>

    <div class="text-center header container">
      <p style="font-size: 5vw;">Welcome to your <strong style="font-family: 'Poppins', sans-serif; color: #f2f2f2;">Kanban.</strong> app</p>
      <p class="w-75 p-3" style="font-size: 1vw;">Reorganize your workflow and save countless time on your project using the <strong style="font-family: 'Poppins', sans-serif; color: #f2f2f2;">kanban.</strong> app. To get started click the log in button if you already have an account or click register to create a new account.</p>

      <div class="button-group">
        <button @click="homePage('LoginPage')" type="button" class="btn btn-light button-size btn-color1 shadow-sm p-3 mb-5">Log in</button>
        <button @click="homePage('RegisterPage')" type="button" class="btn btn-primary button-size shadow-sm p-3 mb-5">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
  import NavHome from './NavHome.vue';

  export default {
    name: "HomePage",
    components: {
      NavHome
    },
    methods: {
      homePage(val)
      {
        this.$emit('showHomePage', val);
      }
    }
  }
</script>

<style media="screen">

</style>
