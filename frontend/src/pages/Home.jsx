import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const fetchProducts = (searchVal = search, catVal = categoryId) => {
    const params = {}
    if (searchVal) params.search = searchVal
    if (catVal) params.category_id = catVal
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

  const conditionLabel = (c) => {
    if (c === 'new') return 'Baru'
    if (c === 'like_new') return 'Seperti Baru'
    return 'Bekas'
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans text-black">
      <div className="bg-blue-500 border-4 border-black p-10 mb-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Pasar Mahasiswa</h1>
        <p className="text-xl font-bold mb-8">Temukan barang bekas berkualitas dari sesama mahasiswa.</p>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            placeholder="Cari barang..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border-4 border-black font-bold text-lg outline-none focus:bg-yellow-100 transition-colors"
          />
          <button type="submit" className="px-8 py-3 bg-yellow-400 font-black text-lg border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-none transition-all uppercase">
            Cari
          </button>
        </form>
      </div>

      <div className="flex gap-4 flex-wrap mb-10">
        <button
          onClick={() => setCategoryId('')}
          className={`px-5 py-2 font-bold border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-none transition-all uppercase ${categoryId === '' ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          Semua
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCategoryId(String(c.id))}
            className={`px-5 py-2 font-bold border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-none transition-all uppercase ${categoryId === String(c.id) ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <p className="text-3xl font-black uppercase tracking-widest">Belum ada produk</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <Link to={`/products/${p.id}`} key={p.id} className="group bg-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-[6px] hover:translate-x-[6px] hover:shadow-none transition-all flex flex-col h-full">
              <div className="bg-gray-100 h-48 border-b-4 border-black flex items-center justify-center overflow-hidden">
                {p.image ? (
                  <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="font-black text-gray-400 uppercase tracking-widest">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="inline-block bg-pink-400 text-black text-xs font-black px-2 py-1 border-2 border-black uppercase self-start mb-3">
                  {p.category_name}
                </span>
                <h3 className="font-black text-xl mb-2 line-clamp-2 leading-tight">{p.title}</h3>
                <p className="font-black text-2xl mt-auto mb-4">Rp {Number(p.price).toLocaleString('id-ID')}</p>
                <div className="flex justify-between items-center pt-3 border-t-2 border-black border-dashed">
                  <span className="font-bold text-sm truncate max-w-[60%]">{p.seller_name}</span>
                  <span className="font-bold text-xs uppercase bg-green-400 border-2 border-black px-2 py-1">
                    {conditionLabel(p.condition)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home