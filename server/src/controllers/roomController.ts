import { Request, Response } from 'express';
import pool from '../database';

class RoomController {
    public async list(req: Request, res: Response){
        const rooms = await pool.query('SELECT * FROM rooms');
        res.json(rooms);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rooms = await pool.query('SELECT * FROM rooms WHERE id_room = ?',[id]);
        if(rooms.length > 0){
            return res.json(rooms[0]);
        }
        res.status(404).json({text: 'The room doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO rooms set ?', [req.body]);
        res.json({message: 'room saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE rooms set ? WHERE id_room = ?', [req.body, id]);
        res.json({text: 'The room was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM rooms WHERE id_room = ?', [id]);
        res.json({message: 'The room was deleted'});
    }
}

export const roomController = new RoomController();