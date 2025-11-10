import { validateCreateItem, validateUpdateItem } from '../../../src/utils/validate';

describe('validate (unit)', () => {
  it('validateCreateItem aceita payload válido', () => {
    const res = validateCreateItem({ name: 'Mouse', quantity: 1 });
    expect(res.success).toBe(true);
  });

  it('validateCreateItem rejeita payload inválido', () => {
    const res = validateCreateItem({ name: '', quantity: -1 });
    expect(res.success).toBe(false);
  });

  it('validateUpdateItem aceita parciais válidos', () => {
    const res = validateUpdateItem({ quantity: 10 });
    expect(res.success).toBe(true);
  });

  it('validateUpdateItem rejeita inválidos', () => {
    const res = validateUpdateItem({ quantity: -5 });
    expect(res.success).toBe(false);
  });
});
