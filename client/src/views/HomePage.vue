<template>
 <div class="homepage">
  <KanbanList />
 </div>
</template>
<script>
import KanbanList from '../components/KanbanList'
export default {
  name: 'Homepage',
  components: {
    KanbanList
  }
}
</script>
<style scoped>
.homepage {
  height: 100%;
  background: url('https://s3.amazonaws.com/media-p.slid.es/uploads/logihelgu/images/1086249/Wood-background-black-wallpapers-wallpaper-476440.jpg');
  width: 100%;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

</style>
