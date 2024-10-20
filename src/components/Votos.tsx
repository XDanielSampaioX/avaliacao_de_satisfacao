import VotosContext from "@/data/contexts/VotacaoContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface VotosProps {
    id: number;
    quantidadeVotos: number;
    categoria: string;
    imagem: string;
    porcentagemVotos: number;
}

export default function Votos(props: VotosProps) {
    const { enquete, putVotos } = useContext(VotosContext);
    const pathname = usePathname();
    const [botaoClicado, setBotaoClicado] = useState(false);

    useEffect(() => {
        // Verifica se o botão foi clicado ao carregar a página e se a rota corresponde à rota atual
        const isClicked = localStorage.getItem(`botaoClicado_${pathname}`) === 'true';
        setBotaoClicado(isClicked);
    }, [pathname, enquete]);

    // Função para atualizar os votos com base na categoria
    const handleVote = () => {
        // Marca o botão como clicado e armazena essa informação no localStorage, associando à rota atual
        setBotaoClicado(true);
        localStorage.setItem(`botaoClicado_${pathname}`, 'true');

        // Procura pelo item de votos correspondente no array
        const votoAtual = enquete.find(voto => voto.id === props.id);

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
                default:
                    console.log("Categoria de voto não encontrada");
                    return;
            }

            // Atualiza o total de votos
            novosVotos.totalVotos += 1;

            // Chama a função para atualizar o contexto com os novos votos
            putVotos(novosVotos);
        } else {
            console.log("Categoria de voto não encontrada");
        }
    };

    // Verifica se o botão deve ser desativado com base na rota atual e no estado do botão
    const shouldDisableButton = botaoClicado;

    return (
        <button
            onClick={handleVote}
            className="flex w-full justify-between p-3 border-zinc-300 border rounded-md"
            disabled={shouldDisableButton}
        >
            {shouldDisableButton ?
            <div>
                <span>Obrigador por votar</span>
            </div> : (
                <>
                    <div className="text-start">
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
                            priority
                        />
                    </div>
                </>
            )}
        </button>
    );
}
