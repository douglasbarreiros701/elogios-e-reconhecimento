import { Request, Response, NextFunction } from "express"




export function ensureAdmin(resquest: Request, response: Response, next: NextFunction){
    // Verificar se o usuário é um admin
    const admin = true

    if(admin){
        return next()
    }

    return response.status(401).json({
        error: "Unauthorized",
    })
}