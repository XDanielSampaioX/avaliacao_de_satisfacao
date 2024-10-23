'use client';

import DataValidade from "@/components/DataValidade";
import VotosAdmin from "@/components/VotosAdmin";
import VotacaoContext from "@/data/contexts/VotacaoContext";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import ExportButton from "@/components/ExportButton";
import TelaLogin from "@/components/TelaLogin";
import Image from "next/image";
import Link from "next/link";
import QRCode from 'qrcode'

export default function EnquetePage() {
    const { id } = useParams(); // Pega o ID da URL
    const { enquete } = useContext(VotacaoContext);
    const [qrCodeUrl, setQrCodeUrl] = useState('');


    // Filtra a enquete com o ID correspondente
    const enqueteID = enquete.find((item) => item.id === Number(id));

    // Função para calcular a porcentagem de votos
    const calcularPorcentagem = (quantidadeVotosSatisfacao: number) => {
        return enqueteID && enqueteID.totalVotos > 0 ? +((quantidadeVotosSatisfacao / enqueteID.totalVotos) * 100).toFixed(2) : 0;
    };

    async function QRCodeGenerator(props: any) {
        const link = `https://avaliacao-de-satisfacao-lovat.vercel.app/enquete/${props}}`
        try {
            const url = await QRCode.toDataURL(link);
            setQrCodeUrl(url);
        } catch (err) {
            console.error('Erro ao gerar QR Code:', err);
        }
    }

    // <Link className="bg-blue-500 text-white font-bold my-5 py-2 px-4 rounded-md" href={`/enquete/${enqueteID.id}`}>{`Enquete/${enqueteID.id}`}</Link>

    return (
        <TelaLogin>
            {!enqueteID ? (
                <div role="status" className="max-w-sm animate-pulse mx-auto">
                    <div className="flex items-center justify-center h-48 bg-gray-300 rounded sm:w-96 m-1">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700 m-0.5"></div>
                    <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700 m-0.5"></div>
                    <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700 m-0.5"></div>
                    <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700 m-0.5"></div>
                    <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700 m-0.5"></div>
                </div>
            ) : (
                <div className="container">
                    <div className="w-full">
                        <Image className="w-full object-cover" width={300} height={300} src={"/assets/universidade_fortaleza.jpeg"} alt={"logo_unifor"} priority={true}></Image>
                    </div>
                    <div className="p-2">
                        <DataValidade data_enquete={enqueteID.local_votacao.inicio_votacao}></DataValidade>
                        <div className="text-3xl font-bold">
                            {enqueteID.local_votacao.nome_enquete}
                        </div>
                        <div className="text-md">
                            {enqueteID.local_votacao.local_enquete}
                        </div>
                        <div className="flex justify-center items-center gap-x-2 pt-2">
                            <ExportButton id={enqueteID.id} />
                            <button className="w-full bg-blue-500 text-white p-2 rounded-md" onClick={() => QRCodeGenerator(`https://avaliacao-de-satisfacao-lovat.vercel.app/enquete/${enqueteID.id}}`)}>
                                Gerar QR Code
                            </button>
                        </div>
                        {qrCodeUrl && (
                            <div className="flex justify-center w-full m-auto py-2">
                                <a
                                    href={qrCodeUrl}
                                    download="qrcode.png"
                                    className="bg-blue-700 text-white p-2"
                                >
                                    <img src={qrCodeUrl} alt="QR Code" />
                                </a>
                            </div>
                        )}
                        <ul key={enqueteID.id}>
                            <li>
                                <VotosAdmin id={enqueteID.id} quantidadeVotos={enqueteID.muito_insatisfeito ?? 0} categoria={"Muito Insatisfeito"} imagem={"/assets/muito_insatisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.muito_insatisfeito)}></VotosAdmin>
                            </li>
                            <li>
                                <VotosAdmin id={enqueteID.id} quantidadeVotos={enqueteID.insatisfeito ?? 0} categoria={"Insatisfeito"} imagem={"/assets/insatisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.insatisfeito)}></VotosAdmin>
                            </li>
                            <li>
                                <VotosAdmin id={enqueteID.id} quantidadeVotos={enqueteID.moderado ?? 0} categoria={"Moderado"} imagem={"/assets/moderado.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.moderado)}></VotosAdmin>
                            </li>
                            <li>
                                <VotosAdmin id={enqueteID.id} quantidadeVotos={enqueteID.satisfeito ?? 0} categoria={"Satisfeito"} imagem={"/assets/satisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.satisfeito)}></VotosAdmin>
                            </li>
                            <li>
                                <VotosAdmin id={enqueteID.id} quantidadeVotos={enqueteID.muito_satisfeito ?? 0} categoria={"Muito Satisfeito"} imagem={"/assets/muito_satisfeito.jpeg"} porcentagemVotos={calcularPorcentagem(enqueteID.muito_satisfeito)}></VotosAdmin>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </TelaLogin>
    );
}
