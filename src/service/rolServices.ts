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
   const salario = req.body.salario
   
   if(  salario > 0 ){
    await  pool.query('INSERT INTO rol ( nombre, salario ) VALUES ($1, $2)', [nombre, salario]);
    return res.json({'Estado': 'Rol creado'})
   } else{
    return res.json({'Estado': 'Rol no creado, salario invalido'})
   }

}

export const modificarSalarioRol = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id
    const salario = req.body.salario

    if(  esSalarioValido( salario ) ){
        await  pool.query('UPDATE TABLE rol SET salario = $2 where id = $1;', [id,salario]);
        return res.json({'Estado': 'Salario del rol modificado'})
    } else{
        return res.json({'Estado': 'Rol no modificado, salario invalido'})
    }
 }

 function esSalarioValido(sal: number ): boolean {
    var esValido = false 
    if( sal > 0 ){
        esValido = true
    }
    return esValido;
  }