<template>
    <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
                <form method="post" @submit.prevent="updateTitleThis()">
                <div class="modal-body">
                    <textarea name="task" id="" class="w-100 h-100" v-model="newTitle"></textarea> <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-edit-title',
    props: ['filtered-task-id', 'updateTitle'],
    data () {
        return {
            newTitle:''
        }
    },
    methods: {
        updateTitleThis(){
            this.updateTitle(this.filtered-task-id)
        }
    }
}
</script>

<style>

</style>