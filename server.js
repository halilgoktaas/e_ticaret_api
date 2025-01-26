const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Örnek sepet (bellekte saklanacak, veri tabanı yerine)
let cart = [];

// 1. Sepetteki tüm ürünleri listeleme
app.get('/cart', (req, res) => {
    res.json(cart);
});

// 2. Sepete ürün ekleme
app.post('/cart', (req, res) => {
    const { id, name, price, quantity } = req.body;

    // Aynı üründen varsa miktarı artır
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += quantity;
        res.json({ message: 'Ürün güncellendi', product: existingProduct });
    } else {
        const product = { id, name, price, quantity };
        cart.push(product);
        res.json({ message: 'Ürün sepete eklendi', product });
    }
});

// 3. Sepetten ürün silme
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = cart.findIndex(item => item.id == id);

    if (productIndex !== -1) {
        const removedProduct = cart.splice(productIndex, 1);
        res.json({ message: 'Ürün sepetten silindi', product: removedProduct });
    } else {
        res.status(404).json({ message: 'Ürün bulunamadı' });
    }
});

// 4. Sepeti temizleme
app.delete('/cart', (req, res) => {
    cart = [];
    res.json({ message: 'Sepet temizlendi' });
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});
