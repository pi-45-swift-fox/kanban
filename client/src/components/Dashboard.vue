<template>
    <div>
        <div class="flex-row textSize">
            <div class="flex mb-0 mx-6">
                <div class="w-1/4 bg-gray-400 h-12 mr-4">
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 ">
                        Backlog
                    </div>
                    <div class="flex-col bg-blue-100 overflow-auto container-tasks ">
                        <div v-for="task in tasks" :key="task.id">
                            <div class="px-6 py-4 bg-white p-10 m-3 " v-if="task.category == 'backlog'">
                                <div class="container-row">
                                    <div class="container-row" id="editTask"
                                        @click="openEditor('backlog',task.title,task.id)">
                                        <div v-html="editLogo">
                                        </div>
                                        <p class="text-xs text-gray-500	">edit</p>
                                    </div>

                                    <div class="container-row" id="deleteTask" @click="deleteTask('backlog', task.id)">
                                        <p class="text-xs text-gray-500	">delete</p>
                                        <div v-html="deleteLogo"></div>
                                    </div>
                                </div>
                                <div class="font-bold text-base mb-2">
                                    <p> {{ task.title }} </p>
                                </div>
                                <p class="text-gray-600 text-xs">By : {{task.User.name}}</p>
                                <p class="text-gray-600 text-xs">{{new Date(task.createdAt).toDateString()}}</p>

                                <form @submit.prevent="editTask(task.id)" v-if="updateTask && updateId == task.id"
                                    class="bg-pink-100">
                                    <textarea id="card-edit" v-model="valForUpdateTask" placeholder="Enter task"
                                        class="overflow-auto bg-pink-100">
                                    </textarea>
                                    <label for="edit">Move To:</label>
                                    <select name="categoryTask" id="" v-model="categoryTask" class="bg-pink-100">
                                        <option value="todo">Todo</option>
                                        <option value="doing">Doing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <button type="submit"
                                        class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit
                                        Task</button>
                                    <button @click.prevent="openEditor"
                                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="flex bg-gray-500 h-13 items-center">
                        <div class=" flex-1 text-center px-1 m-2 container-row">
                            <button v-if="addTask==false " @click="addTaskOpen('backlog')"
                                class="bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Add Backlog
                            </button>
                            <form @submit.prevent="addTaskToDb('backlog')" v-if="addTask && addTaskCategory === 'backlog'">
                                <textarea id="card-add" v-model="newTask" placeholder="Enter task"
                                    class="list-card-composer-textarea js-card-title form-control"
                                    style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"></textarea>
                                <button type="submit"
                                    class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add
                                    Task</button>
                                <button @click.prevent="addTaskOpen"
                                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            </form>

                        </div>
                    </div>
                </div>
                <div class="w-1/4 bg-gray-400 h-12 mr-4">
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 ">
                        Todo
                    </div>
                    <div class="flex-col bg-blue-100 overflow-auto container-tasks ">
                        <div v-for="task in tasks" :key="task.id">
                            <div class="px-6 py-4 bg-white p-10 m-3 " v-if="task.category == 'todo'">
                                <div class="container-row">
                                    <div class="container-row" id="editTask" @click="openEditor('todo',task.title,task.id)">
                                        <div v-html="editLogo"  >
                                        </div>
                                        <p class="text-xs text-gray-500	">edit</p>
                                    </div>
                                        
                                    <div class="container-row" id="deleteTask" @click="deleteTask('todo', task.id)">
                                        <p class="text-xs text-gray-500	">delete</p>
                                        <div v-html="deleteLogo" ></div>
                                    </div>  
                                </div>
                                <div class="font-bold text-base mb-2"> <p> {{ task.title }} </p></div>
                                <p class="text-gray-600 text-xs">By : {{task.User.name}}</p>
                                <p class="text-gray-600 text-xs">{{new Date(task.createdAt).toDateString()}}</p>

                                <form @submit.prevent="editTask(task.id)" v-if="updateTask && updateId == task.id" class="bg-pink-100">
                                    <textarea id="card-edit" v-model="valForUpdateTask" placeholder="Enter task" class="overflow-auto bg-pink-100" >
                                    </textarea>
                                    <label for="edit">Move To:</label>
                                    <select name="categoryTask" id="" v-model="categoryTask" class="bg-pink-100">
                                        <option value="backlog">Backlog</option>
                                        <option value="todo">Todo</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit Task</button>
                                    <button @click.prevent="openEditor" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="flex bg-gray-500 h-13 items-center">
                        <div class=" flex-1 text-center px-1 m-2 container-row">
                            <button v-if="addTask==false" @click="addTaskOpen('todo')" class="bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Add Todo
                            </button> 
                            <form @submit.prevent="addTaskToDb('todo')" v-if="addTask && addTaskCategory === 'todo'" >
                                <textarea id="card-add" v-model="newTask" placeholder="Enter task" class="list-card-composer-textarea js-card-title form-control" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"></textarea>
                                <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</button>
                                <button @click.prevent="addTaskOpen" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            </form>
                                
                        </div>
                    </div>
                </div>
                <div class="w-1/4 bg-gray-400 h-12 mr-4">
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 ">
                        Doing
                    </div>
                    <div class="flex-col bg-blue-100 overflow-auto container-tasks ">
                        <div v-for="task in tasks" :key="task.id">
                            <div class="px-6 py-4 bg-white p-10 m-3 " v-if="task.category == 'doing'">
                                <div class="container-row">
                                    <div class="container-row" id="editTask" @click="openEditor('doing',task.title,task.id)">
                                        <div v-html="editLogo"  >
                                        </div>
                                        <p class="text-xs text-gray-500	">edit</p>
                                    </div>
                                        
                                    <div class="container-row" id="deleteTask" @click="deleteTask('doing', task.id)">
                                        <p class="text-xs text-gray-500	">delete</p>
                                        <div v-html="deleteLogo" ></div>
                                    </div>  
                                </div>
                                <div class="font-bold text-base mb-2"> <p> {{ task.title }} </p></div>
                                <p class="text-gray-600 text-xs">By : {{task.User.name}}</p>
                                <p class="text-gray-600 text-xs">{{new Date(task.createdAt).toDateString()}}</p>

                                <form @submit.prevent="editTask(task.id)" v-if="updateTask && updateId == task.id" class="bg-pink-100">
                                    <textarea id="card-edit" v-model="valForUpdateTask" placeholder="Enter task" class="overflow-auto bg-pink-100" >
                                    </textarea>
                                    <label for="edit">Move To:</label>
                                    <select name="categoryTask" id="" v-model="categoryTask" class="bg-pink-100">
                                        <option value="backlog">Backlog</option>
                                        <option value="todo">Todo</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit Task</button>
                                    <button @click.prevent="openEditor" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="flex bg-gray-500 h-13 items-center">
                        <div class=" flex-1 text-center px-1 m-2 container-row">
                            <button v-if="addTask==false" @click="addTaskOpen('doing')" class="bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Add to Doing
                            </button> 
                            <form @submit.prevent="addTaskToDb('doing')" v-if="addTask  && addTaskCategory === 'doing'" >
                                <textarea id="card-add" v-model="newTask" placeholder="Enter task" class="list-card-composer-textarea js-card-title form-control" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"></textarea>
                                <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</button>
                                <button @click.prevent="addTaskOpen" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="w-1/4 bg-gray-400 h-12 mr-4">
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 ">
                        Completed
                    </div>
                    <div class="flex-col bg-blue-100 overflow-auto container-tasks ">
                        <div v-for="task in tasks" :key="task.id">
                            <div class="px-6 py-4 bg-white p-10 m-3 " v-if="task.category == 'completed'">
                                <div class="container-row">
                                    <div class="container-row" id="editTask" @click="openEditor('completed',task.title,task.id)">
                                        <div v-html="editLogo"  >
                                        </div>
                                        <p class="text-xs text-gray-500	">edit</p>
                                    </div>
                                        
                                    <div class="container-row" id="deleteTask" @click="deleteTask('completed', task.id)">
                                        <p class="text-xs text-gray-500	">delete</p>
                                        <div v-html="deleteLogo" ></div>
                                    </div>  
                                </div>
                                <div class="font-bold text-base mb-2"> <p> {{ task.title }} </p></div>
                                <p class="text-gray-600 text-xs">By : {{task.User.name}}</p>
                                <p class="text-gray-600 text-xs">{{new Date(task.createdAt).toDateString()}}</p>

                                <form @submit.prevent="editTask(task.id)" v-if="updateTask && updateId == task.id" class="bg-pink-100">
                                    <textarea id="card-edit" v-model="valForUpdateTask" placeholder="Enter task" class="overflow-auto bg-pink-100" >
                                    </textarea>
                                    <label for="edit">Move To:</label>
                                    <select name="categoryTask" id="" v-model="categoryTask" class="bg-pink-100">
                                        <option value="backlog">Backlog</option>
                                        <option value="todo">Todo</option>
                                        <option value="doing">Doing</option>
                                    </select>
                                    <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit Task</button>
                                    <button @click.prevent="openEditor" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="flex bg-gray-500 h-13 items-center">
                        <div class=" flex-1 text-center px-1 m-2 container-row">
                            <button v-if="addTask==false" @click="addTaskOpen('completed')" class="bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Add to Completed
                            </button> 
                            <form @submit.prevent="addTaskToDb('completed')" v-if="addTask  && addTaskCategory === 'completed'" >
                                <textarea id="card-add" v-model="newTask" placeholder="Enter task" class="list-card-composer-textarea js-card-title form-control" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"></textarea>
                                <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</button>
                                <button @click.prevent="addTaskOpen" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert';

