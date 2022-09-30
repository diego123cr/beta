import {Request, Response} from 'express'
import { QueryResult } from 'pg'
import {pool} from '../database'


export const getEmpleados = async ( req:Request, res:Response) :Promise<Response>  => {
    const response:  QueryResult = await pool.query('SELECT * FROM empleado where borrado_en is null');
    return res.json( response.rows ) ;
}

export const getEmpleadoPorId = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = parseInt(  req.params.id )
    const response:  QueryResult = await pool.query('SELECT * FROM empleado where id = $1', [id]);
    return res.json( response.rows ) ;
}

export const crearEmpleado = async ( req:Request, res:Response) :Promise<Response>  => {
   const nombre = req.body.nombre
   const rol = req.body.rol
   const departamento = req.body.departamento
   const salario = req.body.salario
    
   if( await esSalarioValidoNuevoEmpleado( salario, rol ) ){ 
        await  pool.query('INSERT INTO empleado ( nombre, rol, departamento, salario ) VALUES ($1, $2, $3, $4)',
        [nombre, rol, departamento, salario]);

        return res.json({'Estado': 'Empleado creado'})
    } else {
        return res.json({'Estado': 'Empleado no creado salario invalido'})
    }
}


export const modificarEmpleadoRol = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id
    const rol = req.body.rol

    await  pool.query('UPDATE empleado SET rol = $2 where id = $1;', [id,rol]);
    return res.json({'Estado': 'Rol del empleado modificado'})
 }


 export const modificarEmpleadoDepartamento = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id
    const departamento = req.body.departamento

    await  pool.query('UPDATE empleado SET departamento = $2 where id = $1;', [id,departamento]);
    return res.json({'Estado': 'Departamento del empleado modificado'})
 }


 export const modificarEmpleadoSalario = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id
    const salario = req.body.salario

    if( await esSalarioValido( salario, id ) ){ 
        await  pool.query('UPDATE empleado SET salario = $2 where id = $1;', [id,salario]);
        return res.json({'Estado': 'Salario del empleado modificado'})
    } else {
        return res.json({'Estado': 'Empleado no modificado salario invalido'})
    }
 }


 export const eliminarEmpleado = async ( req:Request, res:Response) :Promise<Response>  => {
    const id = req.body.id
    const fecha = new Date();

    await  pool.query('UPDATE empleado SET borrado_en = $2 where id = $1;', [id,fecha]);
    return res.json({'Estado': 'Departamento del empleado modificado'})
 }


  export const esSalarioValido = async ( salario: number, idEmpleado:number ) :Promise<boolean>  => {
    const query = `SELECT salario_minimo, salario_maximo 
                    FROM rol where id in ( SELECT rol FROM empleado WHERE id = $1 )`
    const response:  QueryResult = await pool.query( query, [idEmpleado] );

    const salMin = response.rows[0].salario_minimo
    const salMax = response.rows[0].salario_maximo

    var esValido = false 
    if( salario >=salMin && salario <= salMax ){
        esValido = true
    }
    return esValido;
}

export const esSalarioValidoNuevoEmpleado = async ( salario: number, rol:number  ) :Promise<boolean>  => {
    const query = `SELECT salario_minimo, salario_maximo FROM rol where id = $1`
    const response:  QueryResult = await pool.query( query, [rol] );

    console.log("rrrtyuytuguytuytut",  response.rows[0].salario_minimo )
    const salMin = response.rows[0].salario_minimo
    const salMax = response.rows[0].salario_maximo

    var esValido = false 
    if( salario >=salMin && salario <= salMax ){
        esValido = true
    }
    return esValido;
}
