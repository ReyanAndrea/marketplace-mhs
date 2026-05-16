import { useNavigate, Link } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav style={{ padding: '12px 24px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: 18 }}>
        Marketplace Mhs
      </Link>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: 14 }}>Halo, {user.name}</span>
            <Link to="/products/add">
              <button style={{ padding: '6px 14px' }}>+ Jual Barang</button>
            </Link>
            <button onClick={handleLogout} style={{ padding: '6px 14px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"><button style={{ padding: '6px 14px' }}>Login</button></Link>
            <Link to="/register"><button style={{ padding: '6px 14px' }}>Register</button></Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar