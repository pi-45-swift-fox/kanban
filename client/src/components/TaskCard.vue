<template>
  <div>    
    <div class="card-body">
      <h5 class="card-title">{{dataTask.title}}</h5>
      <p class="card-text">{{dataTask.createdAt}}</p>
      <button @click="update"  >Update</button>
      <button @click="deleteTask" >Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["dataTask"],
  methods: {
    update() {
      this.$emit('emitUpdate',this.dataTask)
    },
    deleteTask(){
      this.$emit('emitDelete',this.dataTask)
    }
  },
    
  
};
</script>