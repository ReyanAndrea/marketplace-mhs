const express = require('express')
const router = express.Router()
const db = require('../config/db')
const { verifyToken } = require('../middleware/auth')

// Get reviews for a product
router.get('/product/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, u.name as reviewer_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ?
      ORDER BY r.created_at DESC
    `, [req.params.id])
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Add review
router.post('/', verifyToken, async (req, res) => {
  const { order_id, product_id, rating, comment } = req.body
  try {
    const [order] = await db.query('SELECT * FROM orders WHERE id = ? AND user_id = ? AND status = "selesai"', [order_id, req.user.id])
    if (order.length === 0) return res.status(400).json({ error: 'Pesanan belum selesai atau bukan milik Anda' })
    
    // Check if already reviewed
    const [exist] = await db.query('SELECT * FROM reviews WHERE order_id = ?', [order_id])
    if (exist.length > 0) return res.status(400).json({ error: 'Sudah diulas' })

    await db.query(
      'INSERT INTO reviews (order_id, product_id, user_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [order_id, product_id, req.user.id, rating, comment]
    )
    res.json({ message: 'Ulasan ditambahkan' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
