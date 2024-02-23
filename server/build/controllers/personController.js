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
exports.personController = void 0;
const database_1 = __importDefault(require("../database"));
class PersonController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT * FROM persons');
            res.json(rows[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM persons WHERE id_person = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0][0]);
            }
            res.status(404).json({ text: 'The person doesn´t exists' });
        });
    }
    getByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const rows = yield database_1.default.query('SELECT * FROM persons WHERE email = ?', [email]);
            if (rows.length > 0) {
                return res.json(rows[0][0]);
            }
            res.status(404).json({ text: 'The person doesn´t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO persons set ?', [req.body]);
            res.json({ message: 'person saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE persons set ? WHERE id_person = ?', [req.body, id]);
            res.json({ text: 'The person was updated ' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM persons WHERE id_person = ?', [id]);
            res.json({ message: 'The person was deleted' });
        });
    }
}
exports.personController = new PersonController();
