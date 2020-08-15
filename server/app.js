require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const routes = require('./Routes')
const errorHandler = require('./Middlewares/ErrorHandler')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

console.log(process.env.SECRET)
app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})

// gw bau sampe login