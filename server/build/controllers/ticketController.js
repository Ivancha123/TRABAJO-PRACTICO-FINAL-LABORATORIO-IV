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
exports.ticketController = void 0;
const database_1 = __importDefault(require("../database"));
class TicketController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM tickets');
            res.json(rows[0]);
        });
    }
    listFormat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('select t.id_ticket as id_ticket, p.document as document, f.function_date as function_date, f.function_hour as function_hour, r.room_name as room_name, m.title as title, t.mount as mount from tickets t inner join persons p on t.id_person = p.id_person inner join functions f on t.id_function = f.id_function inner join rooms r on f.id_room = r.id_room inner join movies m on f.id_movie = m.id_movie');
            res.json(rows[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM tickets WHERE id_ticket = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0][0]);
            }
            res.status(404).json({ text: 'The ticket doesn´t exists' });
        });
    }
    listFormatByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('select t.id_ticket as id_ticket, p.document as document, f.function_date as function_date, f.function_hour as function_hour, r.room_name as room_name, m.title as title, t.mount as mount from tickets t inner join persons p on t.id_person = p.id_person inner join functions f on t.id_function = f.id_function inner join rooms r on f.id_room = r.id_room inner join movies m on f.id_movie = m.id_movie where t.id_person = ?', [id]);
            res.json(rows[0]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tickets set ?', [req.body]);
            res.json({ message: 'ticket saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tickets set ? WHERE id_ticket = ?', [req.body, id]);
            res.json({ text: 'The ticket was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tickets WHERE id_ticket = ?', [id]);
            res.json({ message: 'The ticket was deleted' });
        });
    }
}
exports.ticketController = new TicketController();
