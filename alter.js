const db = require('./backend/config/db');
db.query("ALTER TABLE orders MODIFY status ENUM('menunggu', 'diproses', 'dikirim', 'selesai') DEFAULT 'menunggu'")
  .then(()=>console.log('altered'))
  .catch(console.log)
  .finally(() => process.exit(0));
