#KANBAN

## POST /login
### request
- body
```json
{
    email:"anton@mail.com",
    password:"123456"
}
```
### response 200
- body
```json
{
    access_token :"iwejij323ji3jf"
}
```
### response 400
- body
```json
{
    message:"User or Password Incorrect"
}
```

### response 500
- body
```json
{
    message:"internal server error"
}
```
## POST /regis

### request
- body
```json
{
    email:"anton@mail.com",
    password:"123456"
}
```
### response 201
- body
```json
{
    access_token :"iwejij323ji3jf"
}
```
### response 500
- body
```json
{
    message:"internal server error"
}
```

## POST /googlesignin
### request
- body
```json
{
    id_token = "wijfoi23fj2o3ifj2o3ijfi"
}
```

### response 200
- body
```json
{
    access_token :"iwejij323ji3jf"
}
```
### response 400
- body
```json
{
    message:"Google Oauth trouble"
}
```

### response 500
- body
```json
{
    message:"internal server error"
}
```
## GET /task
### request
- body
```json
{
    access_token:"ijoidj2o3idj2oi3jd"
}
```
### response 200
- body
```json
{
    title:"test",
    category:"backlog",
    UserId:1,    
}
```
### response 500
- body
```json
{
    message:"internal server error"
}
```

## POST /task
### request
- body
```json
{
  title:"test3".
  category:"backlog",
  UserId:2
}
```
### response 201
- body
```json
{
    message:"task berhasil di tambahkan
}
```
### response 500
- body
```json
{
    message:"internal server error"
}
```
## GET /task/:id
### request
- params
```json
{    
    id:1
}
```
### response 200
- body
```json
{
  title:"test3".
  category:"backlog",
  UserId:2
}
```
### response 500
- body
```json
{
    message:"internal server error"
}
```



## PUT /task/:id
### request
- params
```json
{
    id:1
}
```
### response 200
- body 
```json
{
  message:"task berhasil di edit"
}
```
### response 500
- body
```json
{
    message:"internal server error"
}
```

## delete /task:id
### request
- params
```json
{
    id:1
}
```
### response 200
- body 
```json
{
  message:"task berhasil di delete"
}
```
### response 500
- body
```json
{
    message:"internal server error"
}
```