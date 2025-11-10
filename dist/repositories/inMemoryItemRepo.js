"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepo = void 0;
const items = [];
function nowISO() { return new Date().toISOString(); }
exports.ItemRepo = {
    all() {
        return [...items];
    },
    findById(id) {
        return items.find(i => i.id === id);
    },
    create(name, quantity) {
        const id = (Math.random().toString(36).slice(2, 8) + Date.now().toString(36));
        const ts = nowISO();
        const item = { id, name, quantity, createdAt: ts, updatedAt: ts };
        items.push(item);
        return item;
    },
    update(id, partial) {
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1)
            return undefined;
        const updated = { ...items[idx], ...partial, updatedAt: nowISO() };
        items[idx] = updated;
        return updated;
    },
    remove(id) {
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1)
            return false;
        items.splice(idx, 1);
        return true;
    }
};
//# sourceMappingURL=inMemoryItemRepo.js.map