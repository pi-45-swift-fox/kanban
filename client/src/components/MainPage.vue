<template>
  <div>
    <div class="container-fluid cs-opacity">
      <br />
      <!-- grid -->
      <div class="container-fluid text-center text-white">
      <!-- add task form button -->
      <button v-if="addFormPage === false" @click.prevent="addForm" type="button" class="btn btn-success btn-lg btn-block cs-bg-1 zoom">ADD TASK</button>
        <!-- edit task form -->
        <br>
        <div>          
          <form @submit.prevent="editTask" v-if="editFormPage === true" action="" class="container">
            <div>
              <button v-if="category !== 'backlog'" type="button" @click.prevent="editTaskCategory(prevCategory)" class="btn btn-warning">MOVE TASK TO {{prevCategory.toUpperCase()}}</button>
              <button v-if="category !== 'done'" type="button" @click.prevent="editTaskCategory(nextCategory)" class="btn btn-info">MOVE TASK TO {{nextCategory.toUpperCase()}}</button>
            </div>
            <br>
            <input v-model="title" class="form-control cs-bg-1" type="text" placeholder="title">
            <br>
            <button type="submit" class="btn btn-success zoom">Submit</button>
            <button @click.prevent="doneEdit" type="button" class="btn btn-danger zoom">Cancel</button>
          </form>
        </div>
        <!-- add task form -->
        <div>
          <form @submit.prevent="addTask" v-if="addFormPage === true" action="" class="container">
            <input v-model="title" class="form-control cs-bg-1" type="text" placeholder="title">
              <label for="sel1">Select Category:</label>
              <select v-model="category" class="form-control cs-bg-1">
                <option value="backlog">BACKLOG</option>
                <option value="todo">TODO</option>
                <option value="doing">DOING</option>
                <option value="done">DONE</option>
              </select>
            <br>
            <button type="submit" class="btn btn-success zoom">Submit</button>
            <button @click.prevent="addForm" type="button" class="btn btn-danger zoom">Cancel</button>
          </form>
        </div>
        <div class="row">
          <div class="col-sm cs-bg-1 m-3 cs-grid">
            <div>
              <h1>BACKLOG</h1>
            </div>

            <!-- backlog box -->
            <div class="content-box cs-bg-white m-2 overflow-auto">
              <!-- backlog cards -->
              <div v-for="task in tasks" :key="task.id">
                <div
                  v-if="task.category === 'backlog'"
                  class="card container cs-bg-1 mt-1 zoom"
                  style="width: 18rem;"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ task.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by: {{ task.User.email }}</h6>
                    <a @click.prevent="editForm(task.title, task.category, task.id)" href="#" class="card-link">EDIT</a>
                    <a @click.prevent="deleteTask(task.id)" href="#" class="card-link">DELETE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm cs-bg-1 m-3 cs-grid">
            <div>
              <h1>TODO</h1>
            </div>

            <!-- todo box -->
            <div class="content-box cs-bg-white m-2 overflow-auto">
              <!-- todo cards -->
              <div v-for="task in tasks" :key="task.id">
                <div
                  v-if="task.category === 'todo'"
                  class="card container cs-bg-1 mt-1 zoom"
                  style="width: 18rem;"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ task.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by: {{ task.User.email }}</h6>
                    <a @click.prevent="editForm(task.title, task.category, task.id)" href="#" class="card-link">EDIT</a>
                    <a @click.prevent="deleteTask(task.id)" href="#" class="card-link">DELETE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm cs-bg-1 m-3 m-3 cs-grid">
            <div>
              <h1>DOING</h1>
            </div>

            <!-- doing box -->
            <div class="content-box cs-bg-white m-2 overflow-auto">
              <!-- doing cards -->
              <div v-for="task in tasks" :key="task.id">
                <div
                  v-if="task.category === 'doing'"
                  class="card container cs-bg-1 mt-1 zoom"
                  style="width: 18rem;"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ task.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by: {{ task.User.email }}</h6>
                    <a @click.prevent="editForm(task.title, task.category, task.id)" href="#" class="card-link">EDIT</a>
                    <a @click.prevent="deleteTask(task.id)" href="#" class="card-link">DELETE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm cs-bg-1 m-3 cs-grid">
            <div>
              <h1>DONE</h1>
            </div>

            <!-- done box -->
            <div class="content-box cs-bg-white m-2 overflow-auto">
              <!-- done cards -->
              <div v-for="task in tasks" :key="task.id">
                <div
                  v-if="task.category === 'done'"
                  class="card container cs-bg-1 mt-1 zoom"
                  style="width: 18rem;"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ task.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by: {{ task.User.email }}</h6>
                    <a @click.prevent="editForm(task.title, task.category, task.id)" href="#" class="card-link">EDIT</a>
                    <a @click.prevent="deleteTask(task.id)" href="#" class="card-link">DELETE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "MainPage",
  props: ["server", "tasks"],
  data() {
    return {
      addFormPage: false,
      title: '',
      category: '',
      editFormPage: false,
      taskId: 0,
      prevCategory: '',
      nextCategory: ''      
    }
  },
  methods: {
    addForm() {
      this.addFormPage = !this.addFormPage
      this.doneEdit()
    },
    addTask() {
      axios({
        method: 'POST',
        url: `${this.server}/tasks`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.title,
          category: this.category
        }
      })
        .then(task=>{
          this.$emit('pageStatus', 'main-page')
          this.addForm()
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deleteTask(id) {
      axios({
        method: 'DELETE',
        url: `${this.server}/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(task=>{
          this.$emit('pageStatus', 'main-page')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    editForm(title = '', category = '', taskId = 0) {
      this.taskId = +taskId
      this.title = title
      this.category = category
      if (this.category == 'backlog') {
        this.nextCategory = 'todo'
      } else if (this.category == 'todo') {
        this.prevCategory = 'backlog'
        this.nextCategory = 'doing'
      } else if (this.category == 'doing') {
        this.prevCategory = 'todo'
        this.nextCategory = 'done'
      } 
      this.addFormPage = false
      this.editFormPage = true
    },
    doneEdit() {
      this.taskId = ''
      this.title = ''
      this.category = ''
      this.editFormPage = false
    },
    editTask() {
      axios({
        method: 'PUT',
        url: `${this.server}/tasks/${this.taskId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.title
        }
      })
        .then(task=>{
          this.$emit('pageStatus', 'main-page')
          this.doneEdit()
        })
        .catch(err=>{
          console.log(err)
        })
    },
    editTaskCategory(category) {
      axios({
        method: 'PATCH',
        url: `${this.server}/tasks/${this.taskId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          category
        }
      })
        .then(task=>{
          this.$emit('pageStatus', 'main-page')
          this.doneEdit()
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
};
</script>

<style>
</style>