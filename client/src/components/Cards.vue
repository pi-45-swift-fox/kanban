<template>
  <div style=" display: flex; flex-direction: column;"  >
    <div style="background-color: #EBEBEB; width: 25vw;">
      <h4>{{ category.toUpperCase() }}</h4>
    </div>
    <Tasks
        v-for="(task, i) in tasks" :key="i"

        @edit_task="edit_task"
        @delete_task="delete_task"

        :status="status"
        :category="category"
        :task="task"
        :organization="organization"
      ></Tasks>
  </div>
</template>

<script>
import Tasks from './Task'

export default {
    name: 'Cards',
    props: ['status', 'tasks', 'category', 'organization'],
    components: {
        Tasks
    },
    methods: {
      edit_task(id) {
        this.$emit('edit_task', id)
      },
      delete_task(id) {
        this.$emit('delete_task', id)
      }
    }
}
</script>

<style scoped>
</style>