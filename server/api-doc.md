# Kanban

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /loginGoogle`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`


### POST /register

Request:

- data:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "id": 5,
    "name": "grace",
    "email": "grace@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6ImdyYWNlIiwiZW1haWwiOiJncmFjZUBnbWFpbC5jb20iLCJvcmdhbml6YXRpb24iOiJIYWNrdGl2OCIsImlhdCI6MTU5NzIyODk2MX0.6lzabSvN4DxsoDxZUVapWNH3Yi_Lp7h6fK78voYjtDs"
}
```

- status: 400
```json
{
    "message": [
        "Please input name to proceed",
        "Please input email to proceed",
        "Validation notEmpty on password failed"
    ]
}
```
- status:401
```json
{
    "message": "Your email is already registered"
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkdyYWNlIiwiZW1haWwiOiJncmFjZWNvcmluZTYwQGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6IkhhY2t0aXY4IiwiaWF0IjoxNTk3MjI5MDQ4fQ.7CGCBeN2v2t-0DjhgvBrYN7c4y1f8m3Mb0P5OkDjm1w"
}
```

- status: 401

```json
{
    "message": "Invalid password or email"
}
```

### POST /loginGoogle

Request:

- data:

```json
{
  "google_token" : "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkdyYWNlIiwiZW1haWwiOiJncmFjZWNvcmluZTYwQGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6IkhhY2t0aXY4IiwiaWF0IjoxNTk3MjI5MDQ4fQ.7CGCBeN2v2t-0DjhgvBrYN7c4y1f8m3Mb0P5OkDjm1w"
}
```


### GET /tasks

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkdyYWNlIiwiZW1haWwiOiJncmFjZWNvcmluZTYwQGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6IkhhY2t0aXY4IiwiaWF0IjoxNTk3MjI5MDQ4fQ.7CGCBeN2v2t-0DjhgvBrYN7c4y1f8m3Mb0P5OkDjm1w"
}
```

Response:

- status: 200
- body:
  ​

```json
[
    {
        "id": 2,
        "title": "Learning CSS",
        "category": "todo",
        "UserId": 4,
        "createdAt": "2020-08-12T15:49:45.448Z",
        "updatedAt": "2020-08-12T15:49:45.448Z"
    },
    ...
]
```

- status: 401

```json
{
    "message": "Invalid password or email"
}
```


### POST /tasks

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkdyYWNlIiwiZW1haWwiOiJncmFjZWNvcmluZTYwQGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6IkhhY2t0aXY4IiwiaWF0IjoxNTk3MjI5MDQ4fQ.7CGCBeN2v2t-0DjhgvBrYN7c4y1f8m3Mb0P5OkDjm1w"
}
```

- body:

```json
{
  "title": "string",
  "category": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "New Task": {
        "id": 2,
        "title": "Learning CSS",
        "category": "todo",
        "UserId": 4,
        "updatedAt": "2020-08-12T15:49:45.448Z",
        "createdAt": "2020-08-12T15:49:45.448Z"
    }
}
```

- status: 401

```json
{
    "message": "Please login first"
}
```

- status: 400
```json
{
    "message": [
        "Please input task title to proceed",
        "Please input task category to proceed"
    ]
}
```


### PUT /tasks

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkdyYWNlIiwiZW1haWwiOiJncmFjZWNvcmluZTYwQGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6IkhhY2t0aXY4IiwiaWF0IjoxNTk3MjI5MDQ4fQ.7CGCBeN2v2t-0DjhgvBrYN7c4y1f8m3Mb0P5OkDjm1w"
}
```

- params :

```json
{
  "id":"<task's id>"
}
```

- body:

```json
{
  "title": "string",
  "category": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "updatedTask": [
        {
            "id": 3,
            "title": "mamanjat",
            "category": "doing",
            "UserId": 3,
            "createdAt": "2020-08-12T16:31:12.382Z",
            "updatedAt": "2020-08-12T16:47:03.817Z"
        }
    ]
}
```

- status: 401

```json
{
    "message": "Please login first"
}
```

- status: 400
```json
{
    "message": [
        "Please input task title to proceed",
        "Please input task category to proceed"
    ]
}
```

- status: 403
```json
{
    "message": "Not allowed"
}
```

### DELETE /tasks

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkdyYWNlIiwiZW1haWwiOiJncmFjZWNvcmluZTYwQGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6IkhhY2t0aXY4IiwiaWF0IjoxNTk3MjI5MDQ4fQ.7CGCBeN2v2t-0DjhgvBrYN7c4y1f8m3Mb0P5OkDjm1w"
}
```

- params :

```json
{
  "id":"<task's id>"
}
```


Response:

- status: 200
- body:
  ​

```json
{
    "message": "Delete completed"
}
```

- status: 401

```json
{
    "message": "Please login first"
}
```
