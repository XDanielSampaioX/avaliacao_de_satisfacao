'use client';

import React, { useState, useEffect } from 'react';
import supabase from '@/config/supabaseClient';
import { User as SupabaseUser } from '@supabase/auth-js'; // Importe o tipo User do Supabase

interface TelaLoginProps {
    children: React.ReactNode;
}

export default function Login({ children }: TelaLoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<SupabaseUser | null>(null); // Use o tipo do Supabase
    const [error, setError] = useState('');

    // Verifica se o token está no localStorage ao montar o componente
    useEffect(() => {
        const token = window.localStorage.getItem('tokenAcessAdmin');
        if (token) {
            setUser({} as SupabaseUser);
        }
    }, []);

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setUser(null);
        } else {
            setUser(data.user);
            window.localStorage.setItem('tokenAcessAdmin', data.session?.access_token || '');
            setError('');
        }
    };

    return (
        <div>
            {user ? (
                <>
                    {children}
                </>
            ) : (
                <div className="container bg-zinc-200 flex flex-col items-center justify-center px-2">
                    <div className="bg-white rounded-md w-full gap-2 p-4 flex flex-col items-center">
                        <h3 className="text-3xl text-black font-semibold">Login</h3>
                        <form className='flex flex-col gap-3 w-full'>
                            <input
                                className="h-10 px-2 w-full rounded-md bg-zinc-100"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <input
                                className="h-10 px-2 w-full rounded-md bg-zinc-100"
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            {error && <p className="text-red-500">{error}</p>} {/* Usa o estado de erro */}
                            <button
                                className="bg-blue-600 text-white font-semibold h-10 px-2 w-full rounded-md"
                                onClick={handleLogin}
                                type="button" // Define o tipo do botão
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}