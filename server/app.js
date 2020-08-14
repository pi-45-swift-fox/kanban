const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const route = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(route)

app.listen(port, () => {
    console.log('app running');
})