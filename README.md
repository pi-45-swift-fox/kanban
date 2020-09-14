# kanban
Membuat website untuk manajemen task

heroku = https://kanban-app-gacor.herokuapp.com/
firebase = https://kanban-app-9687b.web.app/

## RESTful endpoints
List of available endpoint:

  - `POST /dashboard`
  - `GET /dashboard`
  - `PUT /dashboard/:id`
  - `DELETE /dashboard/:id`
  - `POST /register`
  - `POST /login`


### POST /dashboard
_Request headers_
```json
{
  "accesstoken": "<accesstoken>"
}
```

_Request Body_
```json
  {
    "title": "string",
    "description": "string",
    "category": "string",
    "UsersId": "integer"
  }

```

_Response (201 - Created)_
```json
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "category": "string",
    "UsersId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "Title is empty"
  },
  {
    "message": "Description is empty"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### GET /dashboard
_Request headers_
```json
{
  "accesstoken": "<accesstoken>"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "title": "makan",
    "description": "makan ayam",
    "category": "backlog",
    "UsersId": 1
  },
  {
    "id": 2,
    "title": "minum",
    "description": "minum air",
    "category": "done",
    "UsersId": 2
  },
  {
    "id": 3,
    "title": "makan",
    "description": "makan sosis",
    "category": "completed",
    "UsersId": 1
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT /dashboard/:id
_Request headers_
```json
{
  "accesstoken": "<accesstoken>"
}
```

_Request Body_
```json
  {
    "title": "string",
    "description": "string",
    "category": "string",
    "UsersId": "integer"
  }

```

_Response (200 - OK)_
```json
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "category": "string",
    "UsersId": 1,
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "Title is empty"
  },
  {
    "message": "Description is empty"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### DELETE /dashboard/:id
_Request headers_
```json
{
  "accesstoken": "<accesstoken>"
}
```

_Response (200 - OK)_
```json
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "category": "string",
    "UsersId": 1,
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### POST /register

_Request Body_
```json
  {
    "email": "string",
    "password": "string",
    "organization": "string"
  }

```

_Response (201 - Created)_
```json
  {
    "id": "integer",
    "email": "string",
    "password": "string",
    "organization": "string"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "You don't put any password"
  },
  {
    "message": "You don't put any email"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### POST /login

_Request Body_
```json
  {
    "email": "string",
    "password": "string"
  }

```

_Response (200 - OK)_
```json
  {
    "accesstoken": "<accesstoken>"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "You don't put any password"
  },
  {
    "message": "You don't put any email"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
