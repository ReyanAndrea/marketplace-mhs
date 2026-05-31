import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form)
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login gagal')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f5f0e8' }}>
      <div className="w-full max-w-md bg-white p-10" style={{ border: '3px solid #000', boxShadow: '6px 6px 0 #000' }}>

        <span className="inline-block text-white text-xs font-black uppercase tracking-widest px-3 py-1 mb-4" style={{ backgroundColor: '#3b82f6', border: '2px solid #000' }}>
          Pasar Mahasiswa
        </span>

        <h1 className="text-3xl font-black uppercase leading-tight mb-1" style={{ color: '#000' }}>
          Selamat<br />Datang
        </h1>
        <p className="text-sm font-medium mb-6" style={{ color: '#555' }}>
          Login ke akun kamu untuk mulai beli & jual
        </p>

        {error && (
          <div className="text-sm font-bold px-4 py-3 mb-4" style={{ backgroundColor: '#fee2e2', border: '2px solid #000', boxShadow: '3px 3px 0 #000', color: '#991b1b' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <label className="text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#000' }}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 text-sm font-medium outline-none mb-4"
            style={{ border: '2.5px solid #000', boxShadow: '3px 3px 0 #000', backgroundColor: '#fff' }}
            onFocus={e => e.target.style.backgroundColor = '#fef9c3'}
            onBlur={e => e.target.style.backgroundColor = '#fff'}
          />

          <label className="text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#000' }}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 text-sm font-medium outline-none mb-4"
            style={{ border: '2.5px solid #000', boxShadow: '3px 3px 0 #000', backgroundColor: '#fff' }}
            onFocus={e => e.target.style.backgroundColor = '#fef9c3'}
            onBlur={e => e.target.style.backgroundColor = '#fff'}
          />

          <button
            type="submit"
            className="w-full py-3 text-sm font-black uppercase tracking-widest mt-1"
            style={{ backgroundColor: '#facc15', border: '3px solid #000', boxShadow: '4px 4px 0 #000', color: '#000' }}
            onMouseEnter={e => { e.target.style.transform = 'translate(2px,2px)'; e.target.style.boxShadow = '2px 2px 0 #000' }}
            onMouseLeave={e => { e.target.style.transform = 'translate(0,0)'; e.target.style.boxShadow = '4px 4px 0 #000' }}
          >
            Login
          </button>
        </form>

        <hr className="my-5" style={{ borderTop: '2px dashed #000' }} />

        <p className="text-center text-sm font-semibold" style={{ color: '#555' }}>
          Belum punya akun?{' '}
          <Link to="/register" className="font-black" style={{ color: '#3b82f6', borderBottom: '2px solid #3b82f6' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login