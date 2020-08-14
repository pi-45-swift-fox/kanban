<template>
  <form @submit.prevent="AddTask">
  <div class="form-group"  >
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" aria-describedby="emailHelp"  v-model='title' >
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Options</label>
  </div>
  <select class="custom-select"  v-model="category">
    <option selected>Choose...</option>
    <option value="Backlog">Backlog</option>
    <option value="Todo">Todo</option>
    <option value="Doing">Doing</option>
    <option value="Complete / Done">Complete / Done</option>
  </select>
</div>
  </div>
  
  <button type="submit" class="btn btn-primary">Add</button>
</form>
</template>

<script>
import axios from 'axios'

export default {
  name:"FormAdd",  
   data(){
    return{
      title:"",
      category:""
    }
  },
  methods:{
    AddTask(){
      axios({
        method:"POST",
        url:`http://localhost:3000/task`,    
        headers:{
           access_token:localStorage.token
        },
        data:{
          title : this.title,
          category: this.category
        }    
      })
      .then(({data})=>{
        this.$emit('emitAddTask')

      })
    }
  }

}
</script>

<style>

</style>