# KANBAN API DOCUMENTATION

## ENDPOINTS
* POST /register
* POST /login
* POST /tasks
* GET /tasks
* PATCH /tasks/:id
* PUT /tasks/:id
* DELETE /tasks/:id

## GLOBAL RESPONSE(500)
* errorCode: "INTERNAL_SERVER_ERROR"

### POST /register
* request header
not needed

* request body
```json
{
    "email": "ivan@hacktiv8.net",
    "password": "12345"
}
```

* response(201)
```json
{
    "id": 10,
    "email": "ivan@hacktiv8.net"
}
```

* response(400)
```json
{
    "message": "email already used",
    "errorCode": "BAD_REQUEST"
}
```

* response(400)
```json
{
    "message": "password need at least 5 characters",
    "errorCode": "BAD_REQUEST"
}
```

### POST /login
* request header
not needed

* request body
```json
{
    "email": "ivan@hacktiv8.net",
    "password": "12345"
}
```

* response(200)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiaXZhbkBoYWNrdGl2OC5uZXQiLCJpYXQiOjE1OTc0MDc4Mjd9.4RosNX2RPWwT0wNHseLgKq8UYJUbg30VdvOzeGWSF_w"
}
```

* response(404)
```json
{
    "message": "invalid email or password",
    "errorCode": "NOT_FOUND"
}
```

### POST /tasks
* request header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiaXZhbkBoYWNrdGl2OC5uZXQiLCJpYXQiOjE1OTc0MDc4Mjd9.4RosNX2RPWwT0wNHseLgKq8UYJUbg30VdvOzeGWSF_w"
}
```

* request body
```json
{
    "title": "kanban component",
    "category": "backlog"
}
```

* response(201)
```json
{
    "title": "kanban component",
    "category": "backlog"
}
```

* response(400)
```json
{
    "message": "title must not empty",
    "errorCode": "BAD_REQUEST"
}
```

* response(403)
```json
{
    "message": "error authentication",
    "errorCode": "FORBIDDEN"
}
```

### GET /tasks
* request header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiaXZhbkBoYWNrdGl2OC5uZXQiLCJpYXQiOjE1OTc0MDc4Mjd9.4RosNX2RPWwT0wNHseLgKq8UYJUbg30VdvOzeGWSF_w"
}
```

* request body
```json
{
    "title": "kanban component",
    "category": "backlog"
}
```

* response(200)
sort by updateAt(descending)
```json
[
    {
        "id": 36,
        "title": "kanban component",
        "category": "backlog",
        "User": {
            "id": 10,
            "email": "ivan@hacktiv8.net",
            "organization": "Hacktiv8"
        }
    },
    {
        "id": 34,
        "title": "test 29",
        "category": "doing",
        "User": {
            "id": 1,
            "email": "otorigami@gmail.com",
            "organization": "Hacktiv8"
        }
    },
    {
        "id": 8,
        "title": "test 3",
        "category": "done",
        "User": {
            "id": 7,
            "email": "ismat@mail.net",
            "organization": "Hacktiv8"
        }
    },
    {
        "id": 6,
        "title": "test 1",
        "category": "done",
        "User": {
            "id": 1,
            "email": "otorigami@gmail.com",
            "organization": "Hacktiv8"
        }
    },
    {
        "id": 1,
        "title": "kanban client 2",
        "category": "doing",
        "User": {
            "id": 1,
            "email": "otorigami@gmail.com",
            "organization": "Hacktiv8"
        }
    },
    {
        "id": 2,
        "title": "kanban component",
        "category": "backlog",
        "User": {
            "id": 7,
            "email": "ismat@mail.net",
            "organization": "Hacktiv8"
        }
    }
]
```

* response(403)
```json
{
    "message": "error authentication",
    "errorCode": "FORBIDDEN"
}
```

### PATCH /tasks/:id
* request header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiaXZhbkBoYWNrdGl2OC5uZXQiLCJpYXQiOjE1OTc0MDc4Mjd9.4RosNX2RPWwT0wNHseLgKq8UYJUbg30VdvOzeGWSF_w"
}
```

* request params
:id = task id

* request body
```json
{
    "category": "todo"
}
```

* response(201)
```json
{
    "title": "kanban component",
    "category": "todo"
}
```

### PUT /tasks/:id
* request header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiaXZhbkBoYWNrdGl2OC5uZXQiLCJpYXQiOjE1OTc0MDc4Mjd9.4RosNX2RPWwT0wNHseLgKq8UYJUbg30VdvOzeGWSF_w"
}
```

* request params
:id = task id

* request body
```json
{
    "title": "kanban component part 2"
}
```

* response(201)
```json
{
    "title": "kanban component part 2",
    "category": "todo"
}
```

* DELETE /tasks/:id
* request header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiaXZhbkBoYWNrdGl2OC5uZXQiLCJpYXQiOjE1OTc0MDc4Mjd9.4RosNX2RPWwT0wNHseLgKq8UYJUbg30VdvOzeGWSF_w"
}
```

* request params
:id = task id

* response(200)
```json
{
    "title": "kanban component part 2",
    "category": "todo"
}
```
