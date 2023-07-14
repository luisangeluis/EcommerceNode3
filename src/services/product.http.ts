import { readAllProducts } from '../controllers/product.controller';
import { Request, Response } from 'express';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = readAllProducts();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
};
