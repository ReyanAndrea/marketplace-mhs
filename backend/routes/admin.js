const express = require('express')
const router = express.Router()
const db = require('../config/db')
const {
  verifyToken,
  verifyAdmin
} = require('../middleware/auth')

// GET semua produk (termasuk sold & inactive)
router.get('/products', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, u.name as seller_name, c.name as category_name
      FROM products p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `)
    res.json(rows)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// GET semua user
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, phone, campus, role, created_at FROM users')
    res.json(rows)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// DELETE produk
// DELETE produk
router.delete('/products/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Hapus product_images dulu
    await db.query('DELETE FROM product_images WHERE product_id = ?', [req.params.id])

    // Baru hapus produknya
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id])

    res.json({
      message: 'Produk berhasil dihapus'
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// DELETE user
router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Hapus product_images dulu
    await db.query(`
      DELETE pi FROM product_images pi
      JOIN products p ON pi.product_id = p.id
      WHERE p.user_id = ?
    `, [req.params.id])

    // Hapus products milik user
    await db.query('DELETE FROM products WHERE user_id = ?', [req.params.id])

    // Baru hapus usernya
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id])

    res.json({
      message: 'User berhasil dihapus'
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router