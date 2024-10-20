'use client'

import VotacaoContext from "@/data/contexts/VotacaoContext";
import { useContext } from "react";
import Enquetes from "../components/Enquetes";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from 'react';
import supabase from '@/config/supabaseClient';
import { User as SupabaseUser } from '@supabase/auth-js'; // Importe o tipo User do Supabase

export default function Home() {
  const { enquete } = useContext(VotacaoContext);

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
      {user ? (
        <div className="relative container">
          <div className="text-xl shadow-sm border-b border-gray-300">
            <h2 className="m-3 pl-5">Suas enquetes</h2>
          </div>
          <div className="">
            {enquete.map((item) => (
              <Enquetes key={item.id} id={item.id} nomeEnquete={item.local_votacao.nome_enquete} totalVotos={item.totalVotos} />
            ))}
          </div>
          <Link href="/NovaVotacao">
            <IconCirclePlusFilled className="absolute bottom-5 right-2 w-12 h-12 text-blue-500" />
          </Link>
        </div>
      ) : (
          <div className="container bg-zinc-300 flex flex-col items-center justify-center px-2">
            <div className=" bg-white rounded-md w-full p-4 gap-3 flex flex-col items-center">
              <h3 className="text-3xl text-black font-semibold">Login</h3>
              <input className="h-10 px-2 w-full rounded-md bg-zinc-100"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input className="h-10 px-2 w-full rounded-md bg-zinc-100"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500">Email ou senha incorretos</p>}
              <button className="bg-blue-600 text-white font-semibold h-10 px-2 w-full rounded-md" onClick={handleLogin}>Login</button>
            </div>
          </div>
      )}
    </div>
  );
}
