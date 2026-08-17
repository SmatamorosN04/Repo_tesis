import type { Request, Response } from "express";
import { supabase } from "../lib/supabase.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import type { AuthenticatedRequest } from "../middlewares/auth.js";

export const register = async (req: Request, res: Response) => {
    try {
        const { user, email, password } = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        const { data: existingUser, error: searchError } = await supabase
            .from('users')
            .select('*')
            .or(`email.eq.${email},username.eq.${user}`)
            .maybeSingle();

        if (searchError) {
            console.error('Error en consulta de búsqueda:', searchError);
            return res.status(500).json({ message: 'Error interno en la base de datos.' });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario o el correo ya están registrados.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const now = new Date().toISOString();

        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    username: user,
                    email: email,
                    password: hashedPassword,
                    updatedAt: now
                },
            ])
            .select('id, username, email')
            .single();

        if (insertError) {
            console.error('Error al crear usuario en Supabase:', insertError);
            return res.status(500).json({ message: 'No se pudo crear el usuario.' });
        }

        return res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: newUser,
        });
    } catch (error: any) {
        console.error('Error en controlador register:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

//////////////////////////////////////////////////////////////

export const login = async ( req: Request, res: Response) => {
    try{
        const { identifier, email, user, password} = req.body;

        const loginInput = identifier || email || user;

        if(!loginInput || !password){
            return res.status(400).json({message: 'usuario/correo y contra son requeridos'});
        }
            const { data: userData, error: userError }= await supabase
            .from('users')
            .select('*')
            .or(`email.eq.${loginInput},username.eq.${loginInput}`)
            .maybeSingle();

            if( userError || !userData){
                return res.status(400).json({message: 'credenciales invalidas'});
            }

            const isPasswordValid = await bcrypt.compare(password, userData.password);

            if(!isPasswordValid){
                return res.status(400).json({ message: 'Credenciales invalidas'});
            }

            const jwtSecret = process.env.JWT_SECRET || 'secret_key';
            const token = jwt.sign(
                {id: userData.id, email: userData.email},
                jwtSecret,
                {expiresIn: '7d'}
            );

            const { password: _, ...userWithoutPassword} = userData;

            return res.status(200).json({
                message: 'Inicio de sesion exitoso',
                token,
                user: userWithoutPassword,
            });
            
        
    }catch (error: any){
        console.error('Error en controlador login:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
        }
};

////////////////////////////////////////////////////////////////////

export const forgotPassword =async (req: Request, res: Response) => {
    try{
        const {email} = req.body;

        if (!email){
            return res.status(400).json({ message: 'El correo electronico es requerido.'});
        }

        const { data: user, error: userError} = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .maybeSingle();

        if (userError || !user){
            return res.status(200).json({ message: 'si el correo existe, se enviaran las instrucciones.'})
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000).toISOString();

        const {error: resetError} =await supabase
        .from('password_resets')
        .insert([{user_id: user.id, token, expires_at: expiresAt}]);

        if (resetError){
            console.error('Error al generar reset token:', resetError);
            return res.status(500).json({ message: 'Error interno en la base de datos.' });
        }
        console.log(`[RESET TOKEN] para ${email}: ${token}`);

        return res.status(200).json({ message: 'si el correo existe se enviaran las instrucciones'});

    } catch (error: any){
        console.error('error en forgotpassword', error);
        return res.status(500).json({ message: 'Error interno del servidor'})
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try{
        const { token, newPassword} = req.body;

        if (!token || !newPassword){
            return res.status(400).json({message: 'el token y la nueva contra son requeridos'});
        }

        const {data: resetRecord, error: resetError} = await supabase
        .from('password_resets')
        .select('*')
        .eq('token', token)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

        if(resetError || !resetRecord){
            return res.status(400).json({message: 'token invalido o expirado'});
        }

        const hashedPassword =await bcrypt.hash(newPassword, 10);
        const now = new Date().toISOString();

        const { error: updateError} = await supabase
        .from('users')
        .update({ password: hashedPassword, updateAt: now})
        .eq('id', resetRecord.user_id);

        if (updateError){
            console.error('Error al actualizar', updateError);
            return res.status(500).json({ message: 'No se pudo actualizar la contra '});
        }

        await supabase
            .from('password_resets')
            .delete()
            .eq('id', resetRecord.id);

            return res.status(200).json({ message: 'contra restablecida exitosamente'})
    } catch (error: any){
        console.error(`Error en resetPassword`, error);
        return res.status(500).json({ message: 'Error interno del servidor.' });     
    }
};

export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const { currentPassword, newPassword}= req.body;
        const userId = req.user?.id;

        if (!currentPassword || !newPassword){
            return res.status(400).json({ message: 'Ambas contras son requeridas'})
        }

        const {data: user, error: userError} = await supabase
            .from('users')
            .select('password')
            .eq('id', userId)
            .maybeSingle();

        if (userError || !user){
            return res.status(404).json({ message: 'Usuario no encontrado'})
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
            if(!isValid){
                return res.status(400).json({ message: 'la contra actual es incorrecta'})
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const now = new Date().toISOString();

            const { error: updateError} = await supabase
                .from('users')
                .update({password: hashedPassword, updateAt: now})
                .eq('id', userId);

            if( updateError){
                console.error('Error al cambiar contraseña:', updateError);
            return res.status(500).json({ message: 'No se pudo cambiar la contraseña.' });
            }

            return res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });

    } catch (error: any){
        console.error('Error en changePassword:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
}


export const getMe = async(req: Request, res: Response) => {
    try{
        const userId = (req as any).user?.id;

        if(!userId){
            return res.status(401).json({message: 'usuario no autenticado'});
        }

        const { data: user, error} = await supabase
            .from('users')
            .select('id, email,username, created_at')
            .eq('id', userId)
            .single();

        if (error || !user){
            return res.status(404).json({message: 'usuario no encontrado'});
        }

        return res.status(200).json({user});
    } catch(error){
        console.error('Error en getMe', error);
        return res.status(500).json({ message: 'error interno del servidor'});
    }
}