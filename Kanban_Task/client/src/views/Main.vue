<template>
  <div >
    <nav class="navbar navbar-light bg-light">
  <a class="navbar-brand">Navbar</a>
  <form class="form-inline" ><button type="submit" class="btn btn-outline-success my-2 my-sm-0" @click.prevent="showTaskForm">New Task</button></form>
  <form class="form-inline">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="logoutUser">Logout</button>


  </form>
        </nav>
    <div class="d-flex" :v-show="showMain===true">
        <Category v-for="(category,i) in categories" :key="i" :categoryName='category' > </Category>
    </div>
    <div v-if="addDataForm===true">
        <h2>Add Task</h2>
            <form>
        <div class="form-group">
            <label for="exampleInputTitle">Title</label>
            <input type="email" class="form-control" id="exampleInputTitle" aria-describedby="emailHelp" v-model="title">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Category</label>
            <select name="DataCategory" id="DataCategory" v-model="task_category">
                <option v-for="(category,i) in categories" :key="i" :value="category" >{{category}}</option>
            </select>
            <!-- <input type="password" class="form-control" id="exampleInputPassword1" v-model="password"> -->
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" >
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="addTaskData">Add</button>
        <button type="submit" class="btn btn-primary" @click.prevent="goToRegister"> Cancel</button>
    </form>
    </div>
  </div>
</template>

<script>
import Category from '../components/Category'
import axios from 'axios'

export default {
    components:{
        Category
    },
    data(){
        return {
            categories:['backlog','todo','doing','done'],
            addDataForm:false,
            title:'',
            task_category:'',
            showMain:true

        }
    },
    methods:{
        logoutUser(){
            localStorage.removeItem('access_token')
        },
        showTaskForm(){
            this.addDataForm=true
        },
        addTaskData(){
            axios({
                method:'POST',
                url:'http://localhost:3000/task',
                headers:{access_token:localStorage.access_token},
                data:{
                    title:this.title,
                    category:this.task_category
                }
            })
            .then(data=>{
                console.log('succeeded to add data ',data.data)
                this.addDataForm=false,
                this.title=''
                this.category=''
                this.showMain=true
                            
            })
            .catch(err=>{
                console.log('error when add data',err)
            })
        }
    }
}
</script>

<style>

</style>