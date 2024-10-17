import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('phone', 'Введите правильный номер телефона').isMobilePhone(),
    body('fullName', 'Имя должно состоять минимум из 2 символов').isLength({min: 2}),
    body('avatarUrl').optional().isURL(),
]