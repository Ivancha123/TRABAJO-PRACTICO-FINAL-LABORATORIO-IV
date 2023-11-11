"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_seatController_1 = require("../controllers/ticket-seatController");
class TicketSeatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ticket_seatController_1.ticketSeatController.list);
        this.router.get('/:id', ticket_seatController_1.ticketSeatController.getOne);
        this.router.post('/', ticket_seatController_1.ticketSeatController.create);
        this.router.put('/:id', ticket_seatController_1.ticketSeatController.update);
        this.router.delete('/:id', ticket_seatController_1.ticketSeatController.delete);
    }
}
const ticketSeatRoutes = new TicketSeatRoutes();
exports.default = ticketSeatRoutes.router;
