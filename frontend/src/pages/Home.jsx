import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h2>Barang Bekas Mahasiswa</h2>
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
      <Link to="/products/add">
        <button style={{ marginTop: 24, padding: '10px 20px' }}>+ Jual Barang</button>
      </Link>
    </div>
  )
}

export default Home