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
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/categories')
const adminRoutes = require('./routes/admin')

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/admin', adminRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server nyala di port ${process.env.PORT}`)
})