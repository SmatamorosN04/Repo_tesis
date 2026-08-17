import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import { supabase } from '../lib/supabase.js';
export interface AuthenticatedRequest extends Request{
    user?:{
        id: number;
        email: string;
    };
}

interface JwtPayload {
    id: number;
    email: string;
}

export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(401).json({ error: 'acceso denegado token noi proporcionado'});
        return;
    }

    try{
        const secret = process.env.JWT_SECRET || 'secret_key';
        const decoded = jwt.verify(token, secret) as JwtPayload;

      const { data: user, error} =await supabase
            .from('users')
            .select('id, email')
            .eq('id',decoded.id)
            .maybeSingle()

        if (error || !user){
            res.status(401).json({ error: 'usuario no encontrado o inactivo'});
            return;
        }

        req.user = user;
        next();
    } catch(error){
        res.status(403).json({ error: 'token invalido o expirado'})
    }
}

export const requireRegistereedUser = (req: any, res: Response, next: NextFunction) => {
    if ( req.user && req.user.role === 'guest'){
        return res.status(403).json({
            message: 'Esta funcion requiere registrar una cuenta completa'
        })
    }
}