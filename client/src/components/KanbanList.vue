<template>
  <div class="kanban">
      <div v-if="!isEdit">
        <h4 class="title">Kanban <span> Board</h4>
        <div  class="card">
            <br>
            <div class="done" v-for="tag in tags" :key="tag">
                <h4>{{tag}}</h4>
                <hr id="line">
                <div class="wrap">
                    <KanbanCards @refresh="refresh" v-for="data in statusCheck(tag)" :key="data.id" :data="data" @showEdit="showEdit" />
                </div>
            </div>
        </div>
      </div>
      <div v-if="isEdit" class="editPage">
          <h3 class="title">Edit <span> Page</h3>
          <br>
          <div>
              <form>
                <div class="form-group row">
                    <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Title</label>
                    <div class="col-sm-8">
                    <input class="form-control" type="text" v-model="dapatSatu.title" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="colFormLabel" class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-8">
                    <input class="form-control" type="text" v-model="dapatSatu.description" required>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-dark" @click.prevent="edit()">Update</button>
                    <button class="btn btn-danger" @click.prevent="cancel()" >Cancel</button>
                </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import KanbanCards from './KanbanCards'
export default {
    name: 'KanbanList',
    components: {
        KanbanCards,
    },
    data() {
        return {
            kanban: [],
            dapatSatu: [],
            isEdit: false,
            tags: ['Backlog', 'Todo', 'On progress', 'Done']
        }
    },
    methods: {
        edit() {
            axios({
                method: 'PUT',
                url: `https://protected-hollows-86433.herokuapp.com/kanbans/${this.dapatSatu.id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.dapatSatu.title,
                    description: this.dapatSatu.description
                }
            })
                .then(result => {
                    console.log(result, '<< ini result nya');
                    this.getKanban(
                        this.isEdit = false
                    )
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'You Only Can Update Your Own List',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    console.log(err, 'sini <><>');
                    
                })
        },
        cancel() {
            this.isEdit = false
        },
        showEdit(id) {
            axios({
                method: 'GET',
                url: `https://protected-hollows-86433.herokuapp.com/kanbans/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(result => {
                    this.isEdit = true
                    this.dapatSatu = result.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getOne(id) {
            axios({
                method: 'GET',
                url: `https://protected-hollows-86433.herokuapp.com/kanbans/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(result => {
                    console.log(result, '<< ini result nya');
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getKanban() {
            axios({
                method: 'GET',
                url: `https://protected-hollows-86433.herokuapp.com/kanbans`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(result => {
                    console.log(result, '<<<<<<');
                    this.kanban = result.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        statusCheck(status) {
            let datarFilter = []
            if (this.kanban != undefined) {
                if (this.kanban != undefined) {
                    datarFilter = this.kanban.filter(function(item) {
                        return item.tag === status.toLowerCase()
                    })
                }
            }
            return datarFilter
        },
        refresh() {
            this.getKanban()
        }
    },
    created() {
        this.getKanban()
    }
}
</script>

<style scoped>
.title {
  font-family: Brush Script MT;
  font-size: 40px;
  color: #a6e3e9;
}
.title span {
  color: #71a0a5;
}
form {
    margin-top: 12%;
}
#line {
    background-color: aliceblue;
}
.card{
    margin: auto;
    width: fit-content;
    background: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.editPage{
  margin-top: 12%;
  width: 650px;
  margin: auto;
}
.done{
  width: 50%;
  min-height: 450px;
  margin: 10px;
  border: 2px solid double;
  font-family: Alegreya;
  border-radius: 10px;
}
h4{
  margin-left: 10%;
}
.wrap{
  overflow: auto;
  overflow-wrap: inherit;
  height: 550px;
  width: 103%;
}

</style>