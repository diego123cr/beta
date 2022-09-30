import express from 'express'
import * as rolServices from '../service/rolServices'

const router = express.Router()

router.get('/roles', rolServices.getRoles )
router.get('/rol/:id', rolServices.getRolPorId )
router.post('/crearrol',  rolServices.crearRol )
router.put('/modificarsalariorol',  rolServices.modificarSalarioRol )
router.delete('/eliminarrol',  rolServices.modificarSalarioRol )

export default router
