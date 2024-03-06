"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomController_1 = require("../controllers/roomController");
class RoomRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', roomController_1.roomController.list);
        this.router.get('/name/:id', roomController_1.roomController.getOneByName);
        this.router.get('/:id', roomController_1.roomController.getOne);
        this.router.post('/', roomController_1.roomController.create);
        this.router.put('/:id', roomController_1.roomController.update);
        this.router.delete('/:id', roomController_1.roomController.delete);
    }
}
const roomRoutes = new RoomRoutes();
exports.default = roomRoutes.router;
