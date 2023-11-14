import { Request, Response } from 'express';
import pool from '../database';

class TicketSeatController {
    public async list(req: Request, res: Response){
        const ticketSeat = await pool.query('SELECT * FROM tickets_seats');
        res.json(ticketSeat[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const ticketSeat = await pool.query('SELECT * FROM tickets_seats WHERE id_ticket = ?',[id]);
        if(ticketSeat.length > 0){
            return res.json(ticketSeat[0]);
        }
        res.status(404).json({text: 'The ticket_seat doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO tickets_seats set ?', [req.body]);
        res.json({message: 'ticket_seat saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE tickets_seats set ? WHERE id_ticket = ?', [req.body, id]);
        res.json({text: 'The ticket_seat was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM tickets_seats WHERE id_ticket = ?', [id]);
        res.json({message: 'The ticket_seat was deleted'});
    }
}

export const ticketSeatController = new TicketSeatController();