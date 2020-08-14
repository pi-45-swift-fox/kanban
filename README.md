# kanban
Membuat website untuk manajemen task

# Guide
## Endpoints
### GET `/`
##### Mendapatkan tasks user yang logged in

#### Request Headers
>
    "access_token": "your access token"
> 

#### Request Body
>
    _Tidak diperlukan_
>

#### Response (200)
>
    "id": "Task serialized ID",
    "title": "Task title",
    "description": "Task description",
    "status": "Task status",
    "UserId": "User (Owner) ID",
    "organization": "User (Owner) organization",
    "createdAt": "Date Sequelize",
    "updatedAt": "Date Sequelize"
 >
 
 #### Response (409)
 >
  "msg": "Tidak ada token terkirim/terdaftar"
 >

### POST `/login`
##### Mendapatkan akses (token) user dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "email": "Input email user",
    "password": "Input password user"
>

#### Response (200)
>
    "username": "Username yang teregister dalam database",
    "token": "Token User untuk access ke server"
 >
 
 #### Response (401)
 >
  "msg": "Email/password salah"
 >

### POST `/register`
##### Mendaftarkan data user ke dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "username": "Input username User",
    "email": "Input email User",
    "password": "Input password User"
>

#### Response (200)
>
    "msg": "OK"
 >
 
#### Response (400)
>
 "msg": "Terjadi kesalahan input"
>
 
#### Response (409)
>
 "msg": "Email sudah terdaftar"
>

### POST `/google-login`
##### Mendapatkan akses (token) user dalam database melalui google

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "username": "Input username User",
    "email": "Input email User",
    "password": "Input password User"
>

#### Response (200)
>
    "username": "Username yang teregister dalam database",
    "token": "Token User untuk access ke server"
>

### POST `/tasks`
##### Menambahkan task baru ke database sesuai user yang logged in

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "title": "Task title",
    "description": "Task description",
    "status": "Task status"
>

#### Response (201)
>
    "id": "Task serialized ID",
    "title": "Task title (new)",
    "description": "Task description (new)",
    "status": "Task status (new)",
    "UserId": "User (Owner) ID",
    "organization": "User (Owner) organization",
    "createdAt": "Current Date",
    "updatedAt": "Current Date"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (409)
>
    "msg": "Tidak ada token terkirim/terdaftar"
>

### PUT `/tasks/id`
##### Mengedit task di database sesuai user yang logged in

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "title": "Task title",
    "description": "Task description",
    "status": "Task status"
>

#### Response (201)
>
    "msg": "OK"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (404)
>
    "msg": "Task tidak ditemukan"
>

#### Response (409)
>
    "msg": "Tidak ada token terkirim/terdaftar"
>

### DELETE `/tasks/id`
##### Menghapus task di database sesuai user yang logged in

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    _Tidak Perlu_
>

#### Response (200)
>
    "msg": "OK"
>

#### Response (404)
>
    "msg": "Task tidak ditemukan"
>

#### Response (409)
>
    "msg": "Tidak ada token terkirim/terdaftar"
>
