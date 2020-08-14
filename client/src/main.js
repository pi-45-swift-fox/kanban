import Vue from 'vue'
import App from './App.vue'

new Vue ({
    render: h => h(App)
}).$mount('#app');
// var app = new Vue({
//     el: '#app',
//     data: {
//       message: 'Hello Vue!',
//     //   modalRegister = `
//     //   <div class="modal" tabindex="-1" role="dialog">
//     //     <div class="modal-dialog" role="document">
//     //         <div class="modal-content">
//     //         <div class="modal-header">
//     //             <h5 class="modal-title">Success</h5>
//     //             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//     //             <span aria-hidden="true">&times;</span>
//     //             </button>
//     //         </div>
//     //         <div class="modal-body">
//     //             <p>Modal body text goes here.</p>
//     //         </div>
//     //         <div class="modal-footer">
//     //             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//     //         </div>
//     //         </div>
//     //     </div>
//     //     </div>
//     //   `
//     },
//     methods: {
//         login(){
//             axios({
//                 method: 'POST',
//                 url: 'http://localhost:3000/login',
//                 data: {
//                     email: this.email,
//                     password: this.password
//                 }
//             })
//             .then((result) => {
//                 this.isLogin = true
//                 this.page = 'kanban-home-page'
//                 localStorage.access_token = result.data
//                 console.log(result.data);   
//             }).catch((err) => {
//                 console.log('error', err);
//             });
//         },
//         logout(){
//             this.isLogin =false
//             this.page = 'login-page'
//         },
//         showRegister(){
//             this.page = 'register-page'
//         },
//         register(){
//             axios({
//                 method: 'POST',
//                 url: 'http://localhost:3000/register',
//                 data: {
//                     email: this.emailRegister,
//                     password: this.passwordRegister
//                 }
//             })
//             .then((result) => {     
//                 this.isLogin =false
//                 this.page = 'login-page'       
//                 console.log('berhasil', result.data)
//             }).catch((err) => {
//                 console.log('error', err)
//             });
//         },
//         backLogin(){
//             this.page = 'login-page'
//         }
//     }

//   })