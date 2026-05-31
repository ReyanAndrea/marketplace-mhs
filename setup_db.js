const db = require('./backend/config/db');
async function setupDb() {
  try {
    await db.query('ALTER TABLE products ADD COLUMN stock INT DEFAULT 1');
    console.log('Stock column added');
  } catch(e) { console.log('stock exists'); }
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS carts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      product_id INT,
      quantity INT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
    console.log('Carts created');
  } catch(e) { console.log(e); }
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      product_id INT,
      seller_id INT,
      quantity INT,
      total_price DECIMAL(10,2),
      payment_method VARCHAR(50),
      status ENUM('diproses', 'dikirim', 'selesai') DEFAULT 'diproses',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (seller_id) REFERENCES users(id)
    )`);
    console.log('Orders created');
  } catch(e) { console.log(e); }
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT,
      product_id INT,
      user_id INT,
      rating INT,
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
    console.log('Reviews created');
  } catch(e) { console.log(e); }
  console.log('Done');
  process.exit(0);
}
setupDb();
