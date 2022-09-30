import {Request, Response} from 'express'
import { QueryResult } from 'pg'
import {pool} from '../database'


export const getPuestoSalarioMasAlto = async ( req:Request, res:Response) :Promise<Response>  => {
    const query = `SELECT id, nombre
                 FROM rol where id in ( SELECT rol FROM empleado ORDER BY salario desc limit 1)`; 

    const response:  QueryResult = await pool.query( query );
    return res.json( response.rows ) ;
}

export const getPuestoSalarioMasBajo = async ( req:Request, res:Response) :Promise<Response>  => {
    const query = `SELECT id, nombre
        FROM rol where id in ( SELECT rol FROM empleado ORDER BY salario asc limit 1)`; 

    const response:  QueryResult = await pool.query( query );
    return res.json( response.rows ) ;
}
