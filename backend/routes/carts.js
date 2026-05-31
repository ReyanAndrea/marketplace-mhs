const express = require('express')
const router = express.Router()
const db = require('../config/db')
const { verifyToken } = require('../middleware/auth')

// Get Cart
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, p.title, p.price, p.stock, u.name as seller_name,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
      FROM carts c
      JOIN products p ON c.product_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE c.user_id = ?
    `, [req.user.id])
    res.json(rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Add to Cart
router.post('/', verifyToken, async (req, res) => {
  const { product_id, quantity } = req.body
  try {
    const [product] = await db.query('SELECT stock FROM products WHERE id = ?', [product_id])
    if (product.length === 0 || product[0].stock < quantity) {
      return res.status(400).json({ error: 'Stok tidak mencukupi' })
    }
    const [existing] = await db.query('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [req.user.id, product_id])
    if (existing.length > 0) {
      await db.query('UPDATE carts SET quantity = quantity + ? WHERE id = ?', [quantity, existing[0].id])
    } else {
      await db.query('INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)', [req.user.id, product_id, quantity])
    }
    res.json({ message: 'Dimasukkan ke keranjang' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Remove
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM carts WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
    res.json({ message: 'Dihapus dari keranjang' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
