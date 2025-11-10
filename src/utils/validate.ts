import { z } from 'zod';

export const itemCreateSchema = z.object({
  name: z.string().min(1, 'name é obrigatório'),
  quantity: z.number().int().nonnegative(),
});

export const itemUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  quantity: z.number().int().nonnegative().optional(),
});

// Helpers para usar nos testes e controllers
export function validateCreateItem(data: unknown) {
  return itemCreateSchema.safeParse(data);
}

export function validateUpdateItem(data: unknown) {
  return itemUpdateSchema.safeParse(data);
}
