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

  if (!product) return <p className="text-center mt-20 text-gray-400">Loading...</p>

  const conditionLabel = (c) => {
    if (c === 'new') return 'Baru'
    if (c === 'like_new') return 'Seperti Baru'
    return 'Bekas'
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Foto Produk */}
      <div className="bg-gray-100 rounded-xl overflow-hidden mb-6 h-72 flex items-center justify-center">
        {product.image ? (
          <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">📦</span>
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
        <span className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{conditionLabel(product.condition)}</span>
      </div>
      <p className="text-blue-500 text-sm mb-4">{product.category_name}</p>
      <p className="text-2xl font-bold text-gray-900 mb-4">Rp {Number(product.price).toLocaleString('id-ID')}</p>
      <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
      <hr className="mb-4" />
      <p className="text-gray-700 mb-4"><span className="font-semibold">Penjual:</span> {product.seller_name}</p>
      <button
        onClick={() => window.open(`https://wa.me/${product.seller_phone}`, '_blank')}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
      >
        Hubungi via WhatsApp
      </button>
    </div>
  )
}

export default ProductDetail