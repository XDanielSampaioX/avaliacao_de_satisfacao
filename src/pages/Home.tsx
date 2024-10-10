import VotosContext from "@/core/contexts/VotacaoContext";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
    const { votos } = useContext(VotosContext);

    return (
        <div className="relative h-screen">
            <h2 className="text-2xl border-b-2 border-gray-400">Suas enquetes</h2>
            <ul>
                {votos.map((voto, index) => (
                    <li key={index} className="text-xl block border-b-2 border-gray-400">
                        {voto.nome_enquete} - Total de Votos: {voto.totalVotos}
                    </li>
                ))}
            </ul>
            <Link href="/NovaVotacao">
                <IconCirclePlusFilled className="absolute bottom-2 right-3 w-10 h-10 text-blue-500" />
            </Link>
        </div>
    );
}
