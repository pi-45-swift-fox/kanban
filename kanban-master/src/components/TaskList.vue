<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-sm-card col-md-card col-lg-card task-list mx-2">
                <h4 class="backlog-header">Back log</h4>
                <div class="card-content" v-for="task in backLogTasks" :key="task.id">
                    <div class="task-item">
                        <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                        <p class="font-weight-bold">{{task.description}}</p>
                        <h6 class="font-weight-bold">added by: {{task.User.email}}</h6>
                        <a v-on:click="changeCategory(task.id, 'toDo')" class="right-btn"><span class="btn goto-btn font-weight-bold">To Do</span></a>
                    </div>
                </div>
            </div>

            <div class="col-sm-card col-md-card col-lg-card task-list mx-2">
                <h4 class="todo-header">To-do</h4>
                <div class="card-content" v-for="task in todoTasks" :key="task.id">
                    <div class="task-item">
                        <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                        <p class="font-weight-bold">{{task.description}}</p>
                        <h6 class="font-weight-bold">added by: {{task.User.email}}</h6>
                        <a v-on:click="changeCategory(task.id, 'backLog')" class="left-btn"><span class="btn goto-btn font-weight-bold">Back Log</span></a>
                        <a v-on:click="changeCategory(task.id, 'doing')" class="right-btn"><span class="btn goto-btn font-weight-bold">Doing</span></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-card col-md-card col-lg-card task-list mx-2">
                <h4 class="doing-header">Doing</h4>
                <div class="card-content" v-for="task in doingTasks" :key="task.id">
                    <div class="task-item">
                        <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                        <p class="font-weight-bold">{{task.description}}</p>
                        <h6 class="font-weight-bold">added by: {{task.User.email}}</h6>
                        <a v-on:click="changeCategory(task.id, 'toDo')" class="left-btn"><span class="btn goto-btn font-weight-bold">To Do</span></a>
                        <a v-on:click="changeCategory(task.id, 'done')" class="right-btn"><span class="btn goto-btn font-weight-bold">Done</span></a>
                    </div>
                </div>
            </div>
            <div class="col-sm-card col-md-card col-lg-card task-list mx-2">
                <h4 class="done-header">Done</h4>
                <div class="card-content" v-for="task in doneTasks" :key="task.id">
                    <div class="task-item">
                        <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                        <p class="font-weight-bold">{{task.description}}</p>
                        <h6 class="font-weight-bold">added by: {{task.User.email}}</h6>
                        <a v-on:click="changeCategory(task.id, 'doing')" class="left-btn"><span class="btn goto-btn font-weight-bold">Doing</span></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal readmore -->
        <div class="modal fade" id="readMoreModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{{title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{description}}</p>
                        <p>{{id}}</p>
                        <p>{{category}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editTaskModal" data-dismiss="modal">Edit</button>
                        <button type="button" class="btn btn-secondary" v-on:click="deleteTask(id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal edit -->
        <div class="modal fade" id="editTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="addtask-header px-5 py-2">
                    <h2>Edit Task</h2>
                </div>
                <form @submit.prevent="editTaskForm(id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="task-add-title">Title</label>
                            <input type="text" class="form-control" id="task-add-title" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="task-add-desc">Description</label>
                            <textarea class="form-control" id="task-add-desc" rows="3" v-model="description"></textarea>
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

export default {
    name: 'TaskList',
    data() {
        return {
            id: null,
            category: '',
            title: '',
            description: ''
        }
    },
    props: {
        tasks : Array
    },
    computed: {
        backLogTasks() {
            return this.tasks.filter(task => {
                return task.category === 'backLog'
            })
        },
        todoTasks() {
            return this.tasks.filter(task => {
                return task.category === 'toDo'
            })
        },
        doingTasks() {
            return this.tasks.filter(task => {
                return task.category === 'doing'
            })
        },
        doneTasks() {
            return this.tasks.filter(task => {
                return task.category === 'done'
            })
        }
    },
    methods: {
        readMore(id) {
            axios({
                method: 'get',
                url: `https://aarsandi-kanband.herokuapp.com/task/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                this.id = res.data.id
                this.category = res.data.category
                this.title = res.data.title
                this.description = res.data.description
            })
            .catch(err => {
                $('#readMoreModal').modal('hide');
                this.$emit('errorHandler', err.response)
            })
        },
        deleteTask(id) {
            axios({
                method: 'delete',
                url: `https://aarsandi-kanband.herokuapp.com/task/delete/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                $('#readMoreModal').modal('hide');
                this.$emit('toDashboard')
            })
            .catch(err => {
                $('#readMoreModal').modal('hide');
                this.$emit('errorHandler', err.response)
            })
        },
        editTaskForm(id) {
            axios({
                method: 'put',
                url: `https://aarsandi-kanband.herokuapp.com/task/edit/${id}`,
                data: {
                    title: this.title,
                    description: this.description
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                $('#editTaskModal').modal('hide');
                this.$emit('toDashboard')
            })
            .catch(err => {
                $('#editTaskModal').modal('hide');
                this.$emit('errorHandler', err.response)
            })
        },
        changeCategory(id, category) {
            axios({
                method: 'put',
                url: `https://aarsandi-kanband.herokuapp.com/task/change/${id}`,
                headers: {
                    token: localStorage.getItem('token'),
                    category: category
                }
            })
            .then(res => {
                this.$emit('toDashboard')
            })
            .catch(err => {
                this.$emit('errorHandler', err.response)
            })
        }
    }
}
</script>

<style>

</style>