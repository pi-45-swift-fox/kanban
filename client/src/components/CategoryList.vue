<template>
    <div class="col-md-3 col-sm-6 col-12">
            <div class=" card d-flex flex-column bd-highlight mb-3">
                <div class="card header bg-dark badge badge-primary text-wrap font-bold" style="height: 40px;">
                    <div class="align-items-center ">
                        <h6 class="mx-auto w-100 mt-1">{{ category }}</h6>
                    </div>
                </div>
                <div class="d-flex flex-column bd-highlight mb-3" style="overflow-y:scroll; overflow-x:hidden; height:400px; background-color: rgba(0,0,0,.03);" >
                <div class="card m-3" v-for="filteredTask in filteredTasks" :key= filteredTask.id>    
                    <CategoryCard :filteredTask="filteredTask" :fetch-tasks="fetchTasks"></CategoryCard>
                </div>
                </div>
                <div class="card-footer">
                    <div class="addTask" v-if="showTask == true">
                    <form action="" @submit.prevent="addNewTask">
                    <textarea name="task" class="w-100" v-model="newTask"></textarea>
                    <br>
                    <button type="submit" class="btn btn-outline-info">Add</button>
                    <button type="submit" class="btn btn-outline-danger" @click.prevent="back">Cancel</button>
                    </form>
                    </div>
                    <div class="addKanban" v-if="showAddTask == true">
                        <span @click.prevent="addTask">   
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                        &nbsp;Add Task
                        </span>          
                    </div>
                </div>
            </div>  
    </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue'
import Axios from 'axios'

export default {
    name: 'Category',
    props: ['filteredTasks', 'category', 'dbcategory', 'fetchTasks'],
    components: {
        CategoryCard
    },
    data(){
        return {
            showTask: false,
            showAddTask: true,
            newTask: '',

        }
    },
    methods: {
        addTask(){
            this.showTask = true,
            this.showAddTask = false
        },
        back(){
            this.showTask = false,
            this.showAddTask = true
        },
        addNewTask(){
            Axios({
                method: 'POST',
                url: 'http://localhost:3000/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.newTask,
                    category: this.dbcategory
                }
            })
            .then(result => {
                this.showTask = false,
                this.showAddTask = true,
                this.fetchTasks()
                console.log('berhasil', result.data);    
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

}
</script>

<style scoped>

</style>