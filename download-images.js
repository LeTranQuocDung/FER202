const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80'
];

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

images.forEach((url, i) => {
  const dest = path.join(dir, `product-${i + 1}.webp`);
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      https.get(response.headers.location, (res2) => {
        res2.pipe(file);
      });
    } else {
      response.pipe(file);
    }
  });
});
console.log('Downloading images...');
