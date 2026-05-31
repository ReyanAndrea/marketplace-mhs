const express = require('express')
const router = express.Router()
const db = require('../config/db')
const { verifyToken } = require('../middleware/auth')

// Buat pesanan (checkout)
router.post('/', verifyToken, async (req, res) => {
  const { items, payment_method } = req.body // items = [{product_id, quantity, seller_id, price}]
  try {
    for (let item of items) {
      // Kurangi stok
      await db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id])
      // Buat order
      await db.query(
        'INSERT INTO orders (user_id, product_id, seller_id, quantity, total_price, payment_method) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, item.product_id, item.seller_id, item.quantity, item.price * item.quantity, payment_method]
      )
    }
    // Hapus cart user jika dari cart (opsional, bisa frontend hit delete cart)
    await db.query('DELETE FROM carts WHERE user_id = ?', [req.user.id])
    res.json({ message: 'Pesanan berhasil dibuat' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Get orders milik user
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.*, p.title, u.name as seller_name,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
      FROM orders o
      JOIN products p ON o.product_id = p.id
      JOIN users u ON o.seller_id = u.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `, [req.user.id])
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Get orders masuk untuk seller
router.get('/incoming', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.*, p.title, u.name as buyer_name, u.phone as buyer_phone,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
      FROM orders o
      JOIN products p ON o.product_id = p.id
      JOIN users u ON o.user_id = u.id
      WHERE o.seller_id = ?
      ORDER BY o.created_at DESC
    `, [req.user.id])
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Update status pesanan (seller only)
router.put('/:id/status', verifyToken, async (req, res) => {
  const { status } = req.body
  try {
    const [order] = await db.query('SELECT * FROM orders WHERE id = ? AND seller_id = ?', [req.params.id, req.user.id])
    if (order.length === 0) return res.status(403).json({ error: 'Bukan pesanan untuk toko Anda' })
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id])
    res.json({ message: 'Status diperbarui' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
