import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

class MovieController {
    public async list(req: Request, res: Response){
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM movies');
        res.json(rows[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM movies WHERE id_movie = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0][0]);
        }
        res.status(404).json({text: 'The movie doesn´t exists'});
    }  

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO movies set ?', [req.body]);
        res.json({message: 'movie saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE movies set ? WHERE id_movie = ?', [req.body, id]);
        res.json({text: 'The movie was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM movies WHERE id_movie = ?', [id]);
        res.json({message: 'The movie was deleted'});
    }
}

export const movieController = new MovieController();