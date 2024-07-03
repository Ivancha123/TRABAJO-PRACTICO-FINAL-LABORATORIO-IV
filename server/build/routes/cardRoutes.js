"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
class CardRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', cardController_1.cardController.list);
        this.router.get('/:id', cardController_1.cardController.getOne);
        this.router.get('/userId/:id', cardController_1.cardController.getForUserId);
        this.router.post('/', cardController_1.cardController.create);
        this.router.put('/:id', cardController_1.cardController.update);
        this.router.delete('/:id', cardController_1.cardController.delete);
    }
}
const cardRoutes = new CardRoutes();
exports.default = cardRoutes.router;
