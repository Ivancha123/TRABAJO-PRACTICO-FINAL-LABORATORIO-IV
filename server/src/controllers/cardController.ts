import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

class CardController {
    public async list(req: Request, res: Response){
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM cards');
        res.json(rows[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM cards WHERE id_card = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0][0]);
        }
        res.status(404).json({text: 'The card doesn´t exists'});
    }

    public async getForUserId(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM cards WHERE id_person = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0]);
        }
        res.status(404).json({text: 'The card doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO cards set ?', [req.body]);
        res.json({message: 'card saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE cards set ? WHERE id_card = ?', [req.body, id]);
        res.json({text: 'The card was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM cards WHERE id_card = ?', [id]);
        res.json({message: 'The card was deleted'});
    }
}

export const cardController = new CardController();