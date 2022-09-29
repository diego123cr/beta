import { Pool  } from "pg";
import dotenv from 'dotenv'

dotenv.config();


export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASS,
    database: process.env.DB,
    port: 5432
})