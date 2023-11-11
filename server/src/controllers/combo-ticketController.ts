import { Request, Response } from 'express';
import pool from '../database';

class ComboTicketController {
    public async list(req: Request, res: Response){
        const comboTicket = await pool.query('SELECT * FROM combos_tickets');
        res.json(comboTicket);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const comboTicket = await pool.query('SELECT * FROM combos_tickets WHERE id_combo = ?',[id]);
        if(comboTicket.length > 0){
            return res.json(comboTicket[0]);
        }
        res.status(404).json({text: 'The combo_ticket doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO combos_tickets set ?', [req.body]);
        res.json({message: 'combo_ticket saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE combos_tickets set ? WHERE id_combo = ?', [req.body, id]);
        res.json({text: 'The combo_ticket was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM combos_tickets WHERE id_combo = ?', [id]);
        res.json({message: 'The combo_ticket was deleted'});
    }
}

export const comboTicketController = new ComboTicketController();