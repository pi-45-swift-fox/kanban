<template>
  <section id="dashboard" class="vh-100 dashboard">
    <nav id="font" class="navbar navbar-light shadow-sm p-3 mb-5">
      <a style="color: #0540F2;" class="navbar-brand" href="">Kanban.</a>
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <button @click="logout" class="btn btn-primary nav-link font-dashboard" style="color: #fafafa;">Logout</button>
        </li>
      </ul>
    </nav>

    <div class="kanban-card container-fluid vh-100">
      <Backlog @refreshPage="fetchData" :backlogProps="backlogData"></Backlog>
      <Todo @refreshPage="fetchData" :todoProps="todoData"></Todo>
      <Done @refreshPage="fetchData" :doneProps="doneData"></Done>
      <Completed @refreshPage="fetchData" :completedProps="completedData"></Completed>
    </div>

  </section>
</template>

<script>
  import Backlog from './kanban-category/Backlog.vue';
  import Todo from './kanban-category/Todo.vue';
  import Done from './kanban-category/Done.vue';
  import Completed from './kanban-category/Completed.vue';
  import axios from 'axios';

  export default {
    name: "Dashboard",
    data() {
      return {
        backlogData: [],
        todoData: [],
        doneData: [],
        completedData: []
      }
    },
    components: {
      Backlog,
      Todo,
      Done,
      Completed
    },
    methods: {
      logout()
      {
        localStorage.clear();
        this.$emit('afterLogin');
      },
      fetchData()
      {
        axios({
          method: 'get',
          url: "http://localhost:3000/dashboard",
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          this.backlogData = response.data.filter(x => x.category == 'backlog');
          this.todoData = response.data.filter(x => x.category == 'todo');
          this.doneData = response.data.filter(x => x.category == 'done');
          this.completedData = response.data.filter(x => x.category == 'completed');
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<style media="screen">

</style>
