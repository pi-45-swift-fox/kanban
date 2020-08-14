<template>
 <div class="addpage">
  <h3 class="title">Add Page</h3><br>
  <div class="form-add-page">
   <form>
    <div class="form-group">
     <input class="form-control" type="text" placeholder="Title" v-model="kanban.title" required>
    </div>
    <div class="form-group">
     <input class="form-control" type="text" placeholder="Description" v-model="kanban.description" required>
    </div>
    <div class="form-group">
     <button class="btn btn-dark" @click.prevent="add()">Create</button>
     <button class="btn btn-danger" @click.prevent="cancel()" >Cancel</button>
    </div>
   </form>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Addpage',
  data () {
    return {
      kanban: {
        title: '',
        description: '',
        tag: 'backlog'
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    add () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/kanbans',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.kanban.title,
          description: this.kanban.description,
          tag: this.kanban.tag
        }
      })
        .then((result) => {
          this.cancel()
        })
    }
  }
}
</script>

<style scoped>

.title {
  font-family: Brush Script MT;
  font-size: 40px;
  color: #a6e3e9;
}
.title span {
  color: #71a0a5;
}
.addpage{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
  width: 100%;
  background: url('https://s3.amazonaws.com/media-p.slid.es/uploads/logihelgu/images/1086249/Wood-background-black-wallpapers-wallpaper-476440.jpg');
  background-size: cover;
  height: 90%;
}
.form-add-page{
 display: flex;
 margin-top: 10%;
 justify-content: center;
 width: 100%;
 height: 400px;
 text-align: center;
}

form{
 width: 400px;
}

input[type="text"]{
 text-align: center;
}

input[type="text"]::placeholder {
 text-align: center;
 color: lightblue;
}

button {
 margin-right: 5px;
}
</style>
