<template>
    <div class="category p-2 bd-highlight mt-3 col-3">
        <div class="card-header bg-dark text-white">
          {{title}}
        </div>

        <div class="contents">
          <task v-for="(data, idx) in datas" :key="idx" :data="data" @getAllTask="getAllTask"></task>
          <input type="text" v-if="isTask" v-model="addTask">
        </div>

        <div class="card-footer bg-secondary text-white">
          <a href="#" @click.prevent="emitTask()" v-if="btnTask"><i class="fa fa-plus" aria-hidden="true" > Add Task</i></a>
          <button @click.prevent="submit(title)" v-if="isBtn"><i class="fa fa-plus" aria-hidden="true" > Create</i></button>
          <button @click.prevent="back()" v-if="isBtn"><i class="fa fa-minus" aria-hidden="true" > Cancel</i></button>
        </div>
    </div>
</template>

<script>
import task from '../components/Task'
import axios from 'axios'
export default {
    props: ['title', 'datas'],
  data() {
    return {
      message: 'Hello world',
      isTask : false,
      isBtn : false,
      btnTask : true,
      addTask: ""
    };
  },
  created() {
      
  },
  methods: {
      emitTask () {
          this.isTask = true
          this.isBtn = true
          this.btnTask = false
      },

      back () {
          this.isTask = false
          this.isBtn = false
          this.btnTask = true
      },

      submit (title) {
          axios({
              method: "POST",
              url: "http://localhost:3000/tasks",
              headers: {
                  access_token : localStorage.access_token
              },
              data: {
                  title: this.addTask,
                  category: title
              }
          })
          .then((result) => {
              this.addTask = ''
              this.$emit("getAlltask")
              this.isTask = false
              this.isBtn = false
              this.btnTask = true
          })
          .catch((err) => {
              console.log(err);
          });
      },

      getAllTask () {
          this.$emit("getAlltask")
      }
  },
  components: {
      task
  }
};
</script>

<style scoped>
</style>