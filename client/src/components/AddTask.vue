<template>
    <div id="addtks">
        <div v-on:submit.prevent="add_task">
        <h4>Add Task Form</h4>
        <form>
          <div class="form-group col-12">
            <label>Title</label>
            <input type="title" class="form-control" aria-describedby="emailHelp" v-model="title" required>
          </div>
          <div class="form-group col-12">
            <label>Description</label>
            <input type="title" class="form-control" aria-describedby="emailHelp" v-model="description" required>
          </div>
          <div class="form-group col-12">
            <label>Category :</label>
            <select class="form-control form-control-sm" v-model="category">
              <option value="backlog">BACK-LOG</option>
              <option value="todo">TO DO</option>
              <option value="doing">DOING</option>
              <option value="done">DONE</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
</template>

<script>
export default {
    name: 'AddTask',
    data() {
        return {
            title: "",
            description: "",
            category: "",
        }
    },
    methods: {
        add_task() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.title,
                    description: this.description,
                    category: this.category,
                }
            })
            .then((data) => {
                this.$emit('get_all_task')
                this.$emit('home')
                this.$emit('set_status')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
#addtks {
    display: flex;
    justify-content: center;
    text-align: center;
}

h4 {
    font-weight: bold;
}

button {
    background-color: rgb(0, 60, 255);
    border: none;
    color: white;
    align-items: center;
}

input {
    border: 1px solid rgb(255, 233, 207);
}
</style>