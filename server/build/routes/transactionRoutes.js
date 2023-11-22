"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
class TransactionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', transactionController_1.transactionController.list);
        this.router.get('/:id', transactionController_1.transactionController.getOne);
        this.router.post('/', transactionController_1.transactionController.create);
        this.router.put('/:id', transactionController_1.transactionController.update);
        this.router.delete('/:id', transactionController_1.transactionController.delete);
    }
}
const transactionRoutes = new TransactionRoutes();
exports.default = transactionRoutes.router;
