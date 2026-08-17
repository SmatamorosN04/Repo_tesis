import * as SecureStore from 'expo-secure-store';
import { apiFetch } from './api';

interface UserData{
    id:number;
    username: string;
    email:string;
    role: 'user'| 'guest'| string;
}
interface LoginResponse {
    message: string;
    token: string;
    user: UserData;
}

interface RegisterResponse { 
    message: string;
    user: { 
        id: number;
        email: string;
        createdAt: string;
    };
}

interface ForgotPasswordResponse{
    message: string;
}

export async function loginUser(identifier: string, password: string): Promise<LoginResponse>{
    const data = await apiFetch<LoginResponse>('/auth/login',{
        method:'POST',
        body: JSON.stringify({user: identifier, password}),
    });
    if (data.token){
        await SecureStore.setItemAsync('access_token', data.token);
    }
    return data;
}

export async function registerUser(username: string, email: string, password: string): Promise<RegisterResponse> {
    const payload = {
        user: username,
        email: email,
        password: password
    };

    return apiFetch<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}

export async function logoutUser(): Promise<void> {
    await SecureStore.deleteItemAsync('access_token');
}

export async function isAuthenticated(): Promise<boolean>{
    const token = await SecureStore.getItemAsync('access_token');
    return !!token;
}

export async function loginGuest(): Promise<LoginResponse>{
    const data =await apiFetch<LoginResponse>('/auth/guest-login',{
        method: 'POST',
    });

    if (data.token) {
        await SecureStore.setItemAsync('access_token', data.token);
    }
    return data;
}

export async function forgotPassword(email:string): Promise<ForgotPasswordResponse>{
    return apiFetch<ForgotPasswordResponse>('/auth/forgot-password',{
        method: 'POST',
        body: JSON.stringify({email}),
    })
}