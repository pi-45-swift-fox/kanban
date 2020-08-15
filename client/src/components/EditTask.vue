<template>
    <div id="ed">
        <div v-on:submit.prevent="edited_task( data_edit.id, data_edit.category )">
            <h4>Move Task To</h4>
            <form>
                <div class="form-group col-12">
                    <label>Category :</label>
                    <select class="form-control form-control-sm" v-model="data_edit.category">
                    <option value="backlog">BACK-LOG</option>
                    <option value="todo">TO DO</option>
                    <option value="doing">DOING</option>
                    <option value="done">DONE</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Move</button>
            </form>
        </div>

    </div>
</template>

<script>
export default {
    name: 'EditTask',
    props: ['data_edit'],
    methods: {
        edited_task(id, category) {
            console.log(id, category)
            axios({
                method: 'PUT',
                url: `http://localhost:3000/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data : {
                    category
                }
            })
            .then(({data}) => {
                this.$emit('get_all_task')
                this.$emit('home')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
#ed {
    display: flex;
    justify-content: center;
    text-align: center;
}

h4 {
    font-weight: bold;
}

button {
    background-color: rgb(255, 24, 24);
    border: none;
    color: white;
    align-items: center;
}

input {
    border: 1px solid rgb(248, 239, 229);
}
</style>