import { Router } from 'express';
import * as productServices from '../services/product.http';

const router = Router();

router.route('/').get(productServices.getAll);

export default router;
