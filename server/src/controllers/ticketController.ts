import { Request, Response } from 'express';
import pool from '../database';

class TicketController {
    public async list(req: Request, res: Response){
        const tickets = await pool.query('SELECT * FROM tickets');
        res.json(tickets[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const tickets = await pool.query('SELECT * FROM tickets WHERE id_ticket = ?',[id]);
        if(tickets.length > 0){
            return res.json(tickets[0]);
        }
        res.status(404).json({text: 'The ticket doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO tickets set ?', [req.body]);
        res.json({message: 'ticket saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE tickets set ? WHERE id_ticket = ?', [req.body, id]);
        res.json({text: 'The ticket was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM tickets WHERE id_ticket = ?', [id]);
        res.json({message: 'The ticket was deleted'});
    }
}

export const ticketController = new TicketController();