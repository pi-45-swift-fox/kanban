<template>
  <div>
    <div class="card-body">
      <h5 class="card-title">{{dataTask.title}}</h5>
      <p class="card-text">{{dataTask.createdAt}}</p>
      <button @click="update" data-toggle="modal" data-target="#modalupdate">Update</button>
      <button @click="deleteTask">Delete</button>
    </div>
    <ModalUpdate :Task="dataTask"></ModalUpdate>
  </div>
</template>

<script>
import ModalUpdate from "./ModalUpdate";
export default {
  name: "TaskCard",
  components: {
    ModalUpdate,
  },
  props: ["dataTask"],
  methods: {
    // update() {
    //   this.$emit("emitUpdate", this.dataTask);
    // },
    deleteTask() {
      this.$emit("emitDelete", this.dataTask);
    },
  },
};
</script>