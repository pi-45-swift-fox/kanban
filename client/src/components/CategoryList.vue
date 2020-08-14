<template>
    <div class="col-md-3 col-sm-6 col-6">
            <div class=" card d-flex flex-column bd-highlight mb-3">
                <div class="card header bg-dark badge badge-primary text-wrap font-bold" style="height: 40px;">
                    <div class="align-items-center ">
                        <h6 class="mx-auto w-100 mt-1">{{ category }}</h6>
                    </div>
                </div>
                <div class="d-flex flex-column bd-highlight mb-3" style="overflow-y:scroll; overflow-x:hidden; height:400px; background-color: rgba(0,0,0,.03);" >
                <div class="card m-3" v-for="filteredTask in filteredTasks" :key= filteredTask.id>    
                    <CategoryCard :filteredTask="filteredTask" @fetchTasks="fetchTasks"></CategoryCard>
                    <!-- <div class="card m-3">
                        <div class="card-body">
                            <div class="float-right">
                                <small><svg class="edit" data-toggle="modal" data-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <textarea name="task" id="" class="w-100 h-100"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </small>
                                <small><svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></small>
                                <small><svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg></small>
                            </div><br><br>
                            <h5 class="card-title">Belajar CSS</h5>
                            <p class="card-text"><small class="text-muted">By: User</small></p>
                            <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                        </div>
                    </div>
                    <div class="card m-3">
                        <div class="card-body">
                            <div class="float-right">
                                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                            </div><br><br>
                            <h5 class="card-title">Belajar SCSS</h5>
                            <p class="card-text"><small class="text-muted">By: User</small></p>
                            <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                        </div>
                    </div>
                    <div class="card m-3">
                        <div class="card-body">
                            <div class="float-right">
                                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                            </div><br><br>
                            <h5 class="card-title">Belajar Vue</h5>
                            <p class="card-text"><small class="text-muted">By: User</small></p>
                            <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                        </div>
                    </div>
                    <div class="card m-3">
                        <div class="card-body">
                            <div class="float-right">
                                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                            </div><br><br>
                            <h5 class="card-title">Belajar Vue</h5>
                            <p class="card-text"><small class="text-muted">By: User</small></p>
                            <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                        </div>
                    </div>
                    <div class="card m-3">
                        <div class="card-body">
                            <div class="float-right">
                                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                            </div><br><br>
                            <h5 class="card-title">Belajar Vue</h5>
                            <p class="card-text"><small class="text-muted">By: User</small></p>
                            <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                        </div>
                    </div> -->
                </div>
                </div>
                <div class="card-footer">
                    <div class="addTask" v-if="showTask == true">
                    <form action="" @submit.prevent="addNewTask">
                    <textarea name="task" class="w-100" v-model="newTask"></textarea>
                    <br>
                    <button type="submit" class="btn btn-info">Add</button>
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
    props: ['filteredTasks', 'category', 'dbcategory'],
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