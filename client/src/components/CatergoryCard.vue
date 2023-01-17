<template>
  <div class="col-sm-3">
    <div class="card bg-dark">
      <h5 class="card-header text-white bg-dark text-center">{{ category }}</h5>
      <div class="card-body m-1">
        <TaskCard @fetchData="fetchData" v-for="task in filteredTasks" :key="task.id" :task="task"></TaskCard>
        <button class="btn btn-outline-primary my-2 my-sm-0" @click="submitNew(category)">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard.vue";
import Swal from 'sweetalert2';
import axios from '../api/axios';

export default {
  name: "CategoryCard",
  components: {
    TaskCard,
  },
  props: {
    category: String,
    tasks: Array,
  },
  computed: {
    filteredTasks() {
      let filteredTasks = [];
      this.tasks.filter((task) => {
        if (this.category === task.status) {
          filteredTasks.push(task);
        } else {
        }
      });
      return filteredTasks;
    },
  },
  data() {
    return {};
  },
  methods: {
    fetchData() {
      this.$emit("fetchData");
    },
    submitNew(category) {
      Swal.fire({
        title: 'New Task',
        input: 'text',
        inputPlaceholder: "New shiny task's title"
      })
      .then(input => {
        if (input.isConfirmed) {
          axios({
            method: 'POST',
            url: '/tasks',
            headers: {
              access_token: localStorage.access_token
            },
            data: {
              title: input.value,
              status: category
            }
          })
          .then(() => {
            this.fetchData();
          })
          .catch(error => {
            Swal.fire({
                title: "Whoops",
                text: "Seems like you didn't put any title in",
                icon: 'error',
                showConfirmButton: false,
                timer: 1800
            });
          })
        }
      })
    },
  },
};
</script>

<style>
</style>