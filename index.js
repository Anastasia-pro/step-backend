import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';


mongoose
    .connect(process.env.MONGODB_URI)
    .then( () => console.log('DB ok'))
    .catch((err) => console.log('DB connect error', err))

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'https://step-academy.netlify.app'
}))
app.get('/login', UserController.checkAuthStatus);
app.post('/login', UserController.login)
app.post('/reg', registerValidation, UserController.register)
app.get('/me', checkAuth, UserController.getMe)


app.listen(process.env.PORT || 3001, (err) => {
    if(err) {
        console.error(err);
    }
    console.log('Server is running on port 3001');
})