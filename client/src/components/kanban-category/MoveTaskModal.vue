<template lang="html">
  <div class="modal fade" id="MoveTask" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Move Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <label for="validationServer04">Task Category</label>
          <select v-model="category" class="custom-select" required>
            <option selected disabled value="">Choose...</option>
            <option v-if="currentCategory != 'backlog'" value="backlog">Backlog</option>
            <option v-if="currentCategory != 'todo'" value="todo">Todo</option>
            <option v-if="currentCategory != 'done'" value="done">Done</option>
            <option v-if="currentCategory != 'completed'" value="completed">Completed</option>
          </select>
        </div>
        <div class="modal-footer">
          <button @click="reset" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="moveTask" type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MoveTaskModal",
  data() {
    return {
      category: '',
      currentCategory: ''
    }
  },
  props: ['dataTask'],
  methods: {
    moveTask()
    {
      axios({
        method: 'put',
        url: `http://localhost:3000/dashboard/${this.dataTask.id}`,
        data: {
          title: this.dataTask.title,
          description: this.dataTask.description,
          category: this.category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data);
        this.$emit('refreshPage');
        this.$emit('resetModal', 'move');
      })
      .catch(err => {
        console.log(err);
      })
    },
    reset()
    {
      console.log('backlog')
      this.category = '';
      this.$emit('resetModal', 'move');
    }
  },
  create()
  {
    console.log(this.dataTask);
    this.currentCategory = this.dataTask.category;
  }
}
</script>

<style lang="css" scoped>
</style>
