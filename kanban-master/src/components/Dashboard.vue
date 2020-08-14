<template>
    <div class="dashboard" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <a class="navbar-brand" data-toggle="modal" data-target="#exampleModal"><span class="btn nav-btn">Add Task</span></a>
            </li>
            <li class="nav-item">
                <a class="navbar-brand" id="logout-nav" v-on:click="logoutBtn"><span class="btn btn-warning font-weight-bold">Log Out</span></a>
            </li>
            </ul>
        </div>
        </nav><br>
        <div class="alert alert-danger alert-dismissible collapse" role="alert" id="alertError">
            <a href="/" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>error. {{errorStatus}}</strong> {{errorMsg}}
        </div>

        <TaskList :tasks='tasks' v-on:toDashboard="toDashboard" v-on:errorHandler="errorHandler"></TaskList>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="addtask-header px-5 py-2">
                    <h2>Add new Task</h2>
                </div>
                <form @submit.prevent="addTaskForm">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="task-add-title">Title</label>
                            <input type="text" class="form-control" id="task-add-title" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="task-add-desc">Description</label>
                            <textarea class="form-control" id="task-add-desc" rows="3" v-model="description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="task-add-desc">Category</label>
                            <select class="form-control" v-model="category">
                                <option selected value="backLog">Back Log</option>
                                <option value="toDo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>
                    <div class="addtask-footer px-5 py-2">
                        <button type="submit" class="btn btn-warning font-weight-bold">Save changes</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TaskList from './TaskList'

export default {
    name: 'Dashboard',
    data() {
        return {
            title: '',
            description: '',
            category: 'backLog',
            errorStatus: '',
            errorMsg: ''
        }
    },
    props: {
        tasks: Array
    },
    methods: {
        logoutBtn() {
            localStorage.removeItem('token')
            this.$gAuth.signOut()
            .then(res => {
                this.$emit('toLoginForm')
            }).catch(err => {
                this.$emit('toError')
            })
        },
        addTaskForm() {
            axios({
                method: 'post',
                url: 'https://aarsandi-kanband.herokuapp.com/task/add',
                data: {
                    title: this.title,
                    description: this.description,
                    category: this.category
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                $('#exampleModal').modal('hide');
                this.$emit('toDashboard')
            })
            .catch(err => {
                $('#exampleModal').modal('hide');
                if(err.response.status == '400') {
                  $('#alertError').show()
                  this.errorStatus = err.response.status
                  this.errorMsg = err.response.data.errors
                } else if (err.response.status == '401') {
                  $('#alertError').show()
                  this.errorStatus = err.response.status
                  this.errorMsg = err.response.data.errors
                } else {
                  this.$emit('toError')
                }
            })
        },
        toDashboard() {
            this.$emit('toDashboard')
        },
        errorHandler(err) {
            this.$emit('toDashboard')
            if(err.status == '400') {
                $('#alertError').show()
                this.errorStatus = err.status
                this.errorMsg = err.data.errors
            } else if (err.status == '401') {
                $('#alertError').show()
                this.errorStatus = err.status
                this.errorMsg = err.data.errors
            } else {
                this.$emit('toError')
            }
        }
    },
    components: {
        TaskList
    }
}
</script>

<style>

</style>