import {Router} from 'express';
import {seatController} from '../controllers/seatController';

class SeatRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', seatController.list);
        this.router.get('/:id', seatController.getOne);
        this.router.get('/room/:id', seatController.getSeatByRoom);
        this.router.get('/room2/:id', seatController.getSeatByRoom2);
        this.router.get('/data/:idRoom/:seatNumber/:seatLetter', seatController.getSeatByData);
        this.router.post('/', seatController.create);
        this.router.put('/:id',seatController.update);
        this.router.delete('/:id',seatController.delete);
    }
}

const seatRoutes = new SeatRoutes();
export default seatRoutes.router;