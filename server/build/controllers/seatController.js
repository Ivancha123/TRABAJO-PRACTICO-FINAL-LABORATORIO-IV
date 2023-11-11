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
exports.seatController = void 0;
const database_1 = __importDefault(require("../database"));
class SeatController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const seats = yield database_1.default.query('SELECT * FROM seats');
            res.json(seats);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const seats = yield database_1.default.query('SELECT * FROM seats WHERE id_seat = ?', [id]);
            if (seats.length > 0) {
                return res.json(seats[0]);
            }
            res.status(404).json({ text: 'The seat doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO seats set ?', [req.body]);
            res.json({ message: 'seat saved' });
        });
    }
    createSeat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('create_seat() ?', [req.body]);
            res.json({ message: 'seat saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE seats set ? WHERE id_seat = ?', [req.body, id]);
            res.json({ text: 'The seat was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM seats WHERE id_seat = ?', [id]);
            res.json({ message: 'The seat was deleted' });
        });
    }
}
exports.seatController = new SeatController();
