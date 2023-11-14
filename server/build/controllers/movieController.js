"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieController = void 0;
const database_1 = __importDefault(require("../database"));
class MovieController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield database_1.default.query('SELECT * FROM movies');
            res.json(movies[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const movies = yield database_1.default.query('SELECT * FROM movies WHERE id_movie = ?', [id]);
            if (movies.length > 0) {
                return res.json(movies[0]);
            }
            res.status(404).json({ text: 'The movie doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO movies set ?', [req.body]);
            res.json({ message: 'movie saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE movies set ? WHERE id_movie = ?', [req.body, id]);
            res.json({ text: 'The movie was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM movies WHERE id_movie = ?', [id]);
            res.json({ message: 'The movie was deleted' });
        });
    }
}
exports.movieController = new MovieController();
