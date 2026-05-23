CREATE DATABASE IF NOT EXISTS marketplace_mhs;
USE marketplace_mhs;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  campus VARCHAR(100),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  slug VARCHAR(50)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category_id INT,
  title VARCHAR(200),
  description TEXT,
  price DECIMAL(12,2),
  `condition` ENUM('new','like_new','used'),
  status ENUM('available','sold','inactive') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  image_url VARCHAR(255),
  is_primary BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE wishlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO categories (name, slug) VALUES
('Buku', 'buku'),
('Elektronik', 'elektronik'),
('Perabot Kos', 'perabot-kos'),
('Pakaian', 'pakaian'),
('Lainnya', 'lainnya');

-- Password: admin123
INSERT INTO users (name, email, password, role) VALUES (
  'Admin',
  'admin@gmail.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
  'admin'
);