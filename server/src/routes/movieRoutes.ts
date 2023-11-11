import {Router} from 'express';
import {movieController} from '../controllers/movieController';

class MovieRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', movieController.list);
        this.router.get('/:id', movieController.getOne);
        this.router.post('/', movieController.create);
        this.router.put('/:id',movieController.update);
        this.router.delete('/:id',movieController.delete);
    }
}

const movieRoutes = new MovieRoutes();
export default movieRoutes.router;