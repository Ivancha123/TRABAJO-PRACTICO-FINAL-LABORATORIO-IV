"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functionController_1 = require("../controllers/functionController");
class FunctionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', functionController_1.functionController.list);
        this.router.get('/:id', functionController_1.functionController.getOne);
        this.router.get('/movie/:id', functionController_1.functionController.getForMovie);
        this.router.post('/', functionController_1.functionController.create);
        this.router.put('/:id', functionController_1.functionController.update);
        this.router.delete('/:id', functionController_1.functionController.delete);
    }
}
const functionRoutes = new FunctionRoutes();
exports.default = functionRoutes.router;
