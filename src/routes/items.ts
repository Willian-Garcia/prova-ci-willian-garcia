import { Router } from 'express';
import { ItemsController } from '../controllers/items.controller';

const router = Router();

router.get('/', ItemsController.list);
router.get('/:id', ItemsController.get);
router.post('/', ItemsController.create);
router.put('/:id', ItemsController.update);
router.delete('/:id', ItemsController.remove);

export default router;