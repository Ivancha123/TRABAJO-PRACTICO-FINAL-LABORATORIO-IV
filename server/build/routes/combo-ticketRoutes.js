"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const combo_ticketController_1 = require("../controllers/combo-ticketController");
class ComboTicketRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', combo_ticketController_1.comboTicketController.list);
        this.router.get('/:id', combo_ticketController_1.comboTicketController.getOne);
        this.router.post('/', combo_ticketController_1.comboTicketController.create);
        this.router.put('/:id', combo_ticketController_1.comboTicketController.update);
        this.router.delete('/:id', combo_ticketController_1.comboTicketController.delete);
    }
}
const comboTicketRoutes = new ComboTicketRoutes();
exports.default = comboTicketRoutes.router;
