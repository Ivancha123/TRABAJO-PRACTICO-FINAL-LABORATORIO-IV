import {Router} from 'express';
import {cardController} from '../controllers/cardController';

class CardRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', cardController.list);
        this.router.get('/:id', cardController.getOne);
        this.router.get('/userId/:id', cardController.getForUserId);
        this.router.get('/number/:id', cardController.getByNumber);
        
        this.router.post('/', cardController.create);
        this.router.put('/:id',cardController.update);
        this.router.delete('/:id',cardController.delete);
    }
}

const cardRoutes = new CardRoutes();
export default cardRoutes.router;