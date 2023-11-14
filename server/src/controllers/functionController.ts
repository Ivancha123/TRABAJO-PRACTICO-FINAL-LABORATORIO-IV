import { Request, Response } from 'express';
import pool from '../database';

class FunctionController {
    public async list(req: Request, res: Response){
        const functions = await pool.query('SELECT * FROM functions');
        res.json(functions[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const functions = await pool.query('SELECT * FROM functions WHERE id_function = ?',[id]);
        if(functions.length > 0){
            return res.json(functions[0]);
        }
        res.status(404).json({text: 'The function doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO functions set ?', [req.body]);
        res.json({message: 'function saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE functions set ? WHERE id_function = ?', [req.body, id]);
        res.json({text: 'The function was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM functions WHERE id_function = ?', [id]);
        res.json({message: 'The function was deleted'});
    }
}

export const functionController = new FunctionController();