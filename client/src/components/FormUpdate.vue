<template>
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
      <small
        id="emailHelp"
        class="form-text text-muted"
      >We'll never share your email with anyone else.</small>
    </div>
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
</template>

<script>
import axios from "axios";
export default {
  name: "FormUpdate",
  data() {
    return {
      title: this.Task.title,
      category: this.Task.category
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
};
</script>

<style>
</style>

