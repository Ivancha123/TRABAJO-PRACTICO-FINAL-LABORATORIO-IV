import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import personRoutes from './routes/personRoutes';
import comboTicketRoutes from './routes/combo-ticketRoutes';
import comboRoutes from './routes/comboRoutes';
import functionRoutes from './routes/functionRoutes';
import movieRoutes from './routes/movieRoutes';
import roomRoutes from './routes/roomRoutes';
import ticketSeatRoutes from './routes/ticket-seatRoutes';
import ticketRoutes from './routes/ticketRoutes';
import seatRoutes from './routes/seatRoutes';
import cardRoutes from './routes/cardRoutes';

class Server {
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/api/persons', personRoutes);
        this.app.use('/api/combos', comboRoutes);
        this.app.use('/api/cards', cardRoutes);
        this.app.use('/api/functions', functionRoutes);
        this.app.use('/api/combos-tickets', comboTicketRoutes);
        this.app.use('/api/movies', movieRoutes);
        this.app.use('/api/rooms', roomRoutes);
        this.app.use('/api/tickets-seats', ticketSeatRoutes);
        this.app.use('/api/tickets', ticketRoutes);
        this.app.use('/api/seats', seatRoutes);

    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port 3000',this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();