import {Request, Response} from 'express'
import { QueryResult } from 'pg'
import {pool} from '../database'
import dotenv from 'dotenv'

const MAX_CANT_DEPS = 5
const MIN_CANT_DEPS = 2
 
export const getDepartamentos = async ( req:Request, res:Response) :Promise<Response>  => {
    const response:  QueryResult = await pool.query('SELECT * FROM departamento');
    return res.json( response.rows ) ;
}

export const getDepartamentoPorId = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = parseInt(  req.params.id )
    const response:  QueryResult = await pool.query('SELECT * FROM departamento where id = $1', [id]);
    return res.json( response.rows ) ;
}

export const crearDepartamento = async ( req:Request, res:Response) :Promise<Response>  => {
   const nombre = req.body.nombre

   if( await cantidadDepartamentos( )  < MAX_CANT_DEPS  ){ 
        await  pool.query('INSERT INTO departamento ( nombre) VALUES ($1)', [nombre]);
        return res.json({'Estado': 'Departamento creado'})
    } else {
        return res.json({'Estado': 'Departamento no creado maximo alcanzado'})
    }
}

export const modificarDepartamentoNOmbre = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id
    const nombre = req.body.nombre

    await  pool.query('UPDATE departamento SET nombre = $2 where id = $1;', [id,nombre]);
    return res.json({'Estado': 'Departamento modificado'})

 }

 export const eliminarDepartamento = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id

    const query = `UPDATE empleado 
    SET departamento =  ( SELECT id FROM departamento where id not in ($1)  ORDER BY RANDOM() limit 1)
     where departamento = $1;`

    await  pool.query( query, [id]);
    await  pool.query('DELETE FROM departamento where id = $1;', [id]);

    return res.json({'Estado': 'Departamento del empleado modificado'})
 }


export const cantidadDepartamentos = async (  ) :Promise<number>  => {
    const query = `SELECT count(*) as cantidad FROM departamento`
    const response:  QueryResult = await pool.query( query );
    const cantidad = response.rows[0].cantidad
    return cantidad;
}

