import express from "express"
import {db} from "./config/database.js"
import cookieParser from "cookie-parser"
import productRoutes from './routes/index.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app=express()

try {
    await db.authenticate()
    console.log('Database Connected')
} catch (error) {
    console.error('Connection Error:',error)
}

app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(cookieParser())
app.use(express.json())
app.use('/',authRoutes)
app.use('/products',productRoutes)

app.listen(5000,()=>console.log('Server running at http://localhost:5000/'))