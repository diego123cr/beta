import {Request, Response} from 'express'
import { QueryResult } from 'pg'
import {pool} from '../database'


export const getRoles = async ( req:Request, res:Response) :Promise<Response>  => {
    const response:  QueryResult = await pool.query('SELECT * FROM rol');
    return res.json( response.rows ) ;
}

export const getRolPorId = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = parseInt(  req.params.id )
    const response:  QueryResult = await pool.query('SELECT * FROM rol where id = $1', [id]);
    return res.json( response.rows ) ;
}

export const crearRol = async ( req:Request, res:Response) :Promise<Response>  => {
    const nombre = req.body.nombre
    const salarioMinimo = req.body.salarioMinimo
    const salarioMaximo = req.body.salarioMaximo

    await  pool.query('INSERT INTO rol ( nombre, salario_minimo, salario_maximo ) VALUES ($1, $2, $3)', 
        [nombre, salarioMinimo, salarioMaximo]);
    return res.json({'Estado': 'Rol creado'})

}

export const modificarSalarioRol = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id
    const salarioMinimo = req.body.salarioMinimo
    const salarioMaximo = req.body.salarioMaximo

    await  pool.query('UPDATE rol SET salario_minimo = $2, salario_maximo = $3  where id = $1;', 
        [id, salarioMinimo, salarioMaximo]);
    return res.json({'Estado': 'Salario del rol modificado'})

 }

