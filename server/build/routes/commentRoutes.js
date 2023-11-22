"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
class CommentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', commentController_1.commentController.list);
        this.router.get('/:id', commentController_1.commentController.getOne);
        this.router.get('/movie/:id', commentController_1.commentController.getByMovieId);
        this.router.post('/', commentController_1.commentController.create);
        this.router.put('/:id', commentController_1.commentController.update);
        this.router.delete('/:id', commentController_1.commentController.delete);
    }
}
const commentRoutes = new CommentRoutes();
exports.default = commentRoutes.router;
