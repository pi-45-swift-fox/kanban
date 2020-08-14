## Kanban Board
    Kanban Board App is an application to manage your team tasks with 4 different stages/categories . This app has:

    * RESTful endpoint for Knaban CRUD Operation
    * Used Technology :
    * Express Js,
    * Sequelize,
    * Postgres,
    * Json Web Token,
    * Bcrypt,
    * Vue JS
    * Google Authentication,
    * JSON Formated Response

### RESTful endpoints
---
### Global endpoints

__Response (401 - Unauthorized)__
``
    {
        "message": "Not authroized to do the actions"
    }
``
---
__Response (500 - Error)__
 ```  
     {
        "message": "internal server error"
    }
```

---
### GET /kanbans
Get all kanbans

__Request Header__
```
    {
        "access_token": "<access_token>"
    }
```
__Request Body__
```
    {
        not needed
    }
```
__Response (200)__
```
[
    {
        "id": "<show id data>",
        "title": "<show title data>",
        "description": "<show description data>",
        "tag": "<show tag data>"
        "UserId": "<show UserId data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    },
    {
        "id": "<show id data>",
        "title": "<show title data>",
        "description": "<show description data>",
        "tag": "<show tag data>"
        "UserId": "<show UserId data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    }, ...
]
```
Response (400 - Bad Request)
```
    {
     "message": "Invalid request"
    }
```
Response (401 - Not Found)
```
    {
        "message": "data not found"
    }
```
### GET /kanbans/:id
Get selected kanbans base on selected kanban

__Request Header__
```
    {
        "access_token": "<access_token>"
    }
```
__Request Parameter__
```
    {
        "id": "<selected kanban id>"
    }
```
__Request Body__
```
    - not needed
```
__Response (200)__
```
{
    "id": "<show id by requested id>",
    "title": "<show title by requested id>",
    "description": "<show description by requested id>",
    "tag": "<show tag by requested id>"
    "UserId": "<show UserId by requested id>",
    "createdAt": "<show createdAt by requested id>",
    "updatedAt": "<show updatedAt by requested id>"
}
```
__Response (400 - Bad Request)__
```
    {
        "message": "Invalid request"
    }
```
__Response (404 - Not Found)__
```
    {
        "message": "data not found"
    }
```
### POST /kanbans
Create new kanban

__Request Header__
```
    {
        "access_token": "<access_token>"
    }
```
__Request Body__
```
    {
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    }
```
__Response (201)__
```
    {
        "id": <given id by system>,
        "title": "<title to get insert into>",
        "description": "<description to get insert into>",
        "tag": "<default tag is backlog>"
        "UserId": "<UserId from login user>",
        "createdAt": "<createdAt to get insert into>",
        "updatedAt": "<updatedAt to get insert into>"
    }
```
__Response (400 - Bad Request)__
```
    {
        "message": "Please Fill All Fields"
    }
```
## PUT /kanbans/:id
Update existing kanban on selected kanban Id

__Request Header__
```
    {
        "access_token": "<access_token>"
    }
```
__Request Parameter__
```
    {
        "id": "<selected kanban id>"
    }
```
__Request Body__
```
    {
        "title": "<title to get update into>",
        "description": "<description to get update into>",
    }
```
__Response (200)__
```
    {
        "id": "<id to get update into>",
        "title": "<title to get update into>",
        "description": "<description to get update into>",
        "tag": "<description to get update into>"
        "UserId": "<UserId from login user>",
        "createdAt": "<createdAt to get update into>",
        "updatedAt": "<updatedAt to get update into>"
    }
```
__Response (400 - Bad Request)__
```
    {
    "message": "Please Fill All Fields"
    }
```
__Response (404 - Not Found)__
```
    {
        "message": "data not found"
    }
```
## DELETE /kanbans/:id
Delete kanban for Selected Id

__Request Header__
```
    {
        "access_token": "<access_token>"
    }
```
__Request Body__
```
    - not needed
```
__Response (200)__
```
    {
        "id": "<contain id that deleted>",
        "title": "<contain title that deleted>",
        "description": "<contain description that deleted>",
        "tag": "<contain description that deleted>"
        "UserId": "<contain UserId that deleted>",
        "createdAt": "<contain createdAt that deleted>",
        "updatedAt": "<contain updatedAt that deleted>"
    }
```
__Response (404 - Not Found)__
```
    {
    "message": "data not found"
    }
```
## POST /login
Login User

__Request Header__
```
    - not needed
```
__Request Body__
```
    {
    "email": "<email to get login>",
    "password": "<password to get login>"
    }
```
__Response (200)__
```
    {
        "access_token": "<access_token>"
        "id": "<user id>"
    }
```
__Response (404 - Not Found)__
```
    {
        "message": "data not found"
    }
```
## POST /register
Register User

__Request Header__
```
    - not needed
```
__Request Body__
```
    {
    "email": "<email to get register into>",
    "password": "<password to get register into>"
    }
```
__Response (201)__
```
    {
        "id": "<id given by system>",
        "email": "<contain email result register>",
        "password": "<contain hashed password result register>",
        "organization": "<value setted to Hacktiv8>",
        "updatedAt": "<contain updatedAt result register>",
        "createdAt": "<contain createdAt result register>"
    }
```
__Response (404 - Not Found)__
```
    {
    "message": "data not found"
    }
```
## POST /googleLogin
Login User with Google Sign in, if not registered, then do register user aswell

__Request Header__
```
   - not needed
```
__Request Body__
```
    {
        "id_token" : "<id_token from google>" 
    }
```
__Response (200)__
```
    {
        "access_token": "<access_token JWT>"
    }
```
__Response (404 - Not Found)__
```
    {
        "message": "data not found"
    }
```