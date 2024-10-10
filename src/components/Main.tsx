import Votos from "./Votos";
import { useContext } from "react";
import VotosContext from "@/core/contexts/VotacaoContext";
import Link from "next/link";

export default function Main() {
    const { votos } = useContext(VotosContext);

    // Garantir que há votos disponíveis no array antes de acessá-los
    const votosAtuais = votos.length > 0 ? votos[0] : {
        muito_insatisfeito: 0,
        insatisfeito: 0,
        moderado: 0,
        satisfeito: 0,
        muito_satisfeito: 0
    };

    // Calcular total de votos
    const totalVotos = votosAtuais.muito_insatisfeito + votosAtuais.insatisfeito + votosAtuais.moderado + votosAtuais.satisfeito + votosAtuais.muito_satisfeito;

    // Função para calcular porcentagem
    const calcularPorcentagem = (quantidade: number) => {
        return totalVotos > 0 ? +((quantidade / totalVotos) * 100).toFixed(2) : 0;
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-center">Como você avalia sua satisfação ao ambiente?</h2>

            <div className="flex flex-col justify-center items-center gap-1 py-1">
                {/* Esse valor poderá variar dinamicamente */}
                <span>WC Masculino - térreo Bloco B</span>
                {/* Quantidade total de votos */}
                <span>Total de votos: {totalVotos} Votos</span>
            </div>

            {/* Componentes Votos */}
            <div className="flex flex-1 flex-col">
                <Votos
                    quantidadeVotos={votosAtuais.muito_insatisfeito}
                    categoria={"Muito Insatisfeito"}
                    imagem={"/assets/muito_insatisfeito.jpeg"}
                    porcentagemVotos={calcularPorcentagem(votosAtuais.muito_insatisfeito)}
                />
                <Votos
                    quantidadeVotos={votosAtuais.insatisfeito}
                    categoria={"Insatisfeito"}
                    imagem={"/assets/insatisfeito.jpeg"}
                    porcentagemVotos={calcularPorcentagem(votosAtuais.insatisfeito)}
                />
                <Votos
                    quantidadeVotos={votosAtuais.moderado}
                    categoria={"Moderado"}
                    imagem={"/assets/moderado.jpeg"}
                    porcentagemVotos={calcularPorcentagem(votosAtuais.moderado)}
                />
                <Votos
                    quantidadeVotos={votosAtuais.satisfeito}
                    categoria={"Satisfeito"}
                    imagem={"/assets/satisfeito.jpeg"}
                    porcentagemVotos={calcularPorcentagem(votosAtuais.satisfeito)}
                />
                <Votos
                    quantidadeVotos={votosAtuais.muito_satisfeito}
                    categoria={"Muito Satisfeito"}
                    imagem={"/assets/muito_satisfeito.jpeg"}
                    porcentagemVotos={calcularPorcentagem(votosAtuais.muito_satisfeito)}
                />

                <Link href="/Home">ir pra pagina admin</Link>
            </div>
        </>
    );
}
