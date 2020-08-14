<template>
  <div>
      <textarea placeholder="Enter task" 
      class="list-card-composer-textarea js-card-title form-control" 
      style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;" v-model="title"></textarea>
  </div>
</template>

<script>
export default {
    data() {
        return {
            baseUrl: "http://localhost:3000",
            title: ''
        }
    },
    props: ['category'],
    
}
</script>

<style>

</style>