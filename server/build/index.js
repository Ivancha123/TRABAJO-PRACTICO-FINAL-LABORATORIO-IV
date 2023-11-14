"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
const combo_ticketRoutes_1 = __importDefault(require("./routes/combo-ticketRoutes"));
const comboRoutes_1 = __importDefault(require("./routes/comboRoutes"));
const functionRoutes_1 = __importDefault(require("./routes/functionRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const ticket_seatRoutes_1 = __importDefault(require("./routes/ticket-seatRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const seatRoutes_1 = __importDefault(require("./routes/seatRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/persons', personRoutes_1.default);
        this.app.use('/api/combos', comboRoutes_1.default);
        this.app.use('/api/functions', functionRoutes_1.default);
        this.app.use('/api/combos-tickets', combo_ticketRoutes_1.default);
        this.app.use('/api/movies', movieRoutes_1.default);
        this.app.use('/api/rooms', roomRoutes_1.default);
        this.app.use('/api/tickets-seats', ticket_seatRoutes_1.default);
        this.app.use('/api/tickets', ticketRoutes_1.default);
        this.app.use('/api/seats', seatRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port 3000', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
