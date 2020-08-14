<template>
    <!-- <div class="flex-1 text-gray-700 bg-gray-400 mx-10 my-10 max-w-md relative max-h-screen ">
        <div class="cards-header cards-title ">
        <div class="cards-title font-bold text-xl mt-1">
                <h2>{{categoryTask}}</h2>
                <div v-html="svg"></div>
            </div>
        </div>
        <div class="overflow-auto cards-body">
            <div v-for="(category, index) in categories" :key="index">
                <div class="m-6 isi-cards">
                    <div class="flex flex-col">
                        <div class="font-bold text-xl mb-4">{{category.title}}

                        </div>
                    </div>
                    <div class="bg-white mx-auto">
                        Assign To : {{category.User.email}}
                    </div>
                    <span
                        class="mx-auto my-6 py-4 inline-block px-10 bg-gray-200 rounded-full text-sm font-semibold text-gray-700 ">
                        Show Detail
                    </span>
                </div>
            </div>
        </div>
    </div> -->
<div>
    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 ">
            {{categoryTask}}
        </div>
        <div class="flex-col overflow-auto bg-blue-100 overflow-auto container-tasks ">
            <div v-for="category in categories" :key="category.id">
                <div class="px-6 py-4 bg-white p-10 m-3 bg-black">
                    <div class="container-row">
                        <div class="container-row" @click="editData(category.category,category.title,category.id)">
                            <div v-html="editLogo">
                            </div>
                            <p class="text-xs text-gray-500	">edit</p>
                        </div>
                        <div class="container-row" @click="deleteData('backlog', category.id)">
                            <p class="text-xs text-gray-500	">delete</p>
                            <div v-html="deleteLogo"></div>
                        </div>
                    </div>
                    <div class="font-bold text-base mb-2">
                        <p> {{ category.title }} </p>
                    </div>
                    <p class="text-gray-600 text-xs">By : {{category.User.name}}</p>
                    <p class="text-gray-600 text-xs">{{new Date(category.createdAt).toDateString()}}</p>
                    <form @submit.prevent="editcategory(category.id)" class="bg-blue-200">
                        <textarea id="card-edit" v-model="valFor" placeholder="Enter category"
                            class="overflow-auto bg-pink-100">
                                    </textarea>
                        <label for="edit">Move To:</label>
                        <select name="categorycategory" id="" v-model="categorycategory" class="bg-pink-100">
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button type="submit"
                            class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit
                            Task</button>
                        <button @click.prevent="openEditor"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
                    </form>
                </div>
            </div>
</div>
</template>

<script>
    export default {

        name: "Cards",
        props: ['categories', 'svg', "categoryTask", 'colors'],
        data() {
            return {
                jobTitles: [{
                        "id": 1,
                        "title": "Belajar Javascript",
                        User: {
                            name: 'Firaz'
                        }
                    },
                    {
                        "id": 2,
                        "title": "Belajar Vue",
                        User: {
                            name: 'Grace'
                        }
                    },
                    {
                        "id": 3,
                        "title": "Belajar REACT",
                        User: {
                            name: 'Isro'
                        }
                    }
                ],
            }
        },
        methods: {
            editData(){

            },
            deleteData(){

            },editCategory(){

            }
        }
    }
</script>

<style scoped>
    .cards-header {
        height: 25%;
        top: 0%;
    }

    .cards-body {
        height: 75%;
    }

    .cards-title {
        position: absolute;
        bottom: 0;
        top: 75%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .isi-cards {
    border: 10px solid black;
}

</style>
