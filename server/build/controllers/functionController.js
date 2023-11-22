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
exports.functionController = void 0;
const database_1 = __importDefault(require("../database"));
class FunctionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM functions');
            res.json(rows[0]);
        });
    }
    listFormat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('select f.id_function as id_function, f.function_date as function_date, f.function_hour as function_hour, r.room_name as room_name, m.title as title, f.price as price from functions f inner join rooms r on f.id_room = r.id_room inner join movies m on f.id_movie = m.id_movie;');
            res.json(rows[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM functions WHERE id_function = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0][0]);
            }
            res.status(404).json({ text: 'The function doesn´t exists' });
        });
    }
    getForMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM functions WHERE id_movie = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0]);
            }
            res.status(404).json({ text: 'The function doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO functions set ?', [req.body]);
            res.json({ message: 'function saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE functions set ? WHERE id_function = ?', [req.body, id]);
            res.json({ text: 'The function was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM functions WHERE id_function = ?', [id]);
            res.json({ message: 'The function was deleted' });
        });
    }
}
exports.functionController = new FunctionController();
