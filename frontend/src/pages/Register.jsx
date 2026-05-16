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

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 20px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'password', 'phone', 'campus'].map((field) => (
          <div key={field} style={{ marginBottom: 12 }}>
            <input
              name={field}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              style={{ width: '100%', padding: 10, boxSizing: 'border-box' }}
              required
            />
          </div>
        ))}
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Register
        </button>
      </form>
      <p>Sudah punya akun? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register