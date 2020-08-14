# kanban
My Kanban App is an application to list your daily todo's. This app has : 
* RESTful endpoint for Todo's CRUD operation
* JSON formatted response
* Technology includes: 
    - Sequelize,
    - Vue js,
    - Express Js, 
    - Postgres, 
    - Bcrypt, 
    - Jason Web Token, 
    - google Authentication, 
    - authentication and authorization.

&nbsp;

## RESTful endpoints

### Global Endpoints
_Response (401 - User not authenticated)_
```
{
  "message": "User not authenticated"
}
```
_Response (500 - Server internal error)_
```
{
  "message": "Server internal error"
}
```

---
### GET /tasks
> Get all task

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<Deadline Challange>",
    "category": "<Backlog>",
    "UserId": "<4>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### GET /tasks/:id
> Get task base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Params_
```
id : < integer value >
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 1,
    "title": "<Deadline Challange>",
    "category": "<Backlog>",
    "UserId": "<4>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "todos not found"
}
```

---
### POST /tasks
> Create new task

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
{
    "title": "<Deadline Challange>",
    "category": "<Backlog>",
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "title": "<Deadline Challange>",
    "category": "<Backlog>",
    "UserId": "<4>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

---
### PUT /tasks/:id
> Get task base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Params_
```
id : < integer value >
```

_Request Body_
```
{
   "title": "<Deadline Challange>",
   "category": "<Backlog>",
}
```

_Response (200)_
```
{
    "id": 1,
    "title": "<Deadline Challange Edit>",
    "category": "<Backlog Edit>",
    "UserId": "<4>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (403 - Bad Request)_
```
{
  "message": "Forbidden Access"
}
```

_Response (404 - Bad Request)_
```
{
  "message": "Data not foud"
}
```

---
### DELETE /tasks/:id
> Delete task with selected id

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```

{
    "id": 1,
    "title": "<Deadline Challange Edit>",
    "category": "<Backlog Edit>",
    "UserId": "<4>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (403 - Bad Request)_
```
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /login
> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<baril@gmail.com>",
  "password": "<12345>"
}
```

_Response (200)_
```
{
  "access_token": "<access_token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /register
> Register User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<baril@gmail.com>",
  "password": "<12345>"
}
```

_Response (201)_
```
{
  "id": 1,
  "email": "baril@gmail.com",
  "password": "$2b$10$Eq03uiQCB86/IxvwEiQlYuL/4zavUfMqZm8dGKRsoDvvREzVKhaiy",
  "organization": "Hacktiv8",
  "updatedAt": "2020-07-06T13:01:52.682Z",
  "createdAt": "2020-07-06T13:01:52.682Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /googleSignin
> Login User with validate Google

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token" : "<id_token from google>" 
}
```

_Response (201)_
```
{
  "access_token": "<access_token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```