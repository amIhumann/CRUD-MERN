import express from 'express'
import {getUser, login, logout, register} from '../controller/Users.js'
import { verifyToken } from '../middleware/VerifiyToken.js'
import { refreshToken } from '../controller/RefreshToken.js'

const router=express.Router()

router.get('/getUser',verifyToken,getUser)
router.post('/register',register)
router.post('/login',login)
router.get('/token',refreshToken)
router.delete('/logout',logout)

export default router