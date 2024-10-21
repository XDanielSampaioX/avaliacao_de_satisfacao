import Link from "next/link";


interface TiposVotosProps {
    id: number;
    nomeEnquete: string;
    local_enquete: string;
    totalVotos: number;
}

export default function Enquetes(props: TiposVotosProps) {
    return (
        <div>
            <Link href={`/enqueteAdmin/${props.id}`}>
                <div className="flex flex-col border-b pl-3 p-2 border-gray-400">
                    <div className="text-xl">{props.nomeEnquete}</div>
                    <div className="flex justify-between">
                        <div className="text-xs">{props.local_enquete ? `${props.local_enquete}` : "Sem enquete"}</div>
                        <div className="text-xs">{props.totalVotos ? `${props.totalVotos} votos` : "Sem votos"}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
