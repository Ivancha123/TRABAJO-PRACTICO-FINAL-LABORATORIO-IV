import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

class PersonController {
    public async list(req: Request, res: Response){
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM persons');
        res.json(rows[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM persons WHERE id_person = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0][0]);
        }
        res.status(404).json({text: 'The person doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO persons set ?', [req.body]);
        res.json({message: 'person saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE persons set ? WHERE id_person = ?', [req.body, id]);
        res.json({text: 'The person was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM persons WHERE id_person = ?', [id]);
        res.json({message: 'The person was deleted'});
    }
}

export const personController = new PersonController();