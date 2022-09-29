import {Request, Response} from 'express'
import { QueryResult } from 'pg'
import {pool} from '../database'


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
   const response:  QueryResult = await  pool.query('INSERT INTO departamento ( nombre) VALUES ($1)', [nombre]);
    response.rows
   return res.json({'Estado': 'Departamento creado'})
}


/*export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({id,date,weather, visibility})=>{
        return{
            id, date, weather, visibility
        }
    })
}

export const addDiary = (newDiaryEntry: newDepartamentontry): DepartamentoEntry =>  {
        const newDiary = {
            id: Math.max( ...diaries.map( d => d.id)) + 1,
            ...newDiaryEntry
        }
        diaries.push( newDiary )
        return newDiary
    }
*/