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
exports.ticketSeatController = void 0;
const database_1 = __importDefault(require("../database"));
class TicketSeatController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM tickets_seats');
            res.json(rows[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM tickets_seats WHERE id_ticket = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0][0]);
            }
            res.status(404).json({ text: 'The ticket_seat doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tickets_seats set ?', [req.body]);
            res.json({ message: 'ticket_seat saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tickets_seats set ? WHERE id_ticket = ?', [req.body, id]);
            res.json({ text: 'The ticket_seat was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tickets_seats WHERE id_ticket = ?', [id]);
            res.json({ message: 'The ticket_seat was deleted' });
        });
    }
}
exports.ticketSeatController = new TicketSeatController();
