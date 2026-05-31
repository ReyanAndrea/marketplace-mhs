import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [tab, setTab] = useState('products')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem('user'))
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [resProducts, resUsers] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      ])
      setProducts(resProducts.data)
      setUsers(resUsers.data)
    } catch (err) {
      console.error('Error fetching admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('HAPUS PRODUK INI?')) return
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(products.filter(p => p.id !== id))
    } catch (err) {
      console.error(err)
      alert('Gagal menghapus produk')
    }
  }

  const deleteUser = async (id) => {
    if (!window.confirm('HAPUS USER INI?')) return
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.filter(u => u.id !== id))
      fetchData()
    } catch (err) {
      console.error(err)
      alert('Gagal menghapus user')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F4F4F0]">
        <div className="text-3xl font-black border-4 border-black px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white animate-pulse">
          LOADING ADMIN DATA...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F0] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-2" style={{ textShadow: '4px 4px 0px rgba(0,0,0,1)' }}>
              <span className="text-white">ADMIN</span> DASHBOARD
            </h2>
            <div className="bg-[#FFE800] border-4 border-black px-4 py-2 font-bold inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              SYSTEM CONTROL PANEL
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white border-4 border-black font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            &larr; KEMBALI KE HOME
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#00E5FF] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <p className="text-black font-black uppercase text-xl mb-2 relative z-10">TOTAL PRODUK</p>
            <p className="text-6xl font-black text-white relative z-10" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>{products.length}</p>
            <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500 text-black">📦</div>
          </div>
          <div className="bg-[#FF3B30] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <p className="text-black font-black uppercase text-xl mb-2 relative z-10">TOTAL USER</p>
            <p className="text-6xl font-black text-white relative z-10" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>{users.length}</p>
            <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500 text-black">👥</div>
          </div>
        </div>

        {/* Tab */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab('products')}
            className={`px-8 py-3 border-4 border-black font-black text-lg uppercase transition-all ${tab === 'products' ? 'bg-[#B9FF66] shadow-none translate-x-[4px] translate-y-[4px]' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50'}`}
          >
            PRODUK DATA
          </button>
          <button
            onClick={() => setTab('users')}
            className={`px-8 py-3 border-4 border-black font-black text-lg uppercase transition-all ${tab === 'users' ? 'bg-[#B9FF66] shadow-none translate-x-[4px] translate-y-[4px]' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50'}`}
          >
            USER DATA
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {tab === 'products' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F4F4F0] border-b-4 border-black">
                  <tr>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black w-1/3">Judul Produk</th>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black">Penjual</th>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black">Harga</th>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black">Status</th>
                    <th className="px-6 py-4 font-black uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center font-bold text-xl uppercase">Tidak ada produk ditemukan.</td>
                    </tr>
                  ) : products.map((p, index) => (
                    <tr key={p.id} className={`${index !== products.length - 1 ? 'border-b-4 border-black' : ''} hover:bg-yellow-50 transition-colors`}>
                      <td className="px-6 py-4 font-bold border-r-4 border-black">{p.title}</td>
                      <td className="px-6 py-4 font-medium border-r-4 border-black">{p.seller_name}</td>
                      <td className="px-6 py-4 font-black border-r-4 border-black">Rp {Number(p.price).toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4 border-r-4 border-black">
                        <span className={`px-3 py-1 border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block ${p.status === 'available' ? 'bg-[#B9FF66]' : 'bg-gray-300'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="px-4 py-2 bg-[#FF3B30] border-2 border-black font-bold text-white text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                        >
                          HAPUS
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F4F4F0] border-b-4 border-black">
                  <tr>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black">Nama</th>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black">Email</th>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black">Kampus</th>
                    <th className="px-6 py-4 font-black uppercase border-r-4 border-black">Role</th>
                    <th className="px-6 py-4 font-black uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center font-bold text-xl uppercase">Tidak ada user ditemukan.</td>
                    </tr>
                  ) : users.map((u, index) => (
                    <tr key={u.id} className={`${index !== users.length - 1 ? 'border-b-4 border-black' : ''} hover:bg-yellow-50 transition-colors`}>
                      <td className="px-6 py-4 font-bold border-r-4 border-black">{u.name}</td>
                      <td className="px-6 py-4 font-medium border-r-4 border-black">{u.email}</td>
                      <td className="px-6 py-4 font-medium border-r-4 border-black">{u.campus}</td>
                      <td className="px-6 py-4 border-r-4 border-black">
                        <span className={`px-3 py-1 border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block ${u.role === 'admin' ? 'bg-[#FFE800]' : 'bg-[#00E5FF]'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="px-4 py-2 bg-[#FF3B30] border-2 border-black font-bold text-white text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                          >
                            HAPUS
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard