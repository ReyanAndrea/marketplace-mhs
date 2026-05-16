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
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🎓 Marketplace Mhs
      </Link>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Halo, <span className="font-semibold">{user.name}</span></span>
            {user.role === 'admin' && (
              <Link to="/admin">
                <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Dashboard Admin
                </button>
              </Link>
            )}
            <Link to="/products/add">
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                + Jual Barang
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )

}

export default Navbar