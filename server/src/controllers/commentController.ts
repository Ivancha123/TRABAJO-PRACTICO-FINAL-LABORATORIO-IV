import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket } from 'mysql2';

class CommentController {
    public async list(req: Request, res: Response){
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM comments');
        res.json(rows[0]);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT * FROM comments WHERE id_comment = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0][0]);
        }
        res.status(404).json({text: 'The comment doesn´t exists'});
    }

    public async getByMovieId(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const rows = await pool.query<RowDataPacket[][]>('SELECT p.user_name as user_name, c.date as date, c.comment as comment FROM comments c inner join persons p on c.id_person = p.id_person WHERE id_movie = ?',[id]);
        if(rows.length > 0){
            return res.json(rows[0]);
        }
        res.status(404).json({text: 'The comment doesn´t exists'});
    }    

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO comments set ?', [req.body]);
        res.json({message: 'comment saved'});
    }

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE comments set ? WHERE id_comment = ?', [req.body, id]);
        res.json({text: 'The comment was updated '});
    }

    public async delete (req: Request, res: Response ): Promise<void>{
        const {id} = req.params;
        await pool.query('DELETE FROM comments WHERE id_comment = ?', [id]);
        res.json({message: 'The comment was deleted'});
    }
}

export const commentController = new CommentController();