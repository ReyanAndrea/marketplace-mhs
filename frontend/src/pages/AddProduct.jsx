import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
  const [form, setForm] = useState({ category_id: '', title: '', description: '', price: '', condition: 'used' })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return setError('Silakan login dulu')
    try {
      await axios.post('http://localhost:5000/api/products', { ...form, user_id: user.id })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal menambahkan produk')
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', padding: '0 20px' }}>
      <h2>Jual Barang</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <select name="category_id" value={form.category_id} onChange={handleChange} style={{ width: '100%', padding: 10 }} required>
            <option value="">Pilih Kategori</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="title" placeholder="Nama Barang" value={form.title} onChange={handleChange} style={{ width: '100%', padding: 10, boxSizing: 'border-box' }} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <textarea name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} style={{ width: '100%', padding: 10, boxSizing: 'border-box', minHeight: 100 }} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input name="price" type="number" placeholder="Harga (Rp)" value={form.price} onChange={handleChange} style={{ width: '100%', padding: 10, boxSizing: 'border-box' }} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <select name="condition" value={form.condition} onChange={handleChange} style={{ width: '100%', padding: 10 }}>
            <option value="new">Baru</option>
            <option value="like_new">Seperti Baru</option>
            <option value="used">Bekas</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: 10 }}>Posting Barang</button>
      </form>
    </div>
  )
}

export default AddProduct