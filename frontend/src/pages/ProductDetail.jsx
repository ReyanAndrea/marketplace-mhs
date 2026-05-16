import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
  }, [id])

  if (!product) return <p style={{ textAlign: 'center', marginTop: 80 }}>Loading...</p>

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
      <h2>{product.title}</h2>
      <p style={{ color: '#666' }}>{product.category_name} · {product.condition}</p>
      <h3>Rp {Number(product.price).toLocaleString('id-ID')}</h3>
      <p>{product.description}</p>
      <hr />
      <p><strong>Penjual:</strong> {product.seller_name}</p>
      <button
        onClick={() => window.open(`https://wa.me/${product.seller_phone}`, '_blank')}
        style={{ padding: '10px 20px', background: '#25D366', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
      >
        Hubungi via WhatsApp
      </button>
    </div>
  )
}

export default ProductDetail