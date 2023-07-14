import Product from '../models/Product.model';
import { ProductAttributes } from '../types';

export const readAllProducts = async (): Promise<ProductAttributes[]> =>
  await Product.findAll();
