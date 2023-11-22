import {Router} from 'express';
import {commentController} from '../controllers/commentController';

class CommentRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', commentController.list);
        this.router.get('/:id', commentController.getOne);
        this.router.get('/movie/:id', commentController.getByMovieId);
        this.router.post('/', commentController.create);
        this.router.put('/:id',commentController.update);
        this.router.delete('/:id',commentController.delete);
    }
}

const commentRoutes = new CommentRoutes();
export default commentRoutes.router;