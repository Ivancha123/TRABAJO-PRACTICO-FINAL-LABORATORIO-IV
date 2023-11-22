import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

class SeatController {
    public async list(req: Request, res: Response){
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM seats');
        res.json(rows[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM seats WHERE id_seat = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0][0]);
        }
        res.status(404).json({text: 'The seat doesn´t exists'});
    }

    public async getSeatByRoom(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM seats WHERE seat_status = 0 and id_room = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0]);
        }
        res.status(404).json({text: 'The seat doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO seats set ?', [req.body]);
        res.json({message: 'seat saved'});
    }

    public async createSeat (req: Request, res: Response): Promise<void>{
        await pool.query('call create_seat('[req.body],')' );
        res.json({message: 'seat created'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE seats set ? WHERE id_seat = ?', [req.body, id]);
        res.json({text: 'The seat was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM seats WHERE id_seat = ?', [id]);
        res.json({message: 'The seat was deleted'});
    }
}

export const seatController = new SeatController();