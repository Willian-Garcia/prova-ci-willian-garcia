"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const inMemoryItemRepo_1 = require("../repositories/inMemoryItemRepo");
const validate_1 = require("../utils/validate");
exports.ItemsController = {
    list(_req, res) {
        return res.json(inMemoryItemRepo_1.ItemRepo.all());
    },
    get(req, res) {
        const item = inMemoryItemRepo_1.ItemRepo.findById(req.params.id);
        if (!item)
            return res.status(404).json({ error: 'Item não encontrado' });
        return res.json(item);
    },
    create(req, res) {
        const parsed = validate_1.itemCreateSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json({ error: parsed.error.flatten() });
        const { name, quantity } = parsed.data;
        const item = inMemoryItemRepo_1.ItemRepo.create(name, quantity);
        return res.status(201).json(item);
    },
    update(req, res) {
        const parsed = validate_1.itemUpdateSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json({ error: parsed.error.flatten() });
        const item = inMemoryItemRepo_1.ItemRepo.update(req.params.id, parsed.data);
        if (!item)
            return res.status(404).json({ error: 'Item não encontrado' });
        return res.json(item);
    },
    remove(req, res) {
        const ok = inMemoryItemRepo_1.ItemRepo.remove(req.params.id);
        if (!ok)
            return res.status(404).json({ error: 'Item não encontrado' });
        return res.status(204).send();
    },
};
//# sourceMappingURL=items.controller.js.map