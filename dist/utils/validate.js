"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemUpdateSchema = exports.itemCreateSchema = void 0;
const zod_1 = require("zod");
exports.itemCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'name é obrigatório'),
    quantity: zod_1.z.number().int().nonnegative(),
});
exports.itemUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    quantity: zod_1.z.number().int().nonnegative().optional(),
});
//# sourceMappingURL=validate.js.map