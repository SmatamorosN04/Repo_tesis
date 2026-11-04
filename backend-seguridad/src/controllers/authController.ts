import type { Request, Response } from "express";
import { supabase } from "../lib/supabase.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import type { AuthenticatedRequest } from "../middlewares/auth.js";
import { sendEmail } from "../services/mailService.js";

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
                    role: 'user',
                    updatedAt: now
                },
            ])
            .select('id, username, email, role')
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

            if (userData.role === 'guest' || !userData.password){
                return res.status(400).json({ message: 'credenciales invalidas'})
            }
            const isPasswordValid = await bcrypt.compare(password, userData.password);

            if(!isPasswordValid){
                return res.status(400).json({ message: 'Credenciales invalidas'});
            }

            const jwtSecret = process.env.JWT_SECRET || 'secret_key';
           
            const token = jwt.sign(
                {id: userData.id, email: userData.email, role: userData.role || 'user'},
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
        .select('id, email, username')
        .eq('email', email)
        .maybeSingle();

        if (userError || !user){
            return res.status(200).json({ message: 'si el correo existe, se enviaran las instrucciones.'})
        }

        const otpCode = crypto.randomInt(100000, 999999).toString();

        const hashedOtp = await bcrypt.hash(otpCode, 10);

        const expiresAt = new Date(Date.now() + 3600000).toISOString();

        const {error: resetError} =await supabase
        .from('password_resets')
        .insert([{user_id: user.id, token: hashedOtp, expires_at: expiresAt}]);

        if (resetError){
            console.error('Error al generar reset token:', resetError);
            return res.status(500).json({ message: 'Error interno en la base de datos.' });
        }

        try{
            await sendEmail({
                to: user.email,
                subject: 'Tu codigo de recuperacion de contra',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2>Recuperacion de contra</h2>
                        <p>Hola <strong>${user.username || 'usuario'}</strong>.</p>
                        <p>Has solicitado reestablecer tu contra. utiliza el siguiente codigo  OTP:</p>
                        <div style="background-color: #f4f4f5; padding: 14px 28px; display: inline-block; font-size: 28px; font-weight: bold; letter-spacing:5px; border-radius: 8px; margin: 16px 0; color: #111;">
                         ${otpCode}
                    </div>
                    <p style="color: #666; font-size: 13px;">Este codigo expirara en 15 minutos. </p>
                    </div>
                `,
            });
        } catch ( mailError){
            console.error('Error al enviar el correo con Resend:', mailError);
            return res.status(500).json({ message: 'No se pudo enviar el correo de recuperacion.'})
        }

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
        .update({ password: hashedPassword, updatedAt: now})
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
                .update({password: hashedPassword, updatedAt: now})
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

export const guestLogin = async (req: Request, res: Response) => {
    try{
        // Nombre de usuario opcional enviado desde la app ("Modo Invitado").
        const { username } = req.body || {};

        let guestUsername = `invitado_${Math.floor(100000 + Math.random() * 900000)}`;
        if (username && typeof username === 'string') {
            const trimmed = username.trim().slice(0, 20);
            if (trimmed.length >= 3) {
                guestUsername = trimmed;
            }
        }

        // Evitar colisiones de nombre de usuario con cuentas existentes.
        const { data: existing, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('username', guestUsername)
            .maybeSingle();

        if (checkError) {
            console.error('Error al verificar nombre de usuario:', checkError);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }

        if (existing) {
            return res.status(409).json({ message: 'Ese nombre ya está en uso, elige otro.' });
        }

        const now = new Date().toISOString();

        // La columna password es NOT NULL en la base de datos; en invitados se
        // guarda un hash aleatorio imposible de adivinar (nunca se usa para login).
        const randomPassword = await bcrypt.hash(crypto.randomUUID(), 10);

        const { data: guestUser, error: insertError} = await supabase
            .from('users')
            .insert([
                {
                   username: guestUsername,
                   email: `${guestUsername}@temp.local`,
                   password: randomPassword,
                   role:'guest',
                   updatedAt: now
                },
            ])
            .select('id, username, role')
            .single();

        if (insertError){
            console.error('Error al crear usuario invitado', insertError);
            return res.status(500).json({ message: 'NO se pudo iniciar como invitado'})
        }

        const token = jwt.sign(
            {
                id:guestUser.id,
                username: guestUser.username,
                role:guestUser.role
            },
            process.env.JWT_SECRET || 'my_secret',
            {expiresIn:'24h'}
        );

        return res.status(200).json({
            message: 'sesion de invitado iniciada',
            token,
            user: {
                id: guestUser.id,
                username: guestUser.username,
                role:guestUser.role
            }
        });
    } catch(error: any){
        console.error('Error en guestLogin:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
}


