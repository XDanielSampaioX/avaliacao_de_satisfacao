'use client'
import React, { useState } from 'react';
import supabase from '@/config/supabaseClient';
import { User as SupabaseUser } from '@supabase/auth-js'; // Importe o tipo User do Supabase
import DeviceIdentifier from '../Teste';

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
        <div>
            <h1>Autenticação com Supabase</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user ? (
                <div>
                    <p>Usuário autenticado: {user.email}</p>
                </div>
            ) : (
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
            <DeviceIdentifier/>
        </div>
    );
};

export default Login;
