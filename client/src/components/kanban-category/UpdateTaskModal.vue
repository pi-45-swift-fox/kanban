<template lang="html">
  <div class="modal fade" id="UpdateTask" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Update Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="">
            <div class="form-group">
              <input v-model="title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="task title...">
            </div>
            <div class="form-group">
              <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="task description..."></textarea>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <button @click="test" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="updateTask" type="button" class="btn btn-primary" data-dismiss="modal">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "UpdateTaskModal",
  props: ['dataTask'],
  data() {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    test()
    {
      this.title = '';
      this.description = '';
      this.$emit('resetModal', 'update');
      console.log('widnwindiwnd reset modal')
    },
    updateTask()
    {
      console.log("Submit Form", this.dataTask.id, this.dataTask.category);
      axios({
        method: 'put',
        url: `http://localhost:3000/dashboard/${this.dataTask.id}`,
        data: {
          title: this.title,
          description: this.description,
          category: this.dataTask.category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data);
        this.$emit('refreshPage');
        this.$emit('resetModal', 'update');
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
