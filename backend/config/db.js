const mysql = require('mysql2')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'marketplace_mhs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database Gagal Konek, periksa XAMPP Anda:', err.message)
  } else {
    console.log('Database Berhasil Konek! Siap dipakai login.')
    connection.release()
  }
})

module.exports = pool.promise()