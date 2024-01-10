import { Request, Response, NextFunction } from 'express';
import { readProductById } from '../controllers/product.controller';

const productExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const productId: string = req.params.id;

  const product = await readProductById(productId);

  if (!product || product === null)
    return res.status(404).json({ message: `Product with id: ${productId} doesn't exist` });

  next();
};

export default productExistsMiddleware;
