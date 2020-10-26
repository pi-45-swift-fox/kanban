<template>
<div class="row">
  <div :class="classnotif">
    {{notif.text}}
  </div>
</div>
</template>

<script>
export default {
name:'Notif',
props:['notif'],
computed:{
  classnotif(){
    console.log(this.notif)
    return this.notif.status?'p-3 mb-2 bg-success text-white col-4 mx-auto carousel-fade':'p-3 mb-2 bg-danger text-white col-4 mx-auto'
  }
}
}
</script>

<style>

</style>