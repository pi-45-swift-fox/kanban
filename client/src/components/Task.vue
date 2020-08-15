<template>
    <div>
        <div class="todo-coloumn" v-if="category == task.category">
            <div class="card mt-4 mb-0 ml-auto mr-auto" style="width: 15rem;">
            <div class="card-body">
                <div class="title-btn" >
                <h5 class="card-title">{{ task.title }}</h5>
                <div v-if="status && task.User.organization == organization">
                    <a class="btn" v-on:click.prevent="edit_task( task.id )">#</a>
                    <a class="btn" v-on:click.prevent="delete_task( task.id )">X</a>
                </div>
                </div>
                <p class="card-text">{{ task.description }}</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tasks',
    props: [ 'category', 'task', 'status', 'organization' ],
    methods: {
        edit_task(id) {
            console.log(this.task)
            this.$emit('edit_task', id)
        },
        delete_task(id) {
            this.$emit('delete_task', id)
        }
    }
}
</script>

<style>

</style>