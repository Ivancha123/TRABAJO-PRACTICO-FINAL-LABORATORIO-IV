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
exports.comboTicketController = void 0;
const database_1 = __importDefault(require("../database"));
class ComboTicketController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comboTicket = yield database_1.default.query('SELECT * FROM combos_tickets');
            res.json(comboTicket);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comboTicket = yield database_1.default.query('SELECT * FROM combos_tickets WHERE id_combo = ?', [id]);
            if (comboTicket.length > 0) {
                return res.json(comboTicket[0]);
            }
            res.status(404).json({ text: 'The combo_ticket doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO combos_tickets set ?', [req.body]);
            res.json({ message: 'combo_ticket saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE combos_tickets set ? WHERE id_combo = ?', [req.body, id]);
            res.json({ text: 'The combo_ticket was updated ' });
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
exports.comboTicketController = new ComboTicketController();