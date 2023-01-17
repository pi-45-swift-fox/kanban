# Kanban
Create a website for task management

# Guide
## Endpoints
### Get `/`
##### Get Logged In User Tasks

#### Request Headers
>
     "Access_token": "Your Access Token"
>
#### Request Body
>
     _Not required_
>
#### Response (200)
>
     "id": "task serialized id",
     "title": "task title",
     "Description": "Task Description",
     "Status": "Task Status",
     "UserID": "User (Owner) ID",
     "Organization": "User (Owner) Organization",
     "Createdat": "Date Sequelize",
     "Updated": "Date Sequelize"
  >
 
  #### Response (409)
  >
   "MSG": "There is no token sent/registered"
  >
### Post `/Login '
##### Get User Access (Token) in Database

#### Request Headers
>
     _Not required_
>
#### Request Body
>
     "Email": "Input Email User",
     "Password": "Input User Password"
>
#### Response (200)
>
     "Username": "Username which is registered in the database",
     "token": "user token for access to server"
  >
 
  #### Response (401)
  >
   "Msg": "False Email/Password"
  >
### Post '/Register'
##### Register user data into the database

#### Request Headers
>
     _Not required_
>
#### Request Body
>
     "Username": "User Username Input",
     "Email": "Input Email User",
     "Password": "Input User Password"
>
#### Response (200)
>
     "MSG": "OK"
  >
 
#### Response (400)
>
  "MSG": "Input error occurs"
>
 
#### Response (409)
>
  "MSG": "Email is registered"
>
### Post '/Google-Login'
##### Get User Access (Token) in Database Through Google

#### Request Headers
>
     _Not required_
>
#### Request Body
>
     "Username": "User Username Input",
     "Email": "Input Email User",
     "Password": "Input User Password"
>
#### Response (200)
>
     "Username": "Username which is registered in the database",
     "token": "user token for access to server"
>
### POST `/TASKS`
##### added a new task to the database according to the user who is logged in

#### Request Headers
>
     "Access_Token": "Token Provided from Client"
>
#### Request Body
>
     "title": "task title",
     "Description": "Task Description",
     "Status": "Task Status"
>
#### Response (201)
>
     "id": "task serialized id",
     "Title": "Task Title (New)",
     "Description": "Task Description (New)",
     "Status": "Task Status (New)",
     "UserID": "User (Owner) ID",
     "Organization": "User (Owner) Organization",
     "Createdat": "current date",
     "Updated": "current date"
>
#### Response (400)
>
     "MSG": "Input error occurs"
>
#### Response (409)
>
     "MSG": "There is no token sent/registered"
>
### PUT `/TASKS/ID`
##### Editing the task in the database according to the user who is logged in

#### Request Headers
>
     "Access_Token": "Token Provided from Client"
>
#### Request Body
>
     "title": "task title",
     "Description": "Task Description",
     "Status": "Task Status"
>
#### Response (201)
>
     "MSG": "OK"
>
#### Response (400)
>
     "MSG": "Input error occurs"
>
#### Response (404)
>
     "MSG": "Task not found"
>
#### Response (409)
>
     "MSG": "There is no token sent/registered"
>
### Delete `/Tasks/ID`
##### Remove the task in the database according to the user who is logged in

#### Request Headers
>
     "Access_Token": "Token Provided from Client"
>
#### Request Body
>
     _No need_
>
#### Response (200)
>
     "MSG": "OK"
>
#### Response (404)
>
     "MSG": "Task not found"
>
#### Response (409)
>
     "MSG": "There is no token sent/registered"
>
