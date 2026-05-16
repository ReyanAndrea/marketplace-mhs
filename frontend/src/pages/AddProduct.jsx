import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
  const [form, setForm] = useState({ category_id: '', title: '', description: '', price: '', condition: 'used' })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
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

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return setError('Silakan login dulu')
    try {
      const formData = new FormData()
      formData.append('user_id', user.id)
      formData.append('category_id', form.category_id)
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('condition', form.condition)
      if (image) formData.append('image', image)

      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal menambahkan produk')
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Jual Barang</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select name="category_id" value={form.category_id} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2" required>
          <option value="">Pilih Kategori</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input name="title" placeholder="Nama Barang" value={form.title} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2" required />
        <textarea name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 min-h-24" required />
        <input name="price" type="number" placeholder="Harga (Rp)" value={form.price} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2" required />
        <select name="condition" value={form.condition} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2">
          <option value="new">Baru</option>
          <option value="like_new">Seperti Baru</option>
          <option value="used">Bekas</option>
        </select>

        {/* Upload Foto */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {preview ? (
            <div>
              <img src={preview} alt="preview" className="mx-auto max-h-48 rounded-lg mb-2 object-cover" />
              <button type="button" onClick={() => { setPreview(null); setImage(null) }} className="text-sm text-red-500">Hapus foto</button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <p className="text-gray-400 mb-2">📷 Klik untuk upload foto</p>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Posting Barang
        </button>
      </form>
    </div>
  )
}

export default AddProduct