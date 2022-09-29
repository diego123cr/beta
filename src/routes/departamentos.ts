import express from 'express'
import * as departamentoServices from '../service/departamentoServices'

const router = express.Router()

router.get('/departamentos', departamentoServices.getDepartamentos )
router.get('/departamento/:id', departamentoServices.getDepartamentoPorId )
router.post('/creardepartamento',  departamentoServices.crearDepartamento )



export default router

    // try{   
    //     //const newDepartamentoEntry = toNewDepartamentoEntry( req.body)
    //     //const addedDepartamentoEntry = departamentoServices.addDepartamento( newDepartamentoEntry)
    //     //res.json( addedDepartamentoEntry )
    // } catch (e: any) {
    //     res.status(400).send(e.message)
    // }