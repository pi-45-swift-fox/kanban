<template>
  <div>
    <FormAdd  v-if="isShowAdd" @emitAddTask="getList"></FormAdd>
    <FormUpdate :Task="task" v-if="isShowUpdate" @emitUpdateTask="getList"></FormUpdate>
    <div class="container">
      <div class="row">
        <div class="card col-3 d-block">
          <div class="card-header">Backlog</div>
          <TaskCard v-for="task in Backlog" :key="task.id" :dataTask="task" @emitUpdate='updateTask' @emitDelete='deleteTask'/>
        </div>
        <div class="card col-3 d-block">
          <div class="card-header">Todo</div>
          <TaskCard v-for="task in Todo" :key="task.id" :dataTask="task" @emitUpdate='updateTask'  @emitDelete='deleteTask'/>
        </div>
        <div class="card col-3 d-block">
          <div class="card-header">Doing</div>
          <TaskCard v-for="task in Doing" :key="task.id" :dataTask="task" @emitUpdate='updateTask'  @emitDelete='deleteTask'/>
        </div>
        <div class="card col-3 d-block">
          <div class="card-header">Complete / Done</div>
          <TaskCard v-for="task in Complete" :key="task.id" :dataTask="task" @emitUpdate='updateTask'  @emitDelete='deleteTask'/>
        </div>
      </div>
    </div>
    <button @click="addTask">ADD TASK</button>
  </div>
</template>
<script>
import FormAdd from "./FormAdd"
import TaskCard from "./TaskCard";
import FormUpdate from "./FormUpdate";
import axios from "axios";
export default {
  name: "TaskList",
  data() {
    return {
      listTask: [],
      task:'',
      isShowUpdate:false,
      isShowAdd:false
    };
  },
  components: {
    TaskCard,
    FormUpdate,
    FormAdd
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
          access_token:localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data.dataTask);
          this.listTask = data.dataTask;
          this.isShowUpdate = false
          this.isShowAdd = false
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendTask(task, category) {
      if (task.category === category) {
        console.log("task");
        return task;
      }
    },
    addTask(){
      this.isShowAdd = true
    },
    updateTask(dataTask){    
      this.task = dataTask  
      console.log(this.task.title)
      this.isShowUpdate = true
    },
    deleteTask(dataTask){
       axios({
        method: "DELETE",
        url: `http://localhost:3000/task/${dataTask.id}`,
        headers: {
          access_token:localStorage.token
        }
      })
      .then(({data})=>{
        this.getList()
      })
    }
  },
  computed: {
    Backlog: function() {
      let Backlog = this.listTask.filter(task => task.category == "Backlog");
      return Backlog;
    },
    Todo: function() {
      let Todo = this.listTask.filter(task => task.category == "Todo");
      return Todo;
    },
    Doing: function() {
      let Doing = this.listTask.filter(task => task.category == "Doing");
      return Doing;
    },
    Complete: function() {
      let Complete = this.listTask.filter(task => task.category == "Complete / Done");
      return Complete;
    },
  }
};
</script>

