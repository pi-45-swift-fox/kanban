<template>
    <div class="container-fluid fill bg-dark p-0" >
        <h3 class="text-center text-white">Welcome to <span class="font-weight-bold">かんばん</span> App</h3>
        <p class="text-center text-white"><span class="font-weight-bold">かんばん</span> App make you easier to manage works. Because you can manage what will do, <br>then what is a work still doing, what has done, and what has completed</p>
        <div class="mt-5 mb-5 ">
            <div class="card shadow-none p-3">
                <h4 class="text-center">Login To <span class="font-weight-bold">かんばん</span></h4>
                <form action="" method="post" @submit.prevent="login">
                    <div class="form-group">
                        <input type="text" class="form-control" name="email" placeholder="Input Your Email" v-model="email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> <br>
                        <input type="text" class="form-control" name="password" placeholder="Input Your Password" v-model="password"> 
                        <a href="#" @click.prevent="showRegister">Haven't an account register here</a>
                        <br><br>
                        <div class="mx-auto w-25">
                            <button type="submit" class="btn btn-secondary">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login(){
            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then((result) => {
                this.$emit('changeLogin', true)
                this.$emit('changePage', 'kanban-home-page')
                localStorage.access_token = result.data.access_token
                localStorage.panggilan = result.data.panggilan
                console.log(result.data);   
            }).catch((err) => {
                console.log('error', err);
            });
        },
        showRegister(){
            this.$emit('changePage', 'register-page')
        },
    }

}
</script>

<style>

</style>