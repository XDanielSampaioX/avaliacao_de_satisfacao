'use client'

import VotacaoContext from "@/data/contexts/VotacaoContext";
import { useContext } from "react";
import Enquetes from "../components/Enquetes";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  const { enquete } = useContext(VotacaoContext);

  return (
    <div className="relative container violet-dark">
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
  );
}
