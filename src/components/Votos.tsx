import VotosContext from "@/core/contexts/VotacaoContext";
import Image from "next/image";
import { useContext } from "react";

interface VotosProps {
    quantidadeVotos: number;
    categoria: string;
    imagem: string;
    porcentagemVotos: number;
}

export default function Votos(props: VotosProps) {
    const { votos, putVotos } = useContext(VotosContext);

    // Função para atualizar os votos com base na categoria
    const handleVote = () => {
        // Procura pelo item de votos correspondente no array baseado na categoria
        const votoAtual = votos.find(voto => {
            switch (props.categoria) {
                case "Muito Insatisfeito": return voto.muito_insatisfeito;
                case "Insatisfeito": return voto.insatisfeito;
                case "Moderado": return voto.moderado;
                case "Satisfeito": return voto.satisfeito;
                case "Muito Satisfeito": return voto.muito_satisfeito;
            }
        });

        if (votoAtual) {
            const novosVotos = { ...votoAtual };

            // Incrementa o voto na categoria correspondente
            switch (props.categoria) {
                case "Muito Insatisfeito":
                    novosVotos.muito_insatisfeito += 1;
                    break;
                case "Insatisfeito":
                    novosVotos.insatisfeito += 1;
                    break;
                case "Moderado":
                    novosVotos.moderado += 1;
                    break;
                case "Satisfeito":
                    novosVotos.satisfeito += 1;
                    break;
                case "Muito Satisfeito":
                    novosVotos.muito_satisfeito += 1;
                    break;
            }

            // Atualiza o total de votos
            novosVotos.totalVotos += 1;

            // Chama a função para atualizar o contexto com os novos votos
            putVotos(novosVotos);
        } else {
            console.log("Categoria de voto não encontrada");
        }
    };

    return (
        <button onClick={handleVote} className="flex items-center justify-between p-3 border-zinc-300 border-2 rounded-md">
            <div>
                <h3 className="text-xl">{props.categoria}</h3>
                <span className="text-sm">
                    {props.quantidadeVotos} votos, {props.porcentagemVotos}%
                </span>
            </div>
            <div>
                <Image
                    className="rounded-full"
                    src={props.imagem}
                    alt={"Avaliacao"}
                    width={50}
                    height={50}
                />
            </div>
        </button>
    );
}
