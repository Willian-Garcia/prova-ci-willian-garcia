import { Request, Response } from 'express';
import { ItemRepo } from '../repositories/inMemoryItemRepo';
import { itemCreateSchema, itemUpdateSchema } from '../utils/validate';


export const ItemsController = {
  list(_req: Request, res: Response) {
    return res.json(ItemRepo.all());
  },
  get(req: Request, res: Response) {
    const item = ItemRepo.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item não encontrado' });
    return res.json(item);
  },
  create(req: Request, res: Response) {
    const parsed = itemCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const { name, quantity } = parsed.data;
    const item = ItemRepo.create(name, quantity);
    return res.status(201).json(item);
  },
  update(req: Request, res: Response) {
    const parsed = itemUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const item = ItemRepo.update(req.params.id, parsed.data);
    if (!item) return res.status(404).json({ error: 'Item não encontrado' });
    return res.json(item);
  },
  remove(req: Request, res: Response) {
    const ok = ItemRepo.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Item não encontrado' });
    return res.status(204).send();
  },
};
