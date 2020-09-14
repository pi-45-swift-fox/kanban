<template>
  <div>
    <Home @afterLogin="checkAccessToken" v-if="!isLogin"></Home>
    <Dashboard @afterLogin="checkAccessToken" v-else></Dashboard>
  </div>
</template>

<script>
  import Home from './components/Home.vue';
  import Dashboard from './components/Dashboard.vue';

  export default {
    name: 'App',
    data() {
      return {
        isLogin: false
      };
    },
    components: {
      Home,
      Dashboard
    },
    methods: {
      checkAccessToken()
      {
        if (localStorage.access_token)
          this.isLogin = true;
        else
          this.isLogin = false;
      }
    },
    created() {
      this.checkAccessToken();
    }
  };
</script>

<style media="screen">

</style>
