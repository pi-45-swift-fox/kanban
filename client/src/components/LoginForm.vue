<template>
    <div id="log">
        <div v-on:submit.prevent="logged">
            <h4>Login Form</h4>
            <form>
                <div class="form-group col-12">
                    <label>Email address</label>
                    <input type="email" class="form-control" aria-describedby="emailHelp" v-model="email" required>
                </div>
                <div class="form-group col-12">
                    <label for="register_password">Password</label>
                    <input type="password" class="form-control" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    props: [],
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        logged() { 
            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                this.$emit('set_authorId', data.User.id)
                this.$emit('get_all_task')
                this.$emit('set_status')
                this.$emit('home')
                this.$emit('set_organization', data.User.organization)
                localStorage.setItem('access_token', data.access_token)

                this.email = ''
                this.password = ''
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
#log {
    display: flex;
    justify-content: center;
    text-align: center;
}

h4 {
    font-weight: bold;
}

button {
    background-color: rgb(0, 119, 255);
    border: none;
    color: white;
    align-items: center;
}

input {
    border: 1px solid rgb(255, 255, 255);
}
</style>