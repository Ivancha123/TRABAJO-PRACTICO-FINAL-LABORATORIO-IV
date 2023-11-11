import {Router} from 'express';
import {ticketSeatController} from '../controllers/ticket-seatController';

class TicketSeatRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', ticketSeatController.list);
        this.router.get('/:id', ticketSeatController.getOne);
        this.router.post('/', ticketSeatController.create);
        this.router.put('/:id',ticketSeatController.update);
        this.router.delete('/:id',ticketSeatController.delete);
    }
}

const ticketSeatRoutes = new TicketSeatRoutes();
export default ticketSeatRoutes.router;