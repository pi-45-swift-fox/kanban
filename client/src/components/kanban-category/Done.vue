<template id="">
    <div class="kanban">
      <div class="kanban-top rounded-top">
        <h1>Done</h1>
      </div>
      <div class="overflow-auto kanban-main">
        <div v-for="data in doneProps" :key="data.id" class="card">
          <div class="card-body">
            <h5 class="card-title">{{ data.title }}</h5>
            <p class="card-text">{{ data.description }}</p>

            <div class="dropdown">
              <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Option
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a @click.prevent="modifyTask(data, 'update')" class="dropdown-item" data-toggle="modal" data-target="#UpdateTask" href="">Update</a>
                <a @click.prevent="modifyTask(data, 'delete')" class="dropdown-item" data-toggle="modal" data-target="#DeleteTask" href="">Delete</a>
                <a @click.prevent="modifyTask(data, 'move')" class="dropdown-item" data-toggle="modal" data-target="#MoveTask" href="">Move task</a>
              </div>
            </div>


          </div>
        </div>

        <UpdateTaskModal @resetModal="moveTask" v-if="update" @refreshPage="emit" :dataTask="data"></UpdateTaskModal>
        <DeleteTaskModal @resetModal="moveTask" v-if="destroy" @refreshPage="emit" :dataTask="data"></DeleteTaskModal>
        <MoveTaskModal @resetModal="moveTask" v-if="move" @refreshPage="emit" :dataTask="data"></MoveTaskModal>
      </div>
      <div class="kanban-foot rounded-bottom">
        <h2 @click="toggleForm"  class="disable-select">add task.</h2>

        <form @submit.prevent="postDone" id="form-kanban-done" class='form-kanban' v-show="showForm">
          <div class="form-group">
            <input v-model="title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="task title...">
          </div>
          <div class="form-group">
            <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="task description..."></textarea>
          </div>
          <button type="submit" class="btn btn-light nav-link font-dashboard" style="color: #303030;">Add Task</button>
        </form>
      </div>

    </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import UpdateTaskModal from './UpdateTaskModal.vue';
  import DeleteTaskModal from './DeleteTaskModal.vue';
  import MoveTaskModal from './MoveTaskModal.vue';

  export default {
    name: "Done",
    components: {
      MoveTaskModal,
      UpdateTaskModal,
      DeleteTaskModal
    },
    props: ['doneProps'],
    data() {
      return {
        showForm: false,
        title: '',
        description: '',
        data: null,
        update: false,
        destroy: false,
        move: false,
      }
    },
    methods: {
      toggleForm()
      {
        document.getElementById("form-kanban-done").reset();
        this.showForm = !this.showForm;
      },
      postDone()
      {
        console.log('awidwinwd')
        axios({
          method: 'post',
          url: 'http://localhost:3000/dashboard',
          data: {
            title: this.title,
            description: this.description,
            category: 'done'
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          console.log('awidniwndwd');
          console.log(response.data);
          this.showForm = !this.showForm;
          this.emit();
        })
        .catch(err => {
          console.log(err);
        })
      },
      modifyTask(data, option)
      {
        this.data = data;
        this.moveTask(option);
      },
      emit()
      {
        this.$emit('refreshPage');
      },
      moveTask(option)
      {
        switch (option)
        {
          case 'update':
            this.update = !this.update;
            break;
          case 'delete':
            this.destroy = !this.destroy;
            break;
          case 'move':
            this.move = !this.move;
        }
      }
    },
    created() {
      this.title = '';
      this.description = '';
    }
  }
</script>

<style media="screen">

</style>
