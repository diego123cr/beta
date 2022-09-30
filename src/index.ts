import express from 'express'
import dotenv from 'dotenv'
import departamentoRouter  from "./routes/departamentos"
import utilitariosRouter  from "./routes/utilitarios"
import empleadoRouter  from "./routes/empleados"
import rolRouter  from "./routes/roles"
import { getEmpleados } from './service/empleadoServices'

require("dotenv").config({path:'./.env'})

const app = express()

app.use( express.json() )
app.use( express.urlencoded({extended: false}))

app.use(  [departamentoRouter, rolRouter, empleadoRouter, utilitariosRouter] )

app.listen( process.env.PORT , ()=> {
    console.log('Server running: ',  process.env.PORT ) 
})