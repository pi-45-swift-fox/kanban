<template>
  <div class="card">
      <div class="backlog">
          <div class="cards">
              <div class="cardtitle">
                  <h4>{{data.title.toUpperCase()}}</h4>
              </div>
              <br>
              <h6>Description: {{data.description}}</h6>
              <h6>By: {{data.User.email}} </h6>
              <br />
              <div class="card-panel">
                  <button
                    v-if="data.tag !== 'backlog'"
                    class="btn btn-dark btn-sm"
                    @click.prevent="backward({data})"
                  >
                    <img src="../assets/back.png">
                  </button>
                  <button class="btn btn-danger btn-sm" @click.prevent="del({data})">Delete</button>
                  <button class="btn btn-info btn-sm" @click.prevent="showEdit(data.id)">Edit</button>
                  <button
                    v-if="data.tag !== 'done'"
                    class="btn btn-dark btn-sm"
                    @click.prevent="forward({data})"
                  >
                    <img src="../assets/next.png">
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'KanbanCards',
    props: ['data'],
    methods: {
        showEdit (data) {
            this.$emit('showEdit', data)
        },
        forward (data) {
            const task = {
                title: data.data.title,
                desciption: data.data.desciption,
                tag: ''
            }
            if (data.data.tag === 'backlog') {
                task.tag = 'todo'
            } else if (data.data.tag === 'todo') {
                task.tag = 'on progress'
            } else if (data.data.tag === 'on progress') {
                task.tag = 'done'
            }
            axios({
                method: 'PUT',
                url: `http://localhost:3000/kanbans/move/${this.data.id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: task
            })
                .then(result => {
                    this.refresh()
                    Swal.fire('Success!', 'Task Successfully Forwarded!', 'success')
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'You Only Can Edit Your Own List',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
        },
        backward (data) {
            const task = {
                title: data.data.title,
                desciption: data.data.desciption,
                tag: ''
            }
            if (data.data.tag === 'todo') {
                task.tag = 'backlog'
            } else if (data.data.tag === 'on progress') {
                task.tag = 'todo'
            }  else if (data.data.tag === 'done') {
                task.tag = 'on progress'
            }
            axios({
                method: 'PUT',
                url: `http://localhost:3000/kanbans/move/${this.data.id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: task
            })
                .then(result => {
                    this.refresh()
                    
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'You Only Can Edit Your Own List',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
        },
        del(data) {
            const id = data.data.id
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
                })
                    .then((result) => {
                        if (result.value) {
                            axios({
                                method: 'DELETE',
                                url: `http://localhost:3000/kanbans/${id}`,
                                headers: {
                                    access_token: localStorage.access_token
                                }
                            })
                                .then(result => {
                                    this.refresh()
                                    Swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                    )
                                    console.log(result);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            
                        }
                        Swal.fire({
                                title: 'Error!',
                                text: 'You Only Can Delete Your Own List',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                    })
        },
        refresh() {
            this.$emit('refresh')
        }
    }
}
</script>

<style scoped>

.card {
  background: transparent;
  color: black;
  display: flex;
  width: 100%;
  flex-direction: row wrap;
  /* flex-direction: row; */
  margin: auto;
}
.cards {
  padding: 10%;
  width: 266px;
  min-height: 200px;
  background: rgba(255, 255, 255, 0.5);
  margin: auto;
  margin-bottom: 5%;
  border-radius: 15px;
}
.cardtitle{
 height: 50px;
 color: darkslategray;
}
button {
  margin: 2px;
}
</style>