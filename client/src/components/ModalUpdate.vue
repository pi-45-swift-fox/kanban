<template>
  <div class="modal fade"  id="modalupdate" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">UPDATE TASK</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
<form @submit.prevent="UpdateTask">
    <div class="form-group">
      <label for="title">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        aria-describedby="emailHelp"
        v-model="title"
      />
    <div class="form-group">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Options</label>
        </div>
        <select class="custom-select" v-model="category">
          <option selected>Choose...</option>
          <option value="Backlog">Backlog</option>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Complete / Done">Complete / Done</option>
        </select>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Update</button>   
  </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {  
name:'ModalUpdate',
 data() {
    return {
      title: this.Task.title ||'',
      category: this.Task.category || ''
    };
  },
  watch: {
    Task: function(val, oldVal) {
      this.title = val.title;
      this.category = val.category;
    }
  },
  props: ["Task"],
  methods: {
    UpdateTask() {
      axios({
        method: "PUT",
        url: `http://localhost:3000/task/${this.Task.id}`,
        headers: {
          access_token: localStorage.token
        },
        data: {
          title: this.title,
          category: this.category
        }
      })
        .then(({ data }) => {
          this.$emit("emitUpdateTask");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

}
</script>

<style>

</style>