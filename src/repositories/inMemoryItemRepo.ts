import { Item } from "../models/item";

const items: Item[] = [];

function nowISO() { return new Date().toISOString(); }

export const ItemRepo = {
  all(): Item[] {
    return [...items];
  },
  findById(id: string): Item | undefined {
    return items.find(i => i.id === id);
  },
  create(name: string, quantity: number): Item {
    const id = (Math.random().toString(36).slice(2,8) + Date.now().toString(36));
    const ts = nowISO();
    const item: Item = { id, name, quantity, createdAt: ts, updatedAt: ts };
    items.push(item);
    return item;
  },
  update(id: string, partial: Partial<Omit<Item,'id'|'createdAt'>>): Item | undefined {
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return undefined;
    const updated = { ...items[idx], ...partial, updatedAt: nowISO() };
    items[idx] = updated;
    return updated;
  },
  remove(id: string): boolean {
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    items.splice(idx, 1);
    return true;
  }
};
