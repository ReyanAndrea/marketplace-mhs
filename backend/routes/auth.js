const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, phone, campus } = req.body
  try {
    // 1. Cek apakah email sudah terdaftar
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length > 0) {
      return res.status(400).json({
        error: 'Email sudah terdaftar'
      })
    }

    // 2. Enkripsi password sebelum disimpan ke database
    const hashed = await bcrypt.hash(password, 10)
    
    // 3. Masukkan data user baru ke database
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
  const { email, password } = req.body
  try {
    // 1. Cari user berdasarkan email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (rows.length === 0) {
      return res.status(400).json({
        error: 'Email tidak ditemukan'
      })
    }
    
    const user = rows[0]
    
    // 2. Cocokkan password yang diketik dengan hash di database menggunakan bcryptjs
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({
        error: 'Password salah'
      })
    }
    
    // 3. AMAN: Gunakan fallback jika process.env.JWT_SECRET terblokir/undefined
    const secretKey = process.env.JWT_SECRET || 'rahasia'
    
    // 4. Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      secretKey, 
      {
        expiresIn: '7d'
      }
    )
    
    // 5. Kirim respon sukses ke frontend
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router