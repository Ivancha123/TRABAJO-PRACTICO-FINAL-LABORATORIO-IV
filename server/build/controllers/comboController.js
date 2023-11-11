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
exports.comboController = void 0;
const database_1 = __importDefault(require("../database"));
class ComboController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const combo = yield database_1.default.query('SELECT * FROM combos');
            res.json(combo);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const combo = yield database_1.default.query('SELECT * FROM combos WHERE id_combo = ?', [id]);
            if (combo.length > 0) {
                return res.json(combo[0]);
            }
            res.status(404).json({ text: 'The combo doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO combos set ?', [req.body]);
            res.json({ message: 'combo saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE combos set ? WHERE id_combo = ?', [req.body, id]);
            res.json({ text: 'The combo was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM combos_tickets WHERE id_combo = ?', [id]);
            res.json({ message: 'The combo_ticket was deleted' });
        });
    }
}
exports.comboController = new ComboController();
