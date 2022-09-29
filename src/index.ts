import express from 'express'
import dotenv from 'dotenv'
//import departamentoRouter  from "./routes/departamentos"
//import rolRouter  from "./routes/roles"

dotenv.config()

const app = express()

app.use( express.json() )
app.use( express.urlencoded({extended: false}))

//app.use(  departamentoRouter )
//app.use(  rolRouter ) 


app.listen( process.env.PORT , ()=> {
    console.log('Server running: ',  process.env.PORT ) 
})