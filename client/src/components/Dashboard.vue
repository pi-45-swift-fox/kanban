<template>
  <div>
    <div id="navbar ">
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand text-white font-weight-bold" href="#">かんばん</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            </ul>
            <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: rgb(250, 234, 234);">
                {{ panggilan }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" @click.prevent= "logout">Logout</a>
            </div>
        </div>
        </div>
        </nav>
    </div>
    <div class="container mt-2">
        <div class="row d-flex flex-row justify-content-between">
            <CategoryList :category="'BACK LOG'" :dbcategory="'back log'" :filteredTasks="backlog" :fetch-tasks="fetchTasks" :base-url="baseUrl"></CategoryList>            
            <CategoryList :category="'TODO'" :dbcategory="'todo'" :filteredTasks="todo" :fetch-tasks="fetchTasks" :base-url="baseUrl"></CategoryList>            
            <CategoryList :category="'DOING'" :dbcategory="'doing'" :filteredTasks="doing" :fetch-tasks="fetchTasks" :base-url="baseUrl"></CategoryList>            
            <CategoryList :category="'COMPLETED'" :dbcategory="'completed'" :filteredTasks="completed" :fetch-tasks="fetchTasks" :base-url="baseUrl"></CategoryList>            
        </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import CategoryList from './CategoryList.vue'

export default {
        name: 'Kanban-home-page',
        props: ['baseUrl'],
        components: {
            CategoryList
        },
        data(){
            return {
            tasks: [],
            panggilan: localStorage.panggilan,
            }
        },
        computed: {
            backlog(){
                return this.tasks.filter(task => {
                    return task.category === 'back log'
                })
            },
            todo(){
                return this.tasks.filter(task => {
                    return task.category === 'todo'
                })
            },
            doing(){
                return this.tasks.filter(task => {
                    return task.category === 'doing'
                })
            },
            completed(){
                return this.tasks.filter(task => {
                    return task.category === 'completed'
                })
            },
        },
        methods: {
            logout(){
            this.$emit('changeLogin', false)
            this.$emit('changePage', 'login-page')
            localStorage.clear()
            },
            fetchTasks(){
                axios({
                    method: 'GET',
                    url: `${this.baseUrl}/tasks`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then((result) => {                         
                    this.tasks = result.data
                    console.log('berhasil', result.data)
                }).catch((err) => {
                    console.log('error', err)
                });
            }
        },
        created(){
            this.fetchTasks()
        }
}
</script>

<style scoped>

</style>