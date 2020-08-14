<template>
  <!-- Home Page -->
  <div class="main-page">
    <div class="boards d-flex flex-row bd-highlight mb-5 ml-4 mr-4 justify-content-center align-items-start row">

      <board title="Backlog" :datas="dataBacklog" @getAlltask="getAlltask"></board>
      <board title="Product" :datas="dataProduct" @getAlltask="getAlltask"></board>
      <board title="Development" :datas="dataDevelopment" @getAlltask="getAlltask"></board>
      <board title="Complete" :datas="dataComplete" @getAlltask="getAlltask"></board>

    </div>
  </div>
</template>

<script>
import board from '../components/Board';
import axios from 'axios'

export default {
  name: "Home",
  data() {
    return {
      dataBacklog: [],
      dataProduct: [],
      dataDevelopment: [],
      dataComplete: []
    };
  },
  created () {
    let access_token = localStorage.access_token
    if (access_token) {
      this.getAlltask()
    }
  },
  components: {
    board
  },
  methods: {
    getAlltask () {
      axios({
        method: "GET",
        url: "https://arcane-river-55482.herokuapp.com/tasks",
        headers: {
          access_token : localStorage.access_token
        }
      })
      .then((result) => {
        let data = result.data
        
        this.dataBacklog = [],
        this.dataProduct = [],
        this.dataDevelopment = [],
        this.dataComplete = []

        data.forEach(task => {
          if (task.category == 'Backlog') {
            this.dataBacklog.push(task)
          } else if (task.category == 'Product') {
            this.dataProduct.push(task)
          } else if (task.category == 'Development') {
            this.dataDevelopment.push(task)
          } else if (task.category == 'Complete') {
            this.dataComplete.push(task)
          }
        });
      }).catch((err) => {
        console.log({message:"data not found"});  
      });
    }
  }
};
</script>

<style scoped></style>