<template>
    <div class="dashboard">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a v-on:click="dashboardBtn" class="navbar-brand"><span class="btn nav-btn">Dashboard</span></a>
                    </li>
                </ul>
            </div>
        </nav><br>
        <div class="jumbotron jumbotron-fluid bg-image">
            <div class="container">
                <h1 class="display-4">Well, this is awkward</h1>
                <p class="lead">404 / 500 - Could not find what you are looking for</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorPage',
    methods: {
        dashboardBtn() {
            this.$emit('toDashboard')
        }
    }
}
</script>

<style>

</style>