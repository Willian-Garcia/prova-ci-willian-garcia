"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_controller_1 = require("../controllers/items.controller");
const router = (0, express_1.Router)();
router.get('/', items_controller_1.ItemsController.list);
router.get('/:id', items_controller_1.ItemsController.get);
router.post('/', items_controller_1.ItemsController.create);
router.put('/:id', items_controller_1.ItemsController.update);
router.delete('/:id', items_controller_1.ItemsController.remove);
exports.default = router;
//# sourceMappingURL=items.js.map