import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

class ComboController {
    public async list(req: Request, res: Response){
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM combos');
        res.json(rows[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM combos WHERE id_combo = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0][0]);
        }
        res.status(404).json({text: 'The combo doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO combos set ?', [req.body]);
        res.json({message: 'combo saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE combos set ? WHERE id_combo = ?', [req.body, id]);
        res.json({text: 'The combo was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM combos WHERE id_combo = ?', [id]);
        res.json({message: 'The combo was deleted'});
    }
}

export const comboController = new ComboController();