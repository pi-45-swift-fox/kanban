<template>
  <div id="app">
    <div class="header">
     <Navbar @home="home" @add="openAdd" @logout="logout" v-if="isLogin"></Navbar>
    </div>
    <AddPage v-if="isLogin && isAdd" @cancel="home"></AddPage>
    <Homepage v-else-if="isLogin && !isAdd"></Homepage>
    <LoginPage @logged="logged" v-if="!isLogin"></LoginPage>
  </div>
</template>

<script>
import Homepage from './views/HomePage'
import LoginPage from './views/Loginpage'
import AddPage from './views/Addpage'
import Navbar from './components/Navbar'
import EditPage from './views/UpdatePage'
export default {
  data() {
    return {
      isLogin: false,
      isAdd: false
    };
  },
  components: {
      Homepage,
      LoginPage,
      Navbar,
      AddPage,
      EditPage
  },
  methods: {
    logged () {
        this.isLogin = true
    },
    logout () {
      this.isLogin = false
      localStorage.clear()
      // var auth2 = gapi.auth2.getAuthInstance()
      // auth2.signOut().then(function () {
      //   console.log('User signed out.')
      // })
    },
    openAdd () {
      this.isAdd = true
    },
    home () {
      this.isAdd = false
    }
  },
  created() {
      if (localStorage.access_token) {
          this.isLogin = true
      }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sofia&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: url('https://s3.amazonaws.com/media-p.slid.es/uploads/logihelgu/images/1086249/Wood-background-black-wallpapers-wallpaper-476440.jpg'); */
  background-repeat: no-repeat;
  background-size: cover;
  /* min-height: 695px; */
  /* max-height: 100%; */
}
.header{
  height: 50px;
}
::-webkit-scrollbar {
    display: none;
}
</style>