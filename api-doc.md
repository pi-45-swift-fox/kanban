# KANBAN APPS

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `post /googleLogin`
- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

### POST /register

- Request Header
    Not required.
​
- Request Body
​
```json
    {
        "email": "goku@gmail.com",
        "password": "123"
    }
 ```
​
- Response 201: Created
```json
{
    "token": "<token>"
}
```
​
- Response 400: Bad Request
```json
    {
        "type": "Bad Request",
        "errors": [
            {
                "message": "Please input valid email"
            }
        ]
    }
```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /login
​
- Request Header
    Not required.
​
- Request Body
```json
    {
        "email": "conan@gmail.com",
        "password": "1234567"
    }
```
​
- Response 200: OK
```json
    {
        "token": "<token>"
    }
```
​
- Response 400: Bad Request
```json
    {
        "msg": "email or password is incorrect!"
    }
```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /googleLogin
​
- Request Header
    Not required.
​
- Request Body
```json
    {
        "email": "<user's email>",
        "password": "<user's password>"
    }
```
​
- Response 200: OK
```json
    { 
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiYWRuYW5rYW1pbDI3QGdtYWlsLmNvbSIsImlhdCI6MTU5Njg1NzM1MX0._0gBOnqsZuju4tA40yLTX7OICljOzf7NsIPI_pWAeeA" 
    }
```
​
- Response 400: Bad Request
```json
    {
        "message": "Invalid email/password"
    }

```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /tasks
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
```json
    {
        "title": "introgasi",
        "category": "backlog"
    }
```
​
- Response 200: OK
```json
    {
        "msg": "New Task Create"
    }
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### GET /tasks
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
[
    {
        "id": 25,
        "title": "latihan sama shunlong",
        "category": "todo",
        "UserId": 12,
        "createdAt": "2020-08-14T13:20:23.973Z",
        "updatedAt": "2020-08-14T13:20:23.973Z",
        "User": {
            "id": 12,
            "email": "goku@gmail.com",
            "password": "$2b$10$rXH1zxdfBt9I.4mXl6lBj.aUsYkZjIdew83jjI5ITQebS7E5wkQSy",
            "organization": "Hacktiv8",
            "createdAt": "2020-08-14T13:13:49.524Z",
            "updatedAt": "2020-08-14T13:13:49.524Z"
        }
    }
]
]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### PUT /tasks/:id
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
```json
    {
        "title": "latihan",
        "category": "done"
    }
```
​
- Response 200: OK
```json
    {
        "editTask": {
            "title": "latihan",
            "category": "done"
        }
    }
```

- Response 401: Not Authorized
```json
    {
        "msg": "Not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### DELETE /tasks/:id
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
    {
        "msg": "task delete"
    }
```

- Response 401: Not Authorized
```json
    {
        "msg": "Not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```