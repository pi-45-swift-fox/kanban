<template>
 <div class="container addpage">
  <h3>Add Page</h3><br>
  <div class="form-add-page">
   <form>
    <div class="form-group">
     <input class="form-control" type="text" placeholder="Title" v-model="kanban.title" required>
    </div>
    <div class="form-group">
     <input class="form-control" type="text" placeholder="Description" v-model="kanban.description" required>
    </div>
    <div class="form-group">
     <button class="btn btn-dark" @click.prevent="add()">Add</button>
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
        url: 'https://protected-hollows-86433.herokuapp.com/kanbans',
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

.addpage{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
  width: 100%;
}
.form-add-page{
 display: flex;
 justify-content: center;
 width: 100%;
 height: 400px;
 text-align: center;
}

form{
    margin: auto;
    width: 77%;
    background-color: white;
}

input[type="text"]{
 text-align: center;
}

input[type="text"]::placeholder {
 text-align: center;
 color: rgba(248, 117, 117, 0.7);
}

button {
 margin-right: 5px;
}
</style>
