"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comboController_1 = require("../controllers/comboController");
class ComboRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', comboController_1.comboController.list);
        this.router.get('/:id', comboController_1.comboController.getOne);
        this.router.post('/', comboController_1.comboController.create);
        this.router.put('/:id', comboController_1.comboController.update);
        this.router.delete('/:id', comboController_1.comboController.delete);
    }
}
const comboRoutes = new ComboRoutes();
exports.default = comboRoutes.router;
