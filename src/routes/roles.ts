import express from 'express'
import * as rolServices from '../service/rolServices'

const router = express.Router()

router.get('/roles', rolServices.getRoles )
router.get('/rol/:id', rolServices.getRolPorId )
router.post('/crearrol',  rolServices.crearRol )
router.post('/modificarsalariorol',  rolServices.modificarSalarioRol )


export default router
