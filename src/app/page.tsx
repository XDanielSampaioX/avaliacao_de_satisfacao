'use client'

import VotacaoContext from "@/data/contexts/VotacaoContext";
import { useContext } from "react";
import Enquetes from "../components/Enquetes";

export default function Home() {
  const { enquete } = useContext(VotacaoContext);

  return (
    <>
      {enquete.map((item) => (
        <Enquetes key={item.id} id={item.id} nomeEnquete={item.local_votacao.nome_enquete} />
      ))}
    </>
  );
}
