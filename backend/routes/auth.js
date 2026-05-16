const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    campus
  } = req.body
  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length > 0) {
      return res.status(400).json({
        error: 'Email sudah terdaftar'
      })
    }
    const hashed = await bcrypt.hash(password, 10)
    await db.query(
      'INSERT INTO users (name, email, password, phone, campus) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashed, phone, campus]
    )
    res.json({
      message: 'Registrasi berhasil'
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const {
    email,
    password
  } = req.body
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (rows.length === 0) {
      return res.status(400).json({
        error: 'Email tidak ditemukan'
      })
    }
    const user = rows[0]
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({
        error: 'Password salah'
      })
    }
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET, {
        expiresIn: '7d'
      }
    )
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router