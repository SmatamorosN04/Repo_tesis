import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions{
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html}: SendEmailOptions) => {
    try{
        const { data, error} = await resend.emails.send({
            from: 'SeguridadCiudadana <onboarding@resend.dev>',
            to,
            subject,
            html,
        });

        if ( error){
            console.error('Error al enviar email con resend', error)
            throw new Error(error.message);
        }

        return data;
    }catch(err){
        console.error('error interno en mailSerrvice:',err)
        throw err;
    }
};