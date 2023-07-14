import express from 'express';

import productRoutes from './routes/product.router';

const app = express();

app.use('api/v1/products', productRoutes);

app.get('/', (_req, res) => {
  console.log('hola');
  res.send('hola');
});

export default app;
