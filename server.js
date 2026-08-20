const express = require('express');
require('dotenv').config();
const productosRoutes = require('./src/routes/productos.routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', productosRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});