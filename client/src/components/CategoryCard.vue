<template>
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
            <div class="nav-item dropdown loat-right">
            <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: rgb(250, 234, 234);">
                <small><svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg></small>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" @click.prevent="editCategory('todo', filteredTask.id)">Move to To Do</a>
            </div>
        </div><br><br>
        <h5 class="card-title">{{ filteredTask.title }}</h5>
        <p class="card-text"><small class="text-muted">By: {{ filteredTask.User['email'] }}</small></p>
        <p class="card-text"><small class="text-muted">{{ filteredTask.createdAt }}</small></p>
    </div>    
</template>

<script>
import axios from 'axios'

export default {
    name: 'card',
    props: ['filteredTask'],
    data(){
        return{
            // createdAt: filteredTask.createdAt, 
            // time: `${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()} `
        }
    },
    methods: {
        editCategory(category, id){
            axios({
                method: 'PATCH',
                url: `http://localhost:3000/tasks/${id}/category`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    category: category
                }
            })
            .then(() => {
                // this.$emit('fetchTasks')
                console.log('berhasil move');
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>