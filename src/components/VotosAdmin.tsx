import VotosContext from "@/data/contexts/VotacaoContext";
import Image from "next/image";
import { useContext} from "react";

interface VotosProps {
    id: number;
    quantidadeVotos: number;
    categoria: string;
    imagem: string;
    porcentagemVotos: number;
}

export default function Votos(props: VotosProps) {
    return (
        <div className="flex items-center justify-between border border-zinc-300 p-2 rounded-md">
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
        </div>
    )
}