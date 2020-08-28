<template>
  <div>
    <!-- <FormUpdate :Task="task"  @emitUpdateTask="getList"></FormUpdate> -->
    <div class="container">
      <div class="row">
        <div class="card col-3 d-block">
          <div class="card-header">Backlog</div>
          <TaskCard
            v-for="task in Backlog"
            :key="task.id"
            :dataTask="task"
            @emitUpdate="updateTask"
            @emitDelete="deleteTask"
          />
        </div>
        <div class="card col-3 d-block">
          <div class="card-header">Todo</div>
          <TaskCard
            v-for="task in Todo"
            :key="task.id"
            :dataTask="task"
            @emitUpdate="updateTask"
            @emitDelete="deleteTask"
          />
        </div>
        <div class="card col-3 d-block">
          <div class="card-header">Doing</div>
          <TaskCard
            v-for="task in Doing"
            :key="task.id"
            :dataTask="task"
            @emitUpdate="updateTask"
            @emitDelete="deleteTask"
          />
        </div>
        <div class="card col-3 d-block">
          <div class="card-header">Complete / Done</div>
          <TaskCard
            v-for="task in Complete"
            :key="task.id"
            :dataTask="task"
            @emitUpdate="updateTask"
            @emitDelete="deleteTask"
          />
        </div>
      </div>
    </div>
    <button
      style="position: fixed; top: 5em;"
      data-toggle="modal"
      data-target="#modaladd"
    >ADD TASK</button>
    <ModalAdd @emitAddTask="getList"></ModalAdd>
    <ModalUpdate :Task="task" @emitUpdateTask="getList" ></ModalUpdate>
  </div>
</template>
<script>
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import TaskCard from "./TaskCard";
import axios from "axios";
export default {
  name: "TaskList",
  data() {
    return {
      listTask: [],
      task: "",
      isShowUpdate: false,
      isShowAdd: false,
      modal: "",
    };
  },
  components: {
    TaskCard,
    ModalAdd,
    ModalUpdate
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios({
        method: "GET",
        url: "http://localhost:3000/task",
        headers: {
          access_token: localStorage.token,
        },
      })
        .then(({ data }) => {
          console.log(data.dataTask);
          this.listTask = data.dataTask;
          this.isShowUpdate = false;
          // this.isShowAdd = false
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendTask(task, category) {
      if (task.category === category) {
        console.log("task");
        return task;
      }
    },
    updateTask(dataTask) {
      this.task = dataTask;
      this.isShowUpdate = true;
    },
    deleteTask(dataTask) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/task/${dataTask.id}`,
        headers: {
          access_token: localStorage.token,
        },
      }).then(({ data }) => {
        this.getList();
      });
    },
  },
  computed: {
    Backlog: function () {
      let Backlog = this.listTask.filter((task) => task.category == "Backlog");
      return Backlog;
    },
    Todo: function () {
      let Todo = this.listTask.filter((task) => task.category == "Todo");
      return Todo;
    },
    Doing: function () {
      let Doing = this.listTask.filter((task) => task.category == "Doing");
      return Doing;
    },
    Complete: function () {
      let Complete = this.listTask.filter(
        (task) => task.category == "Complete / Done"
      );
      return Complete;
    },
  },
};
</script>

