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
exports.cardController = void 0;
const database_1 = __importDefault(require("../database"));
class CardController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM cards');
            res.json(rows[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM cards WHERE id_card = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0][0]);
            }
            res.status(404).json({ text: 'The card doesn´t exists' });
        });
    }
    getForUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM cards WHERE id_person = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0]);
            }
            res.status(404).json({ text: 'The card doesn´t exists' });
        });
    }
    getByNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM cards WHERE number = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0][0]);
            }
            res.status(404).json({ text: 'The person doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO cards set ?', [req.body]);
            res.json({ message: 'card saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE cards set ? WHERE id_card = ?', [req.body, id]);
            res.json({ text: 'The card was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM cards WHERE id_card = ?', [id]);
            res.json({ message: 'The card was deleted' });
        });
    }
}
exports.cardController = new CardController();
