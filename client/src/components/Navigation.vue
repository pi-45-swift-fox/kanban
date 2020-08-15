<template>
    <div>
        <nav class="navbar navbar-light">
            <a class="navbar-brand" v-on:click="home"> <span>KANBAN-BOARD</span> </a>
            <div v-if="!status">
                <button type="button" class="btn btn-primary register" v-on:click.prevent="register_form">Register</button>
                <button type="button" class="btn btn-primary register" v-on:click.prevent="logout">Login</button>
                <GoogleButton></GoogleButton>
            </div>
            <div v-else-if="status">
                <button type="button" class="btn btn-primary"  v-on:click.prevent="task_form">New Task</button>
                <button type="button" class="btn btn-danger register" v-on:click.prevent="logout">Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
import GoogleButton from './Google_Button'

export default {
    name: 'Navigation',
    props: ['status'],
    components: {
        GoogleButton
    },
    methods: {
        home() { this.$emit('home') },
        logout() { this.$emit('logout') },
        task_form() { this.$emit('task_form') },
        register_form() { this.$emit('register_form') },
    }
}
</script>

<style>

</style>