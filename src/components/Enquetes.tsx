import Link from "next/link";


interface TiposVotosProps {
    id: number;
    nomeEnquete: string
    totalVotos: number;
}

export default function Enquetes(props: TiposVotosProps) {
    return (
        <div>
            <Link href={`/enquete/${props.id}`}>
                <div className="flex flex-col border-b pl-3 p-2 border-gray-200">
                    <div className="text-xl">{props.nomeEnquete}</div>
                    <div className="text-xs">{props.totalVotos ? `${props.totalVotos} votos` : "Sem votos"}</div>
                </div>
            </Link>
        </div>
    );
}
