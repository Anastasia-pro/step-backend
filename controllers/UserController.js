import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserSchema from '../models/User.js';



export const register = async (req, res)=> {
    try{
     const errors = validationResult(req)
    if(!errors.isEmpty()) {
     return res.status(400).json(errors.array())
    }
 
    const doc = new UserSchema({
     email: req.body.email,
     fullName: req.body.fullName,
     phone: req.body.phone,
     avatarUrl: req.body.avatarUrl
 })
 
     const user = await doc.save()
 
     const token = jwt.sign({
         _id: user._id
     },
         'qaz335577',
         
     {
         expiresIn: '30d'
     }    
     )
 
    res.json({
     ...user._doc,
     token
    })
 }catch (err) {
     console.log(err)
     res.status(500).json({
         message: 'Не удалось зарегистрироваться'
     })
    } 
}

export const checkAuthStatus = async(req, res) => {
    if (req.user) {
        res.json({ authenticated: true });
      } else {
        res.json({ authenticated: false });
      }
}

export const login = async (req,res) => {
    try{
        const user = await UserSchema.findOne({email: req.body.email})


        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const token = jwt.sign({
            _id: user._id
        },
            'qaz335577',
            
        {
            expiresIn: '30d'
        }    
        )
        res.json({
            ...user._doc,
            token
           })
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
       } 
}



export const getMe = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.userId)

        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        res.json({
            ...user._doc,
            
           })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}

