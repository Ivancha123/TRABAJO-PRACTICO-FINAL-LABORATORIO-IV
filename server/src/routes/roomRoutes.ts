import {Router} from 'express';
import {roomController} from '../controllers/roomController';

class RoomRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', roomController.list);
        this.router.get('/name/:id', roomController.getOneByName);
        this.router.get('/:id', roomController.getOne);
        this.router.post('/', roomController.create);
        this.router.put('/:id',roomController.update);
        this.router.delete('/:id',roomController.delete);
    }
}

const roomRoutes = new RoomRoutes();
export default roomRoutes.router;