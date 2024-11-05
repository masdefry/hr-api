import { prisma } from "../../connection";
import { hashPassword } from "../../utils/hash.password";
import { IAuth } from './../auth.service/types';
import { Role } from '@prisma/client';
import { createToken } from './../../utils/jwt';

export const createUserService = async({ firstName, lastName, email, role, salary, shiftsId }: Pick<IAuth, 'firstName' | 'lastName' | 'email' | 'role' | 'salary' | 'shiftsId'>) => {
    return prisma.$transaction(async(tx) => {
        const prismaRole = role as unknown as Role;
        
        const createdUser = await tx.user.create({
            data: { firstName, lastName, email, password: await hashPassword('abc123'), role: prismaRole, salary, shiftsId }
        })
    
        const token = await createToken(
            {
                id: createdUser?.id, 
                role: role as string
            }
        )
    
        await tx.user.update({
            data: {
                tokenResetPassword: token
            },
            where: {
                id: createdUser.id
            }
        })
    
        return token 
    })
    
} 
