<template>
    <div class="card-body">
        <div class="input-group justify-content-end ">
            <small><svg class="edit" data-toggle="modal" data-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg></small>
            &nbsp;
            <!-- <ModalEditTitle :filtered-task-id="filteredTask.id" :update-title="updateTitle"></ModalEditTitle> -->
                <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                            <form method="post" @submit.prevent="updateTitle(filteredTask.id)">
                            <div class="modal-body">
                                <textarea name="task" id="" class="w-100 h-100" v-model="newTitle"></textarea> <br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            <small><svg class="delete" type="button" @click.prevent="deleteTask(filteredTask.id)" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></small>
            &nbsp;
            <div class="input-group-append">
                <small class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg></small>
                <div class="dropdown-menu">
                <div v-if="filteredTask.category == 'back log'">
                    <a class="dropdown-item" href="#" @click.prevent="editCategory('todo', filteredTask.id)">Move to To Do</a>
                </div>
                <div v-else-if="filteredTask.category == 'todo'">
                    <a class="dropdown-item" href="#" @click.prevent="editCategory('back log', filteredTask.id)">Move to Back Log</a>
                    <a class="dropdown-item" href="#" @click.prevent="editCategory('doing', filteredTask.id)">Move to Doing</a>
                </div>
                <div v-else-if="filteredTask.category == 'doing'">
                    <a class="dropdown-item" href="#" @click.prevent="editCategory('todo', filteredTask.id)">Move to To Do</a>
                    <a class="dropdown-item" href="#" @click.prevent="editCategory('completed', filteredTask.id)">Move to Completed</a>
                </div>
                <div v-else>
                    <a class="dropdown-item" href="#" @click.prevent="editCategory('doing', filteredTask.id)">Move to Doing</a>
                </div>
                </div>
            </div>
        </div><br><br>
        <h5 class="card-title  mt-0">{{ filteredTask.title }}</h5>
        <p class="card-text"><small class="text-muted">By: {{ filteredTask.User['email'] }} - {{ filteredTask.id }}</small></p>
        <p class="card-text"><small class="text-muted">{{ new Date(filteredTask.createdAt).toDateString() }}</small></p>
    </div>    
</template>

<script>
import axios from 'axios'
import ModalEditTitle from './ModalEditTitle'
export default {
    name: 'card',
    props: ['filteredTask', 'fetchTasks', 'baseUrl', 'showAlert'],
    components: {
        ModalEditTitle
    },
    data(){
        return{
            newTitle: '',
            errorStatus: '',
        }
    },
    destroyed(){

    },
    methods: {
        editCategory(category, id){
            axios({
                method: 'PATCH',
                url: `${this.baseUrl}/tasks/${id}/category`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    category: category
                }
            })
            .then(() => {
                this.fetchTasks()
                console.log('berhasil move');
            }).catch((err) => {
                console.log(err);
                this.$emit('showAlert', err.message)
            });
        },
        deleteTask(id){
            console.log(id);
            axios({
                method: 'DELETE',
                url: `${this.baseUrl}/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then((result) => {
                this.fetchTasks()
                console.log('berhasil', result.data)
            })
            .catch((err) => {
                console.log(err);
                this.$emit('showAlert', err.message)
            });
        },
        updateTitle(id){
            axios({
                method: 'PATCH',
                url: `${this.baseUrl}/tasks/${id}/title`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.newTitle
                }
            })
            .then(() => {
                this.fetchTasks()
                console.log('masuk', id);
                console.log('berhasil update title');
            }).catch((err) => {
                console.log('error==>',err);
                this.$emit('showAlert', err.message)
            });
        }
    },
    created(){
        console.log(this.filteredTask.id);
    }
}
</script>

<style scoped>

</style>