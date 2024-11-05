import { NextFunction, Request, Response } from 'express';
import { createUserService } from '../../services/hr.service';
import { transporter } from '../../utils/transporter';
import fs from 'fs';
import {compile} from 'handlebars';

export const createUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, role, salary, shiftsId } = req.body

        const token = await createUserService({ firstName, lastName, email, role, salary, shiftsId })
        
        const emailBody = fs.readFileSync('./src/public/email.reset.password.html', 'utf-8')

        let compiledEmailBody:any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody(
            {
                email, 
                url: `http://localhost:3000/reset-password/${token}`
            }
        )

        await transporter.sendMail({
            to: email,
            subject: 'Reset Password Account',
            html: compiledEmailBody
        })

        res.status(201).json({
            error: false, 
            message: 'Create New User Success', 
            data: { firstName, lastName, email, role, salary, shiftsId }
        })
    } catch (error) {
        next(error)
    }
}