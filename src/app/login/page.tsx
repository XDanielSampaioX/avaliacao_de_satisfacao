'use client'
import React, { useState } from 'react';
import supabase from '@/config/supabaseClient';
import { User as SupabaseUser } from '@supabase/auth-js'; // Importe o tipo User do Supabase

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<SupabaseUser | null>(null); // Use o tipo do Supabase
    const [error, setError] = useState('');

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
            setError('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold mb-6">Autenticação com Supabase</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <p className="text-lg">Usuário autenticado: <span className="font-bold">{user.email}</span></p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>

    );
};

export default Login;
