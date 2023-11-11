import {Router} from 'express';
import {comboTicketController} from '../controllers/combo-ticketController';

class ComboTicketRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', comboTicketController.list);
        this.router.get('/:id', comboTicketController.getOne);
        this.router.post('/', comboTicketController.create);
        this.router.put('/:id',comboTicketController.update);
        this.router.delete('/:id',comboTicketController.delete);
    }
}

const comboTicketRoutes = new ComboTicketRoutes();
export default comboTicketRoutes.router;