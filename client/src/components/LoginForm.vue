<template>
<div class="content-login">
  <div class="sampul">
    <img src="https://www.pamijen.id/wp-content/uploads/2018/10/873f0cc2ef63c84a44b97fa2eb99f3e14c8584cbd57ce4c2a3ae839846ab2209.jpg" id="bg-sampul">
    <div class="sampul-detail">
      <h3 id="text-sampul">
        Built for People
        <br>
        Kanban is a simple web to see other's<br> Lists from people arround the world on this web.
        <br>
        Lets be Part of Us.
        <br> Anywhere, anytime. Let's Start Make Some Fancy Now!
        <br> Login Or Register to Enjoy a New Experience
      </h3>
    </div>
  </div>
  <div class="login">
    <img id="logs" src="https://img.icons8.com/ios-filled/100/000000/change-user-male.png"/>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 col-mt-1 mx-auto" id="form-login">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">LOGIN</h5>
              <form class="form-signin">
                <div class="form-label-group">
                  <input
                    type="email"
                    id="loginEmail"
                    class="form-control"
                    placeholder="Email address"
                    v-model="user.email"
                    required
                    autofocus
                  />
                  <label for="loginEmail">Email address</label>
                </div>
                <div class="form-label-group">
                  <input
                    type="password"
                    id="loginPassword"
                    class="form-control"
                    placeholder="Password"
                    v-model="user.password"
                    required
                  />
                  <label for="loginPassword">Password</label>
                </div>
                <button
                  class="btn btn-lg btn-dark btn-block text-uppercase"
                  type="submit"
                  @click.prevent="login"
                >Login</button>
                <div class="link">
                  <a href="#" id="link" @click.prevent="dontHaveAcc">Don't Have Account?</a>
                  <hr>
                </div>
                  <h6>Or Login with:</h6>
                <div class="social">
                  <GoogleLogin
                    :params="params"
                    :renderParams="renderParams"
                    :onSuccess="onSuccess"
                    :onFailure="onFailure"
                  ></GoogleLogin>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login'
export default {
    components: {
        GoogleLogin,
    },
    name: 'LoginForm',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            params: {
                client_id: "975105577426-ki5n7kf633aldqml189i81m64ll099he.apps.googleusercontent.com"
            },
            renderParams: {
                width: 150,
                height: 50,
                longtitle: false
            }
        }
    },
    methods: {
        dontHaveAcc() {
            this.$emit('dontHaveAcc')
        },
        login() {
            console.log(this.user.password);
            axios({
                method: 'POST',
                url: `https://protected-hollows-86433.herokuapp.com/login`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(result => {
                    this.user.email = ''
                    this.user.password = ''
                    localStorage.setItem('access_token', result.data.access_token)
                    this.$emit('logged')
                })
                .catch(err => {
                    console.log(err);
                })
        },
        onSuccess(googleUser) {
            const profile = googleUser.getBasicProfile()
            const id_token = googleUser.getAuthResponse().id_token
            console.log(id_token)
            axios({
                method: 'POST',
                url: 'https://protected-hollows-86433.herokuapp.com/googleLogin',
                data: {
                    id_token
                }
            })
                .then(result => {
                    console.log(result);
                    localStorage.setItem('access_token', result.data.access_token)
                    this.$emit('logged')
                })
                .catch(err => {
                    console.log(err);
                })
        },
        onFailure(error) {
            console.log(`error: ${error}`);
        }
    }
};
</script>

<style scoped>
.sampul-detail {
  margin-top: -70%;
  margin-left: 6%;
  background-color: red;
  width: 80%;
}
#text-sampul {
  color: whitesmoke;
  font-family: 'Abril Fatface', cursive;
}
.body {
  margin: 0;
  padding: 0;
}
#logs {
  margin-top: 8%;
}
#form-login {
  margin-top: -5%;
}
.content-login {
  background-color: #5757a1;
  margin-top: -9.9%;
  height: 100%;
  display: flex;
  flex-direction: wrap;
}
.sampul {
  width: 50%;
}
#bg-sampul {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.login {
  width: 50%;
}
:root {
 --input-padding-x: 1.5rem;
 --input-padding-y: .75rem;
}

.card-signin {
 border: 0;
 border-radius: 1rem;
 background: rgba(255, 255, 255, 0.5);
 box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
 text-align: center;
}

.card-signin .card-title {
 margin-bottom: 2rem;
 font-weight: 300;
 font-size: 1.5rem;
}

.card-signin .card-body {
 padding: 2rem;
}

.form-signin {
 width: 100%;
}

.form-signin .btn {
 font-size: 80%;
 border-radius: 5rem;
 letter-spacing: .1rem;
 font-weight: bold;
 padding: 1rem;
 transition: all 0.2s;
}

.form-label-group {
 position: relative;
 margin-bottom: 1rem;
}

.form-label-group input {
 height: 30px;
 border-radius: 2rem;
 background: lightblue;
 text-align: center;
}

.form-label-group>input,
.form-label-group>label {
 padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
 position: absolute;
 top: 0;
 left: 0;
 display: block;
 width: 100%;
 margin-bottom: 0;
 line-height: 1.5;
 color: #495057;
 border: 1px solid transparent;
 border-radius: .25rem;
 transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
 color: transparent;
}

.form-label-group input:-ms-input-placeholder {
 color: transparent;
}

.form-label-group input::-ms-input-placeholder {
 color: transparent;
}

.form-label-group input::-moz-placeholder {
 color: transparent;
}

.form-label-group input::placeholder {
 color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
 padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
 padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
 padding-top: calc(var(--input-padding-y) / 3);
 padding-bottom: calc(var(--input-padding-y) / 3);
 font-size: 12px;
 color: #777;
}

.social{
  margin-top: 10px;
  width: inherit;
  display: flex;
  justify-content: center;
}

.link {
  margin-top: 10px;
 text-align: center;
}
</style>