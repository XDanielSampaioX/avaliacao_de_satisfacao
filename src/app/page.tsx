'use client'

import VotacaoContext from "@/data/contexts/VotacaoContext";
import { useContext } from "react";
import Enquetes from "../components/Enquetes";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import Link from "next/link";
import React from 'react';
import Login from "@/components/TelaLogin";

export default function Home() {
  const { enquete } = useContext(VotacaoContext);

  return (
    <Login>
      <div className="container bg-zinc-200 rounded-md w-full">
          <div className="text-xl shadow-sm border-b border-gray-400">
            <h2 className="p-2 pl-5">Suas enquetes</h2>
          </div>
          <div>
            {enquete.map((item) => (
              <Enquetes key={item.id} id={item.id} nomeEnquete={item.local_votacao.nome_enquete} local_enquete={item.local_votacao.local_enquete} totalVotos={item.totalVotos} />
            ))}
          </div>
          <Link href="/novaVotacao">
            <IconCirclePlusFilled className="ml-auto mt-2 w-12 h-12 text-blue-500" />
          </Link>
        </div>
    </Login>
    
  );
}
