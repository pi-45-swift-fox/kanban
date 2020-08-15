<template>
    
  <div class="col-3 bg-info mx-2 d-flex flex-column ">
      <h1>{{categoryName}}</h1>
      <div class="px-2" v-if="categoryName==='backlog'">
            <Card v-for="task in dataBacklog"  :key="task.id" :dataTask='task' @getAfterDelete="getTaskAgain"></Card>
      </div>
      <div v-if="categoryName==='todo'">
                <Card v-for="task in dataTodo" :key="task.id" :dataTask='task' @getAfterDelete="getTaskAgain"></Card>
      </div>
      <div v-if="categoryName==='doing'">
                <Card v-for="task in dataDoing" :key="task.id" :dataTask='task' @getAfterDelete="getTaskAgain"></Card>
      </div>
      <div v-if="categoryName==='done'">
      <Card v-for="task in dataDone" :key="task.id" :dataTask='task' @getAfterDelete="getTaskAgain"></Card>
      </div>

    

  </div>
</template>

<script>
import Card from './Card'
import axios from 'axios'
export default {
    props:['categoryName'],
    components:{
        Card
    },
    data(){
        return {
            tasks:[]
        }
    },
    methods:{
        fetchDataTask(){

            axios({
                method:'GET',
                url:'http://localhost:3000/task',
                headers:{
                    access_token:localStorage.access_token
                }
            })
            .then(data=>{
                console.log(data)
                this.tasks=data.data
            })
        },
        getTaskAgain(){
            this.fetchDataTask()
        }
    },
    created(){
        this.fetchDataTask()
    },
    computed:{
        dataBacklog:function(){
            let arrBacklog=[]
            this.tasks.forEach(el => {
                if(el.category==='backlog'){
                    arrBacklog.push(el)
                }
            });
            return arrBacklog
        },
        dataTodo:function(){
            let arr=[]
            this.tasks.forEach(el => {
                if(el.category==='todo'){
                    arr.push(el)
                }
            });
            return arr
        },
        dataDoing:function(){
            let arr=[]
            this.tasks.forEach(el => {
                if(el.category==='doing'){
                    arr.push(el)
                }
            });
            return arr
        },
        dataDone:function(){
            let arr=[]
            this.tasks.forEach(el => {
                if(el.category==='done'){
                    arr.push(el)
                }
            });
            return arr
        }
    }
}
</script>

<style>

</style>