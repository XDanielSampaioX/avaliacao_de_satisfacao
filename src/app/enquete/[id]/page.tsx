'use client'

import VotacaoContext from "@/data/contexts/VotacaoContext";
import { useParams } from "next/navigation";
import { useContext } from "react";

export default function EnquetePage() {
    const { id } = useParams(); // Pega o ID da URL
    const { enquete } = useContext(VotacaoContext);

    // Filtra a enquete com o ID correspondente
    const enqueteSelecionada = enquete.find((item) => item.id === Number(id));

    return (
        <>
            {enqueteSelecionada ? (
                <ul key={enqueteSelecionada.id}>
                    <li>
                        <span>Enquete ID: {enqueteSelecionada.id}</span>
                    </li>
                    <li>
                        <span>Insatisfeito: {enqueteSelecionada.insatisfeito}</span>
                    </li>
                    <li>
                        <span>Muito Insatisfeito: {enqueteSelecionada.muito_insatisfeito}</span>
                    </li>
                    <li>
                        <span>Moderado: {enqueteSelecionada.moderado}</span>
                    </li>
                    <li>
                        <span>Satisfeito: {enqueteSelecionada.satisfeito}</span>
                    </li>
                    <li>
                        <span>Muito Satisfeito: {enqueteSelecionada.muito_satisfeito}</span>
                    </li>
                </ul>
            ) : (
                <p>Enquete não encontrada.</p>
            )}
        </>
    );
}
