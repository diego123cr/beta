import express from 'express'
import * as utilitariosServices from '../service/utilitariosServices'

const router = express.Router()

router.get('/puestosalariomasalto', utilitariosServices.getPuestoSalarioMasAlto )
router.get('/puestosalariomasbajo', utilitariosServices.getPuestoSalarioMasBajo )

export default router
