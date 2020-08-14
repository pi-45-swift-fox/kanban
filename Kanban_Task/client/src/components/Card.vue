<template>
  <div >
      <div class="card mt-2" style="width: auto;">
  <div class="card-body">
    <h5 class="card-title">{{dataTask.title}}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
    <button class="fas fa-trash text-danger ml-auto cursor-pointer deleteFoodButton" @click.prevent="delById"></button>
  </div>
</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['dataTask'],
    methods:{
        delById(){
            console.log('ini id task nya>>>>',this.dataTask.id)
            axios({
                method:'delete',
                url:`http://localhost:3000/task/${this.dataTask.id}`,
                headers:{access_token:localStorage.access_token}
            })
            .then(data=>{
                console.log(data.data)
                this.$emit('getAfterDelete')
            })
            .catch(err=>{
                console.log('ERROR DELETE',err)
            })
        }
    }
}
</script>

<style>

</style>