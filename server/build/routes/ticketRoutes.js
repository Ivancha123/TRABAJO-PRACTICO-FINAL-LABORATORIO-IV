"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
class TicketRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ticketController_1.ticketController.list);
        this.router.get('/format/', ticketController_1.ticketController.listFormat);
        this.router.get('/user/:id', ticketController_1.ticketController.listFormatByUser);
        this.router.get('/combo/user/:id', ticketController_1.ticketController.listFormatComboByUser);
        this.router.get('/:id', ticketController_1.ticketController.getOne);
        this.router.post('/', ticketController_1.ticketController.create);
        this.router.put('/:id', ticketController_1.ticketController.update);
        this.router.delete('/:id', ticketController_1.ticketController.delete);
    }
}
const ticketRoutes = new TicketRoutes();
exports.default = ticketRoutes.router;
