import {Router} from 'express';
import {comboController} from '../controllers/comboController';

class ComboRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', comboController.list);
        this.router.get('/:id', comboController.getOne);
        this.router.post('/', comboController.create);
        this.router.put('/:id',comboController.update);
        this.router.delete('/:id',comboController.delete);
    }
}

const comboRoutes = new ComboRoutes();
export default comboRoutes.router;