import Link from "next/link";


interface TiposVotosProps {
    id: number;
    nomeEnquete: string
}

export default function Enquetes(props: TiposVotosProps) {
    return (
        <>
            <Link href={`/enquete/${props.id}`}>{props.nomeEnquete}</Link>
        </>
    );
}
