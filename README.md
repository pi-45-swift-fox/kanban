# kanban
Membuat website untuk manajemen task

# Guide
## Endpoints
### GET `/`
##### Mendapatkan tasks user yang logged in

#### Request Headers
> { <br />
    "access_token": "your access token" <br />
> } <br />

#### Request Body
>
_Tidak diperlukan_
>

#### Response (200)
>
    "id": "Task serialized ID",<br />
    "title": "Task title",<br />
    "description": "Task description",<br />
    "status": "Task status",<br />
    "UserId": "User (Owner) ID",<br />
    "organization": "<User (Owner) organization>",<br />
    "createdAt": "Date Sequelize",<br />
    "updatedAt": "Date Sequelize"<br />
 >
 
 #### Response (409)
 >
  "msg": "Tidak ada token terkirim/terdaftar"
 >
 
 ### POST `/login`
##### Mendapatkan akses (token) user dalam database

#### Request Headers
>
    _Tidak diperlukan_ <br />
>

#### Request Body
>
    "email": "Input email user",<br />
    "password": "Input password user"<br />
>

#### Response (200)
>
    "username": "Username yang teregister dalam database",<br />
    "token": "Token User menjadi access ke server",<br />
 >
 
 #### Response (401)
 >
  "msg": "Email/password salah"
 >
 
### POST `/register`
##### Mendapatkan akses (token) user dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "username": "Input username User",<br />
    "email": "Input email User",<br />
    "password": "Input password User"<br />
>

#### Response (200)
>
    "msg": "OK",<br />
 >
 
#### Response (400)
>
 "msg": "Terjadi kesalahan input"
>
 
#### Response (409)
>
 "msg": "Email sudah terdaftar"
>
