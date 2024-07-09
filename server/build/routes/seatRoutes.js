"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seatController_1 = require("../controllers/seatController");
class SeatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', seatController_1.seatController.list);
        this.router.get('/:id', seatController_1.seatController.getOne);
        this.router.get('/room/:id', seatController_1.seatController.getSeatByRoom);
        this.router.get('/room2/:id', seatController_1.seatController.getSeatByRoom2);
        this.router.get('/data/:idRoom/:seatNumber/:seatLetter', seatController_1.seatController.getSeatByData);
        this.router.post('/', seatController_1.seatController.create);
        this.router.put('/:id', seatController_1.seatController.update);
        this.router.delete('/:id', seatController_1.seatController.delete);
    }
}
const seatRoutes = new SeatRoutes();
exports.default = seatRoutes.router;
