import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[#F4F4F0]">
      <div className="text-3xl font-black border-4 border-black px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white animate-pulse">
        LOADING...
      </div>
    </div>
  )

  if (!product) return (
    <div className="flex justify-center items-center h-screen bg-[#F4F4F0]">
      <div className="text-3xl font-black border-4 border-black px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-400 text-black">
        PRODUCT NOT FOUND
      </div>
    </div>
  )

  const conditionLabel = (c) => {
    if (c === 'new') return 'BARU'
    if (c === 'like_new') return 'SEPERTI BARU'
    return 'BEKAS'
  }

  return (
    <div className="min-h-screen bg-[#F4F4F0] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 px-6 py-2 bg-white border-4 border-black font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
        >
          &larr; KEMBALI
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="bg-white border-4 border-black p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="aspect-square bg-[#E8E8E8] border-4 border-black overflow-hidden flex items-center justify-center relative">
              {product.image ? (
                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-8xl font-black text-black opacity-10">NO IMG</span>
              )}
              <div className="absolute top-4 right-4 bg-[#FFE800] border-4 border-black px-4 py-1 font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
                {conditionLabel(product.condition)}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="bg-[#00E5FF] border-4 border-black px-4 py-2 self-start font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 transform -rotate-2">
              {product.category_name}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-black leading-tight mb-4 uppercase tracking-tight">
              {product.title}
            </h1>
            
            <div className="text-4xl font-black text-black mb-8 bg-[#FF3B30] border-4 border-black px-4 py-2 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] self-start">
              Rp {Number(product.price).toLocaleString('id-ID')}
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 flex-grow">
              <h3 className="font-black text-xl mb-4 uppercase border-b-4 border-black pb-2">Deskripsi Produk</h3>
              <p className="text-gray-800 font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="bg-[#B9FF66] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-black font-bold text-lg mb-4">
                <span className="font-black uppercase block text-sm opacity-70">Penjual</span>
                {product.seller_name}
              </p>
              <button
                onClick={() => window.open(`https://wa.me/${product.seller_phone}`, '_blank')}
                className="w-full py-4 bg-white border-4 border-black font-black text-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center gap-2"
              >
                HUBUNGI VIA WHATSAPP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail