import { Response } from 'express';
import { JsonMessages } from '../types/type';
import { PrismaClient, Token_Blacklist } from '@prisma/client';

const prisma = new PrismaClient();

// Application Functions 
/**
 * Returns application response.
 * @param {JsonMessages} object
 * @returns JSON response
 */
export function JsonMessages({ statusCode = 200, message, data = null, _links, res }: JsonMessages): Response<any, Record<string, any>> {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        data,
        _links
    });
}

//Authentication
/**
 * Invalidate current user json web token.
 * @param {string} token
 */

export async function invalidateToken(token: string): Promise<void> {
    await prisma.token_Blacklist.create({ data: { token } });
}


/**
 * Verify current user json web token.
 * @param {string} token
 * @returns boolean
*/
export async function verifyToken(token: string): Promise<boolean> {
    const invalidToken = await prisma.token_Blacklist.findFirst({ where: { token } })

    return invalidToken ? true : false;
}

//Field Validation
//TODO: Ver como separar as validações em funções sem erro de `undefined`