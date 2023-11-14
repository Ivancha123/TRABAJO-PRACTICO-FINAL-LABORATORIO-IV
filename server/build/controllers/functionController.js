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
            const functions = yield database_1.default.query('SELECT * FROM functions');
            res.json(functions[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const functions = yield database_1.default.query('SELECT * FROM functions WHERE id_function = ?', [id]);
            if (functions.length > 0) {
                return res.json(functions[0]);
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
