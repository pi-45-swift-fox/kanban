<template lang="html">
  <div class="modal fade" id="DeleteTask" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Delete Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="dropdown-item">Are you sure you want to delete this task?</p>
        </div>
        <div class="modal-footer">
          <button @click="reset" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="deleteTask" type="button" class="btn btn-danger" data-dismiss="modal">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "DeleteTaskModal",
  props: ['dataTask'],
  methods: {
    deleteTask()
    {
      axios({
        method: 'delete',
        url: `http://localhost:3000/dashboard/${this.dataTask.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data, 'success delete item');
        this.$emit('resetModal', 'delete');
        this.$emit('refreshPage');
      })
      .catch(err => {
        console.log(err);
      })
    },
    reset()
    {
      this.$emit('resetModal', 'delete');
    }
  }
}
</script>

<style lang="css" scoped>
</style>
