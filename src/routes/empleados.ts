import express from 'express'
import * as empleadoServices from '../service/empleadoServices'

const router = express.Router()

router.get('/empleados', empleadoServices.getEmpleados )
router.get('/empleado/:id', empleadoServices.getEmpleadoPorId )
router.post('/crearempleado',  empleadoServices.crearEmpleado )
router.put('/modificarempleadorol',  empleadoServices.modificarEmpleadoRol )
router.put('/modificarempleadodepartamento',  empleadoServices.modificarEmpleadoDepartamento )
router.put('/modificarempleadosalario',  empleadoServices.modificarEmpleadoSalario )
router.delete('/eliminarempleado',  empleadoServices.eliminarEmpleado )

export default router