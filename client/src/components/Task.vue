<template>
    <div class="card mt-2 mb-2 mr-3 ml-3 rounded">
        <div class="card-body pr-1 pl-1 pt-2 pb-2">
            <h5 class="card-title">{{data.title}}</h5>
            <div class="container p-0">
            <div class="row">
                <div class="col-6">
                <p>By: {{data.User.email}}</p>
                    <p>{{data.createdAt}}</p>
                </div>
                <div class="col-6 text-right" id="awesome-icons">
                    <a href="#" @click.prevent="btnShowEdit()"><i class="fa fa-wrench" aria-hidden="true"></i></a>
                    <a href="#" @click.prevent="showModalDelete()"><i class="fa fa-trash" aria-hidden="true"></i></a>
                    <a href="#" id="item-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-arrows-alt" aria-hidden="true"></i></a>
                    <div class="dropdown-menu" aria-labelledby="item-1">
                        <button class="dropdown-item" type="button" @click.prevent="editCategory('Backlog', data.id)">Move To Backlog</button>
                        <button class="dropdown-item" type="button" @click.prevent="editCategory('Product', data.id)">Move To Product</button>
                        <button class="dropdown-item" type="button" @click.prevent="editCategory('Development', data.id)">Move To Development</button>
                        <button class="dropdown-item" type="button" @click.prevent="editCategory('Complete', data.id)">Move To Complete</button>
                    </div>
                </div>

                <div v-if="editShow">
                    <input type="text" v-model="editTask">
                    <button @click.prevent="btnEdit(data.id)">Update</button>
                    <button @click.prevent="btnCancel()">Cancel</button>
                </div>

            </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import Swal from 'sweetalert'
export default {
    props: ['data'],
  data() {
    return {
      message: 'Hello world',
      isEdit : false,
      editTask: '',
      category: this.data.category,
      editShow : false,
    };
  },
  created() {
      this.editTask = this.data.title
  },
  
  methods: {
      btnShowEdit () {
          this.editShow = true
          
      },
      
      btnCancel () {
          this.editShow = false
          this.isEdit = false
      },

      date () {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          
          today = mm + '/' + dd + '/' + yyyy;
          document.write(today);
      },

      btnEdit (id) {
          
          Axios({
              method: "PUT",
              url: `http://localhost:3000/tasks/${id}`,
              headers: {
                  access_token : localStorage.access_token
              },
              data: {
                  title: this.editTask,
                  category: this.category
              }
          })
          .then((result) => {
              this.editShow = false,
              this.$emit('getAllTask')
          }).catch((err) => {
              swal({
                  title: "Forbidden Access!",
                  text: "Please edit your task only!",
                  icon: "error",
                  button: "oke",
              });
          });
      },

      showModalDelete() {
          Swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: ["Cancel", "Destroy"], 
                dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                  this.deleteTask(this.data.id)
                  swal("Poof! Your imaginary file has been deleted!", {
                      icon: "success",
                  });
                  } else {
                      swal("Your imaginary file is safe!");
                  }
          })
          .catch((err) => {
              swal({
                  title: "Forbidden Access!",
                  text: "Please edit your task only!",
                  icon: "error",
                  button: "oke",
              });
          })
        
      },

      editCategory(category, id) {
          Axios({
              method: "PUT",
              url: `http://localhost:3000/tasks/${id}`,
              headers: {
                  access_token : localStorage.access_token
              },
              data: {
                  title: this.data.title,
                  category: category
              }
          })
          .then((result) => {
              this.$emit('getAllTask')
          }).catch((err) => {
              swal({
                  title: "Forbidden Access!",
                  text: "Please Move your task only!",
                  icon: "error",
                  button: "oke",
              });
          });
      },

      deleteTask(id) {
          Axios({
              method: "DELETE",
              url: `http://localhost:3000/tasks/${id}`,
              headers: {
                  access_token : localStorage.access_token
              },
          })
          .then((result) => {
              this.$emit('getAllTask')
          }).catch((err) => {
              console.log(err);
              swal({
                  title: "Forbidden Access!",
                  text: "Please delete your task only!",
                  icon: "error",
                  button: "oke",
              });
          });
      }
  },
};
</script>

<style scoped>
</style>