import { useNavigate, Link } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem('user'))

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b-4 border-black px-6 py-4 flex justify-between items-center shadow-[0_4px_0_0_rgba(0,0,0,1)] relative z-50">
      <Link to="/" className="text-2xl font-black tracking-tighter text-black uppercase">
        Marketplace MHS
      </Link>
      <div className="flex items-center gap-4 font-bold">
        {user ? (
          <>
            <span className="text-sm">Halo, {user.name}</span>
            {user.role === 'admin' && (
              <Link to="/admin">
                <button className="px-4 py-2 text-sm bg-yellow-400 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all">
                  Dashboard Admin
                </button>
              </Link>
            )}
            <Link to="/products/add">
              <button className="px-4 py-2 text-sm bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all">
                + Jual Barang
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 text-sm bg-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 text-sm bg-black text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all">
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