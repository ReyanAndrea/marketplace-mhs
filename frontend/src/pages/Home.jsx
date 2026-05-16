import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const fetchProducts = () => {
    const params = {}
    if (search) params.search = search
    if (categoryId) params.category_id = categoryId

    axios.get('http://localhost:5000/api/products', { params })
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [categoryId])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts()
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h2>Barang Bekas Mahasiswa</h2>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, flex: 1 }}>
          <input
            type="text"
            placeholder="Cari barang..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Cari</button>
        </form>
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
        >
          <option value="">Semua Kategori</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Produk Grid */}
      {products.length === 0 && <p>Belum ada produk bre.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {products.map(p => (
          <Link to={`/products/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
              <h4 style={{ margin: '0 0 8px' }}>{p.title}</h4>
              <p style={{ margin: '0 0 4px', color: '#666', fontSize: 13 }}>{p.category_name}</p>
              <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>Rp {Number(p.price).toLocaleString('id-ID')}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{p.condition} · {p.seller_name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home