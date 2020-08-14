<template>
  <div>
        <div class="content-list mb-1 p-2 bg-dark">
            <div class="content-header">
                <div v-if="!goToEditTask">{{task.title}}</div>
                <div v-else>
                    <textarea 
                            placeholder="Enter task" 
                            class="list-card-composer-textarea js-card-title form-control" 
                            style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;" v-model="title"></textarea>
                    <select id="category" v-model="newCategory" class="custom-select custom-select-sm">
                        <option value="backlog">Back Log</option>
                        <option value="todo">Todo</option>
                        <option value="done">Done</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button class="btn btn-success" @click="editTask">Edit</button>
                    <button class="btn btn-danger" @click="cancelEditForm">Cancel</button>
                </div>
            </div>
            <div class="content-footer ">
                <div class='action'>
                    <div>
                        <div class="sender">by {{task.User.email}}</div>
                        <div class="date">{{new Date(this.task.createdAt).toDateString()}}</div>
                    </div>
                    <div v-if="!goToEditTask">
                        <a href="#" class="btn btn-outline-primary btn-sm " @click="formEditTask">Edit</a>
                        <a href="#" class="btn btn-outline-danger btn-sm" @click="deleteTask" >Delete</a>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
        
        <!-- CONFIRM DELETE -->
        <!-- <div v-if="confirmDelete">
            <div class="modal fade" id="confirmDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Delete this todo ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="deleteTodo(${id})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CategoryList',
    data() {
        return {
            newCategory: this.category,
            title: this.task.title,
            goToEditTask: false,
            confirmDelete: false,
            baseUrl: 'http://localhost:3000/tasks/',
            categories: ['backlog', 'todo', 'done', 'completed']
        }
    },
    props: ['task', 'category'],
    methods: {
        deleteTaskConfirm() {
            this.confirmDelete = true
        },
        formEditTask() {
            this.goToEditTask = true
        },
        cancelEditForm() {
            this.goToEditTask = false
        },
        editTask() {
            let title = this.title
            let id = this.task.id
            let category = this.newCategory
            console.log(this.category);
            
            axios({
                method: 'put',
                url: this.baseUrl + id,
                headers: {
                    accesstoken: localStorage.accesstoken 
                },
                data: {title, category}
            })
            .then(res => {
                this.goToEditTask = false
                this.$emit('refresh')
            })
            .catch(err => console.log(err, 'error client edit'))
        },
        deleteTask() {
            let id = this.task.id
            // console.log('delete id' + id);
            axios({
                method: 'delete',
                url: this.baseUrl + id,
                headers: {
                    accesstoken: localStorage.accesstoken 
                },
            })
            .then(res => {
                this.$emit('refresh')
            })
            .catch(err => console.log(err, 'error client delete'))
        }
    },
    // created() {
    //     this.task.createdAt = new Date(this.task.createdAt).toDateString()
    // },
}
</script>

<style>

</style>