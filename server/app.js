if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const Middleware = require('./middleware/Middleware')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.use(Middleware.errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
