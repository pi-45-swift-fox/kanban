<template>
  <div>
    <h5 class="card-title text-white pt-2">{{ task.title }}</h5>
    <p class="card-text text-white">
      <small class="text-muted">{{ task.organization }}</small>
    </p>
    <a href="#" @click="editTask(task.id)" class="btn btn-primary">Move</a>
    <a href="#" @click="deleteTask(task.id)" class="btn btn-danger">Delete</a>
    <div class="dropdown-divider"></div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../api/axios";

export default {
  name: "TaskCard",
  data() {
    return {};
  },
  props: {
    task: Object,
  },
  methods: {
    fetchData() {
      this.$emit("fetchData");
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((_) => {
          this.fetchData();
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Whoops",
            text: "Something went terribly wrong!",
            icon: "error",
            showConfirmButton: false,
            timer: 1800,
          });
        });
    },
    editTask(id) {
      Swal.fire({
        title: "Please choose one",
        input: "radio",
        inputOptions: {
          "Back-Log": "Back-Log",
          "To-do": "To-do",
          Doing: "Doing",
          Done: "Done",
        },
        inputValidator: function (value) {
          if (!value) {
            return "You need to choose something!";
          }
        },
      }).then((input) => {
        // this.fetchData();
        if (input.isConfirmed) {
          axios({
            method: "PUT",
            url: `/tasks/${id}`,
            headers: {
              access_token: localStorage.access_token,
            },
            data: {
              status: input.value,
            },
          })
            .then((_) => {
              this.fetchData();
            })
            .catch(function (error) {
              console.log(error);
              Swal.fire({
                title: "Whoops",
                text: "Something went terribly wrong!",
                icon: "error",
                showConfirmButton: false,
                timer: 1800,
              });
            });
        }
      });
      this.fetchData();
    },
  },
};
</script>

<style>
</style>