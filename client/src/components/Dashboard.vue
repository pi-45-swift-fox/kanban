<template>
  <div>
    <div id="navbar ">
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand text-white font-weight-bold" href="#">かんばん</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            </ul>
            <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: rgb(250, 234, 234);">
                {{ panggilan }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" @click.prevent= "logout">Logout</a>
            </div>
        </div>
        </div>
        </nav>
    </div>
    <div class="container mt-5 mb-5">
        <div class="row d-flex flex-row justify-content-between">
            <CategoryList :category="'BACK LOG'" :dbcategory="'back log'" :filteredTasks="backlog" @fetchTasks="fetchTasks"></CategoryList>            
            <CategoryList :category="'TODO'" :dbcategory="'todo'" :filteredTasks="todo" @fetchTasks="fetchTasks"></CategoryList>            
            <CategoryList :category="'DOING'" :dbcategory="'doing'" :filteredTasks="doing" @fetchTasks="fetchTasks"></CategoryList>            
            <CategoryList :category="'COMPLETED'" :dbcategory="'completed'" :filteredTasks="completed" @fetchTasks="fetchTasks"></CategoryList>            
            <!-- <div class="col-md-3 col-sm-6 col-6">
                <div class=" card d-flex flex-column bd-highlight mb-3">
                    <div class="card header bg-dark badge badge-primary text-wrap font-bold" style="height: 40px;">
                        <div class="d-flex align-items-center ">
                            <h6 class="mx-auto w-100 mt-1">Back Log</h6>
                        </div>
                    </div>
                    <div class="d-flex flex-column bd-highlight mb-3" style="overflow-y:scroll; overflow-x:hidden; height:400px; background-color: rgba(0,0,0,.03);" @fetchTasks="fetchTasks" v-for="(card, index) in cards" :key= index>
                        {{ card }}
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <small><svg class="edit" data-toggle="modal" data-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <textarea name="task" id="" class="w-100 h-100"></textarea>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </small>
                                    <small><svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></small>
                                    <small><svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg></small>
                                </div><br><br>
                                <h5 class="card-title">Belajar CSS</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar SCSS</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Vue</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Vue</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Vue</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="addTask" v-if="showBacklog == true">
                        <form action="" @submit.prevent="addNewBacklog">
                        <textarea name="task" class="w-100" v-model="newBackLog"></textarea>
                        <br>
                        <button type="submit" class="btn btn-info">Add</button>
                        </form>
                        </div>
                        <div id="BackLog" class="addKanban" v-if="showAddToBacklog == true">
                            <span @click.prevent="addBackLog">   
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                            &nbsp;Add To Back Log
                            </span>          
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-6">
                <div class=" card d-flex flex-column bd-highlight mb-3">
                    <div class="card header bg-dark badge badge-primary text-wrap font-bold" style="height: 40px;">
                        <div class="d-flex align-items-center ">
                            <h6 class="mx-auto w-100 mt-1">To Do</h6>
                        </div>
                    </div>
                    <div  class="d-flex flex-column bd-highlight mb-3" style="overflow-y:scroll; overflow-x:hiden; height:400px; background-color: rgba(0,0,0,.03);">
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Ajax</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Jquery</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="addTask" v-if="showToDo == true">
                        <textarea name="task" class="w-100" v-model="newTask"></textarea>
                        <br>
                        <button type="submit" class="btn btn-info">Add</button>
                        </div>
                        <div id="BackLog" class="addKanban" v-if="showAddToToDo == true">
                            <span @click.prevent="addTodo">   
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                            &nbsp;Add To ToDo
                            </span>          
                        </div>
                    
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-6">
                <div class=" card d-flex flex-column bd-highlight mb-3">
                    <div class="card header bg-dark badge badge-primary text-wrap font-bold" style="height: 40px;">
                        <div class="d-flex align-items-center ">
                            <h6 class="mx-auto w-100 mt-1">Doing</h6>
                        </div>
                    </div>
                    <div  class="d-flex flex-column bd-highlight mb-3" style="overflow-y:scroll; height:400px; background-color: rgba(0,0,0,.03);" >
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Sequelize</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Postgres</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="addTask" v-if="showDoing == true">
                        <textarea name="task" class="w-100"></textarea>
                        <br>
                        <button type="submit" class="btn btn-info">Add</button>
                        </div>
                        <div id="BackLog" class="addKanban" v-if="showAddToDoing == true">
                            <span @click.prevent="addDoing">   
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                            &nbsp;Add To Doing
                            </span>          
                        </div>
                    
                    
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-6">
                <div class=" card d-flex flex-column bd-highlight mb-3">
                    <div class="card header bg-dark badge badge-primary text-wrap font-bold" style="height: 40px;">
                        <div class="d-flex align-items-center ">
                            <h6 class="mx-auto w-100 mt-1">Completed</h6>
                        </div>
                    </div>
                    <div class="d-flex flex-column bd-highlight mb-3" style="overflow-y:scroll; height:400px; background-color: rgba(0,0,0,.03);" >
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar Javascript Fundamental</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="float-right">
                                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                    <svg class="move" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg>
                                </div><br><br>
                                <h5 class="card-title">Belajar MVC</h5>
                                <p class="card-text"><small class="text-muted">By: User</small></p>
                                <p class="card-text"><small class="text-muted">11 Agustus 2020 12.45</small></p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="addTask" v-if="showCompleted == true">
                        <textarea name="task" class="w-100" v-model="newTask"></textarea>
                        <br>
                        <button type="submit" class="btn btn-info">Add</button>
                        </div>
                        <div id="BackLog" class="addKanban" v-if="showAddToCompleted == true">
                            <span @click.prevent="addCompleted">   
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                            &nbsp;Add To Completed
                            </span>          
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import CategoryList from './CategoryList.vue'

export default {
        name: 'Kanban-home-page',
        components: {
            CategoryList
        },
        data(){
            return {
            newBackLog: '',
            tasks: [],
            panggilan: localStorage.panggilan,
            }
        },
        computed: {
            backlog(){
                return this.tasks.filter(task => {
                    return task.category === 'back log'
                })
            },
            todo(){
                return this.tasks.filter(task => {
                    return task.category === 'todo'
                })
            },
            doing(){
                return this.tasks.filter(task => {
                    return task.category === 'doing'
                })
            },
            completed(){
                return this.tasks.filter(task => {
                    return task.category === 'completed'
                })
            },
        },
        methods: {
            logout(){
            this.$emit('changeLogin', false)
            this.$emit('changePage', 'login-page')
            localStorage.clear()
            },
            addNewBacklog(){
                axios({
                    method: 'POST',
                    url: 'http://localhost:3000/tasks',
                    data: {
                        title: this.newBackLog,
                        category: 'back log'
                    }
                })
                .then((result) => {     
                    this.showBacklog = false,
                    this.showAddToBacklog = true
                    console.log('berhasil', result.data)
                }).catch((err) => {
                    console.log('error', err)
                });
            },
            fetchTasks(){
                axios({
                    method: 'GET',
                    url: 'http://localhost:3000/tasks',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then((result) => {                         
                    this.tasks = result.data
                    this.fetchTasks()
                    console.log('berhasil', result.data)
                }).catch((err) => {
                    console.log('error', err)
                });
            }
        },
        created(){
            this.fetchTasks()
        }
}
</script>

<style scoped>

</style>