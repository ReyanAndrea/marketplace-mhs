const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'API jalan bre!'
  })
})

const productRoutes = require('./routes/products')
app.use('/api/products', productRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server nyala di port ${process.env.PORT}`)
})