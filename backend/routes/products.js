const express = require('express')
const router = express.Router()
const db = require('../config/db')
const upload = require('../middleware/upload')

// GET semua produk dengan search & filter
router.get('/', async (req, res) => {
  const {
    search,
    category_id
  } = req.query
  try {
    let query = `
      SELECT p.*, u.name as seller_name, c.name as category_name,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
      FROM products p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'available'
    `
    const params = []

    if (search) {
      query += ` AND (p.title LIKE ? OR p.description LIKE ?)`
      params.push(`%${search}%`, `%${search}%`)
    }

    if (category_id) {
      query += ` AND p.category_id = ?`
      params.push(category_id)
    }

    query += ` ORDER BY p.created_at DESC`

    const [rows] = await db.query(query, params)
    res.json(rows)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// GET detail produk by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, u.name as seller_name, u.phone as seller_phone, c.name as category_name,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
      FROM products p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [req.params.id])
    if (rows.length === 0) return res.status(404).json({
      error: 'Produk tidak ditemukan'
    })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// POST tambah produk + upload foto
router.post('/', upload.single('image'), async (req, res) => {
  const {
    user_id,
    category_id,
    title,
    description,
    price,
    condition
  } = req.body
  try {
    const [result] = await db.query(`
      INSERT INTO products (user_id, category_id, title, description, price, \`condition\`)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [user_id, category_id, title, description, price, condition])

    const productId = result.insertId

    if (req.file) {
      await db.query(
        'INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, 1)',
        [productId, req.file.filename]
      )
    }

    res.json({
      message: 'Produk berhasil ditambahkan',
      id: productId
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router