export default {
    name:'Dashboard',
    data(){
        return{
            addTask:false,
            newTask:'',
            addTaskCategory:'',
            updateTask: false,
            valForUpdateTask:'',
            updateId:'',
            categoryTask:'',
            editLogo:`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M9.963 8.261c-.566-.585-.536-1.503.047-2.07l5.948-5.768c.291-.281.664-.423 1.035-.423.376 0 .75.146 1.035.44l-8.065 7.821zm-9.778 14.696c-.123.118-.185.277-.185.436 0 .333.271.607.607.607.152 0 .305-.057.423-.171l.999-.972-.845-.872-.999.972zm8.44-11.234l-3.419 3.314c-1.837 1.781-2.774 3.507-3.64 5.916l1.509 1.559c2.434-.79 4.187-1.673 6.024-3.455l3.418-3.315-3.892-4.019zm9.97-10.212l-8.806 8.54 4.436 4.579 8.806-8.538c.645-.626.969-1.458.969-2.291 0-2.784-3.373-4.261-5.405-2.29z"/></svg>`,
            deleteLogo:`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>`
        }
    },
    props:['baseUrl', 'tasks'],
    methods:{
        addTaskOpen(category){
            this.addTask = !this.addTask
            this.newTask = ''
            this.addTaskCategory = category
        },
        addTaskToDb(category){
            axios({
                method:'POST',
                url: this.baseUrl +'/tasks',
                data:{
                    category,
                    title:this.newTask
                },
                headers : {
                    access_token:localStorage.access_token
                }
            })
            .then(res=>{
                console.log(res.data);
                this.$emit('fetchTasks')
                this.addTaskOpen()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        editTask(id){
            axios({
                method:'PUT',
                url: this.baseUrl +`/tasks/${id}`,
                data:{
                    category:this.categoryTask,
                    title:this.valForUpdateTask
                },
                headers : {
                    access_token:localStorage.getItem('access_token')
                }
            })
            .then(res=>{
                this.$emit('fetchTasks')
                this.updateTask = false
            })
            .catch(err=>{
                swal("Not Allowed!", "You can't edit file other than yours!", "error");
                console.log(err);
            })
        },
        deleteTask(category,id){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this task!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios({
                        method:'DELETE',
                        url: this.baseUrl +`/tasks/${id}`,
                        headers : {
                            access_token:localStorage.access_token
                        }
                    })
                    .then(res=>{
                        console.log(res.data);
                        this.$emit('fetchTasks')
                        swal("Poof! Your task has been deleted!", {
                        icon: "success",
                        });
                    })
                    .catch(err=>{
                        swal("Not Allowed!", "Not Allowed to delete this file!", "error");
                        console.log(err);
                    })
                    
                } else {
                    swal("Cancel delete!");
                }
            });
            
        },
        openEditor(category,title,id){
            this.updateTask = !this.updateTask
            this.valForUpdateTask = title
            this.updateId = id
            this.categoryTask = category
        }
    },
    created(){
        
    }
}
</script>

<style scoped>

    #editTask{
        fill:darkslateblue;
    }
    #editTask:hover{
        fill:burlywood;
        color: burlywood;
        cursor: pointer;
    }
    #deleteTask{
        fill: red;
    }
    #deleteTask:hover{
        fill: chocolate;
        cursor: pointer;
    }
    #card-edit{
        border:darkslateblue ;
    }

</style>
