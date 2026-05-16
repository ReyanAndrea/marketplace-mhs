import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [tab, setTab] = useState('products')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchProducts()
    fetchUsers()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Hapus produk ini?')) return
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(products.filter(p => p.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const deleteUser = async (id) => {
    if (!window.confirm('Hapus user ini?')) return
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          onClick={() => setTab('products')}
          style={{ padding: '8px 20px', background: tab === 'products' ? '#333' : '#eee', color: tab === 'products' ? '#fff' : '#333', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Produk ({products.length})
        </button>
        <button
          onClick={() => setTab('users')}
          style={{ padding: '8px 20px', background: tab === 'users' ? '#333' : '#eee', color: tab === 'users' ? '#fff' : '#333', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          User ({users.length})
        </button>
      </div>

      {tab === 'products' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Judul</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Penjual</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Harga</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{p.title}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{p.seller_name}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>Rp {Number(p.price).toLocaleString('id-ID')}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{p.status}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={{ padding: '4px 10px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'users' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Nama</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Kampus</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Role</th>
              <th style={{ padding: 10, textAlign: 'left', border: '1px solid #ddd' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{u.name}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{u.email}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{u.campus}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>{u.role}</td>
                <td style={{ padding: 10, border: '1px solid #ddd' }}>
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => deleteUser(u.id)}
                      style={{ padding: '4px 10px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                      Hapus
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminDashboard