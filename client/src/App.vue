<template>
    <div>
      <Navigation 
        @register_form="register_form" 
        @task_form="task_form"
        @logout="logout" 
        @home="home" 

        :status="status" 
      ></Navigation>
        <div class="containers" v-if="show_page == 'home'" >
            <Cards 
                v-for="(category, i) in categories" :key="i"
                @delete_task="delete_task"
                @edit_task="edit_task" 
                @get_all_task="get_all_task"

                :status="status"
                :tasks="tasks"
                :category="category"
                :organization="organization"
            ></Cards>
        </div>

      <RegisterForm  
        @home="home"

        v-if="show_page == 'register'" 
      ></RegisterForm>

      <LoginForm 
        @set_organization="set_organization"
        @set_authorId="set_authorId" 
        @set_status="set_status" 
        @home="home" 
        
        v-if="show_page == 'login'" 
      ></LoginForm>

      <AddTask 
        @set_status="set_status" 
        @home="home"
        @get_all_task="get_all_task"

        v-if="show_page == 'task'" 
      ></AddTask>

      <EditTask  
        @home="home"
        @get_all_task="get_all_task"

        :data_edit="data_edit" 
        :category="category" 

        v-if="show_page == 'edit'" 
      ></EditTask>
      
    </div>
</template>

<script>
import axios from 'axios'

import Cards from './components/Cards'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import RegisterForm from './components/RegisterForm'

export default {
  name: 'App',
  components: {
    Cards,
    Navigation,
    RegisterForm,
    LoginForm,
    AddTask,
    EditTask
  },
  data() {
    return {
        show_page: "home",
        status: false,
        tasks: null,
        taskId: null,
        authorId: null,
        category: '',
        data_edit: '',
        organization: '',
        categories: ['backlog', 'todo', 'doing', 'done']
    };
  },
  methods: {
    set_organization(org) { this.organization = org },
    set_authorId(id) { this.authorId = id },
    set_status() { this.status = true },
    home() { this.show_page = 'home' },
    register_form() { this.show_page = 'register'},
    login() { this.show_page = 'login' },
    logout() {
        this.get_all_task()
        if (localStorage.access_token) {
            localStorage.removeItem('access_token')
            this.show_page = "home"
            this.status = false
            this.tasks = null
            this.taskId = null
            this.authorId = null
            this.category = ''
            this.data_edit = ''
            this.organization = ''
        } else {
            this.show_page = 'login'
        }
    },
    task_form() { this.show_page = 'task' },
    edit_task(id) {
        axios({
            method: 'GET',
            url: `http://localhost:3000/tasks/${id}`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(({data}) => {
            this.data_edit = data.task_by_id
            this.show_page = 'edit'
        })
    },
    delete_task(id) {
        axios({
            method: 'DELETE',
            url: `http://localhost:3000/tasks/${id}`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then((data) => {
            this.get_all_task()
            this.show_page = 'home'
        })
    },
    get_all_task() {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/tasks',
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(({data}) => {
            this.tasks = data.tasks
        })
    }
    },
    created() {
        this.get_all_task()
        if (localStorage.access_token) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/logged',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({data}) => {
                this.set_authorId(data.user.id)
                this.set_organization(data.user.organization)
                this.home()
                this.set_status()  
            })
        } else {
            this.authorId = null
            this.status = false
        }
    }
};
</script>

<style scoped>
</style>