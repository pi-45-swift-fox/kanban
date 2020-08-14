# Kanban

## List of available endpoints

- `POST /Register`
- `POST /Login`
- `GET /Tasks`
- `POST /Tasks`
- `Put /Tasks/:id`
- `Delete /Tasks/:id`




## POST /Register

Request :
- Data

```json
{
    "email" : "string",
    "password" : "string"
}
```

Response : 

- Status : 201
- body : 
```json
{
    "id" : "1",
    "email" : "firaz@hot.id",
}
```

