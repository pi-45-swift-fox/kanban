<template>
    <div class="dashboard">
        <div class="nav-bar rounded-b-lg">
            <nav class="flex items-center h-20 justify-between flex-wrap bg-blue-300 p-2 rounded-b-lg">
                <div class="flex items-center flex-shrink-0 text-white mx-16 ">
                    <svg width="3em" viewBox="0 0 16 16" class="bi bi-check2-square" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        <path fill-rule="evenodd"
                            d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z" />
                    </svg>
                    <span class="font-semibold text-xl tracking-tight ml-3">KANBAN</span>
                </div>
                <div class="mx-auto">
                    <h1 class="text-4xl">WELCOME TO KANBAN PAGE</h1>
                </div>
                <div>
                    <button @click="logout"
                        class="inline-block text-sm mr-5 px-4 py-3 leading-none border-2 rounded text-white border-white hover:border-transparent hover:text-white hover:bg-red-500 lg:mt-0">Logout</button>
                </div>
            </nav>
        </div>



<!-- CARDS -->
            <div class="flex min-h-screen bg-gray-500 justify-around bg-transparent mx-10 mt-20">
                <Cards :categories="categoryBacklog" :svg='icons[0]' :categoryTask='"Backlog"'></Cards>
                <Cards :categories="categoryTodo"  :svg='icons[1]' :categoryTask="'Todo'"></Cards>
                <Cards :categories="categoryCurrent" :svg='icons[2]' :categoryTask='"Current"'></Cards>
                <Cards :categories="categoryDone" :svg='icons[3]' :categoryTask='"Done"'></Cards>
            </div>

    </div>


</template>

<script>

import Cards from './03.1-Cards.vue'

export default {

    name : "Dashboard",
    data(){
        return {
            // cardsTitles: ['Backlog','Todo', 'Current', 'Done'],
            colors : ['bg-yellow-300 hover:bg-yellow-500 hover:text-black','bg-red-200 hover:bg-red-300 hover:text-black','bg-green-300 hover:bg-green-500 hover:text-black', 'bg-blue-300 hover:bg-blue-300 hover:text-black'],
            icons : [ 
                 `<svg class="svg-icon mx-auto bi-card-list hover:text-blue-500 text-gray-600" width="5em" viewBox="0 0 16 16" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path fill-rule="evenodd"
                d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
                <circle cx="3.5" cy="5.5" r=".5" />
                <circle cx="3.5" cy="8" r=".5" />
                <circle cx="3.5" cy="10.5" r=".5" />
                </svg>`, 
                 `<svg class="svg-icon mx-auto hover:text-blue-500 text-gray-600 bi bi-list-task" width="5em" viewBox="0 0 16 16"  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
                <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
                </svg>`, 
                 `<svg width="5em" viewBox="0 0 16 16" class="svg-icon mx-auto bi bi-list-ol" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
                </svg>`, 
                `<svg width="5em" viewBox="0 0 16 16" class="svg-icon mx-auto bi-card-list hover:text-blue-500 text-gray-600 bi bi-list-task bi bi-check2-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"/>
                </svg>`
                ],
            }
    },
    props: ['tasks'],
    methods: {
        changePage(page){
            this.$emit('changePage', page)
        },
        logout(){
            localStorage.clear()
            this.changePage('Login')
        }
    },
    components : {
        Cards
    },

    computed: {
        categoryBacklog(){
            return this.tasks.filter(task=>{
                return task.category === `Backlog`
            })
        },
        categoryTodo(){
            return this.tasks.filter(task=>{
                return task.category === `Todo`
            })
        },
        categoryCurrent(){
            return this.tasks.filter(task=>{
                return task.category === `Current`
            })
        },
        categoryDone(){
            return this.tasks.filter(task=>{
                return task.category === `Done`
            })
        },
    },

}
</script>

<style scoped>


</style>