<template>
    <div>
        <div id="reg">
            <div v-on:submit.prevent="registered">
            <h4>Register Form</h4>
            <form>
                <div class="form-group col-12">
                    <label for="register_email">Email address</label>
                    <input type="email" class="form-control" id="register-email" aria-describedby="emailHelp" v-model="email" required>
                </div>
                <div class="form-group col-12">
                    <label for="register_password">Password</label>
                    <input type="password" class="form-control" id="register_password" v-model="password" required>
                </div>
                <div class="form-group col-12">
                    <label for="register_password">Organization</label>
                    <input type="text" class="form-control" id="register_organization" v-model="organization" required>
                </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
        return {
            email: '',
            password: '',
            organization: ''
        }
    },
    methods: {
        registered() { 
            axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: {
                    email : this.email,
                    password : this.password,
                    organization: this.organization
                }
            })
            .then(new_user => { // respon menerima id dan email new user
                this.$emit('home')
            })
            .catch(err => {
                console.log(err)
            })
    },
    }
}
</script>

<style scoped>
#reg {
    display: flex;
    justify-content: center;
    text-align: center;
}

h4 {
    font-weight: bold;
}

button {
    background-color: rgb(0, 47, 255);
    border: none;
    color: white;
    align-items: center;
}

input {
    border: 1px solid rgb(16, 58, 97);
}
</style>