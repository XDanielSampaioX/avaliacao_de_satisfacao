'use client'

import Votos from "@/components/Votos";
import VotacaoContext from "@/data/contexts/VotacaoContext";
import { useParams } from "next/navigation";
import { useContext } from "react";

export default function EnquetePage() {
    const { id } = useParams(); // Pega o ID da URL
    const { enquete } = useContext(VotacaoContext);

    // Filtra a enquete com o ID correspondente
    const enqueteID = enquete.find((item) => item.id === Number(id));

    // Verifica se a enquete foi encontrada
    if (!enqueteID) {
        return <p>Enquete não encontrada.</p>;
    }

    // Função para calcular a porcentagem de votos
    const calcularPorcentagem = (quantidadeVotosSatisfacao: number) => {
        return enqueteID.totalVotos > 0 ? +((quantidadeVotosSatisfacao / enqueteID.totalVotos) * 100).toFixed(2) : 0;
    };

    return (
        <ul key={enqueteID.id}>
            <li>
                <Votos quantidadeVotos={enqueteID.muito_insatisfeito} categoria={"Muito Insatisfeito"} imagem={"/assets/muito_insatisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.muito_insatisfeito)}></Votos>
            </li>
            <li>
                <Votos quantidadeVotos={enqueteID.insatisfeito} categoria={"Insatisfeito"} imagem={"/assets/insatisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.insatisfeito)}></Votos>
            </li>
            <li>
                <Votos quantidadeVotos={enqueteID.moderado} categoria={"Moderado"} imagem={"/assets/moderado.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.moderado)}></Votos>
            </li>
            <li>
                <Votos quantidadeVotos={enqueteID.satisfeito} categoria={"Satisfeito"} imagem={"/assets/satisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.satisfeito)}></Votos>
            </li>
            <li>
                <Votos quantidadeVotos={enqueteID.muito_satisfeito} categoria={"Muito Satisfeito"} imagem={"/assets/muito_satisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.muito_satisfeito)}></Votos>
            </li>
        </ul>
    );
}