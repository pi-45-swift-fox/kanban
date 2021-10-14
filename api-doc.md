
# kanban
Membuat App tentang hal - hal keren yang bisa dilakukan

kanban App is an application to manage your best work will be do. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Technology Includes : 
    - 3rd Party API = Google Sign In API
    - Authentication & Authorization
    - Express Js(Node Js Framework)
    - Object-relation-mapping : Sequelize
    - Database: Postgres
    - Token Signing/verification: Json Web Token
    - Password Encryption: Bcrypt

## RESTful endpoints
### POST /register
### POST /login
### POST /google-login
### POST /kanban
### GET /kanban
### GET /kanban/:id
### PUT /kanban/:id
### DELETE /kanban/:id

Global endpoints

response(401 - Not Authenticated)
``` json 
{
    "message" : "Not Not Authenticated"
}
```
response(401 - Not Authorized)
``` json 
{
    "message" : "Not Not Authorized"
}
```

response(500 - Server Internal Error)
``` json 
{
    "message" : "Invalid Server"
}
```
### POST /register
> Register User

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

Response :

Success: 

status : 201
``` json
{
    "Account with ${email to get insert into} Created"
}

Failed :

status : 404
{
  "message": "Invalid Request"
}
```

### POST /login
> Login User

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

Response :

Success: 

status : 200
``` json
{
    "acces_token" : "jwttoken"
}

Failed :

status : 404
{
  "message": "Invalid Request"
}
```
### POST /goggle-login

> Delete a todo by id
_Request Header_
``` json
{
  "accept": "application/json"
}
```
_Request params_
```json
{
  "not needed"
}
```
_Request Body_
``` json
{
  "not_needed"
}


Response :

Success: 

status : 200
``` json
[
  {
    "object account"
    
  },
  "..."

]

Failed :

status : 500
{
  "message": "Invalid Server"
}
```

### POST /kanban

> Create new kanban

_Request Header_
``` json
{
  "access_token" : "jwttoken"
}

_Request Body_
``` json
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
}
```

Response :

Success: 

status : 201
``` json

{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```
### GET /kanban
> Get all kanban

_Request Header_
``` json
{
  "Token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
    "UserId": "<get by user login>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
``` json
{
  "message": "Invalid Request"
}
```
---
### GET /kanban/:id

> Get a todo by id
_Request Header_
``` json
{
  "Token" : "jwttoken"
}
```
_Request body_
```json
{
  "not needed" 
}

_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json

{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
    "UserId": "<get by user login>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}


Failed :

status : 404
{
  "message": "Error Not Found"
}
```

### PUT /kanban/:id

> Update or replace a todo by id


_Request Header_
``` json
{
  "Token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "id" : "<given id by selected>",
  "title": "<title to get insert into>",
  "category": "<category to get insert into>"
}
```

Response :

Success: 

status : 201
``` json
{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
    "UserId": "<get by user login>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```
### DELETE /kanban/:id

> Delete a todo by id
_Request Header_
``` json
{
  "Token" : "jwttoken"
}
```
_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json
{
  "message": "Sukses Delete"
}

Failed :
status : 401
``` json 
{
    "message" : "Not Not Authorized"
}

status : 404
{
  "message": "Error Not Found"
}
```





