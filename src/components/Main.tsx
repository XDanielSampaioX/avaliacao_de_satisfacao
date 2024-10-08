import { IconChartDots3, IconDownload } from "@tabler/icons-react";
import Votos from "./Votos";
import { useContext } from "react";
import VotosContext from "@/core/contexts/VotacaoContext";

export default function Main() {

    const { votos } = useContext(VotosContext);

    // Calcular total de votos
    const totalVotos = votos.muito_insatisfeito + votos.insatisfeito + votos.moderado + votos.satisfeito + votos.muito_satisfeito;

    // Função para calcular porcentagem
    const calcularPorcentagem = (quantidade: number) => {
        return totalVotos > 0 ? +((quantidade / totalVotos) * 100).toFixed(2) : 0;
    }

    return (
        <>
            <h2 className="text-2xl font-bold">Como você avalia sua satisfação ao ambiente?</h2>

            {/* Esse valor poderá variar dinamicamente */}
            <span>WC Masculino - térreo Bloco B</span>

            {/* Quantidade total de votos */}
            <span>{totalVotos} Votos</span>

            {/* Botões de ações */}
            <div className="flex gap-2">
                <button className="flex gap-1 bg-zinc-300 rounded-full px-3 py-1">
                    <IconChartDots3 /> Analítica
                </button>
                <button className="flex gap-1 bg-zinc-300 rounded-full px-3 py-1">
                    <IconDownload />Exportar
                </button>
            </div>

            {/* Componentes Votos */}
            <Votos
                quantidadeVotos={votos.muito_insatisfeito}
                categoria={"Muito Insatisfeito"}
                imagem={"/assets/muito_insatisfeito.jpeg"}
                porcentagemVotos={calcularPorcentagem(votos.muito_insatisfeito)}
                
            />
            <Votos
                quantidadeVotos={votos.insatisfeito}
                categoria={"Insatisfeito"}
                imagem={"/assets/insatisfeito.jpeg"}
                porcentagemVotos={calcularPorcentagem(votos.insatisfeito)}
            />
            <Votos
                quantidadeVotos={votos.moderado}
                categoria={"Moderado"}
                imagem={"/assets/moderado.jpeg"}
                porcentagemVotos={calcularPorcentagem(votos.moderado)}
            />
            <Votos
                quantidadeVotos={votos.satisfeito}
                categoria={"Satisfeito"}
                imagem={"/assets/satisfeito.jpeg"}
                porcentagemVotos={calcularPorcentagem(votos.satisfeito)}
            />
            <Votos
                quantidadeVotos={votos.muito_satisfeito}
                categoria={"Muito Satisfeito"}
                imagem={"/assets/muito_satisfeito.jpeg"}
                porcentagemVotos={calcularPorcentagem(votos.muito_satisfeito)}
            />
        </>
    )
};
