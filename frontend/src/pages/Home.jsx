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
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-blue-600 text-white rounded-2xl px-8 py-10 mb-8">
        <h1 className="text-3xl font-bold mb-2">Jual Beli Barang Bekas Mahasiswa</h1>
        <p className="text-blue-100 mb-6">Temukan barang bekas berkualitas dari sesama mahasiswa</p>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Cari barang..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg text-gray-800 outline-none"
          />
          <button type="submit" className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
            Cari
          </button>
        </form>
      </div>

      {/* Filter Kategori */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setCategoryId('')}
          className={`px-4 py-2 rounded-full text-sm border transition ${categoryId === '' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}
        >
          Semua
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCategoryId(String(c.id))}
            className={`px-4 py-2 rounded-full text-sm border transition ${categoryId === String(c.id) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-lg">Belum ada produk</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => (
            <Link to={`/products/${p.id}`} key={p.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
              <div className="bg-gray-100 h-36 flex items-center justify-center overflow-hidden">
  {p.image ? (
    <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.title} className="w-full h-full object-cover" />
  ) : (
    <span className="text-4xl">📦</span>
  )}
</div>
              <div className="p-3">
                <p className="text-xs text-blue-500 mb-1">{p.category_name}</p>
                <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{p.title}</h3>
                <p className="font-bold text-gray-900 text-sm">Rp {Number(p.price).toLocaleString('id-ID')}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{p.seller_name}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{conditionLabel(p.condition)}</span>
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