"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = require("../controllers/movieController");
class MovieRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', movieController_1.movieController.list);
        this.router.get('/:id', movieController_1.movieController.getOne);
        this.router.post('/', movieController_1.movieController.create);
        this.router.put('/:id', movieController_1.movieController.update);
        this.router.delete('/:id', movieController_1.movieController.delete);
    }
}
const movieRoutes = new MovieRoutes();
exports.default = movieRoutes.router;
