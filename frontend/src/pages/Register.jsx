import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', campus: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register', form)
      setSuccess('Registrasi berhasil! Silakan login.')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Registrasi gagal')
    }
  }

  const fields = [
    { name: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Reyan Andrea' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { name: 'phone', label: 'No. WhatsApp', type: 'text', placeholder: '628xxxxxxxxxx' },
    { name: 'campus', label: 'Kampus', type: 'text', placeholder: 'Universitas ...' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Buat Akun Baru 🎓</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar dan mulai jual beli</p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map(f => (
            <div key={f.name}>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
          >
            Daftar
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register