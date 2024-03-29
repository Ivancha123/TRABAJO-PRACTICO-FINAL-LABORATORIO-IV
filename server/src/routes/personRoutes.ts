import {Router} from 'express';
import {personController} from '../controllers/personController';

class PersonRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', personController.list);
        this.router.get('/:id', personController.getOne);
        this.router.get('/login/:email', personController.getByEmail);
        this.router.post('/', personController.create);
        this.router.put('/:id',personController.update);
        this.router.delete('/:id',personController.delete);
    }
}

const personRoutes = new PersonRoutes();
export default personRoutes.router;