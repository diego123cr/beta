import express from 'express'
import * as departamentoServices from '../service/departamentoServices'

const router = express.Router()

router.get('/departamentos', departamentoServices.getDepartamentos )
router.get('/departamento/:id', departamentoServices.getDepartamentoPorId )
router.post('/creardepartamento',  departamentoServices.crearDepartamento )
router.put('/modificarnombredepartamento',  departamentoServices.crearDepartamento )
router.delete('/modificarnombredepartamento',  departamentoServices.crearDepartamento )

export default router
