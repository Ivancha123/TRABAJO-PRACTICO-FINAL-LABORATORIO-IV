import {Router} from 'express';
import {functionController} from '../controllers/functionController';

class FunctionRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', functionController.list);
        this.router.get('/:id', functionController.getOne);
        this.router.get('/:id',functionController.getForMovie)
        this.router.post('/', functionController.create);
        this.router.put('/:id',functionController.update);
        this.router.delete('/:id',functionController.delete);
    }
}

const functionRoutes = new FunctionRoutes();
export default functionRoutes.router;