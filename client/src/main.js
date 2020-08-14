import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '766560688657-4jgd4h9aq2u2vgcb77kse7a0plt317ig.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app');