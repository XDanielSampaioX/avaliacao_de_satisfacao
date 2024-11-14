'use client';

import DataValidade from "@/components/DataValidade";
import Votos from "@/components/Votos";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext } from "react";
import VotacaoContext from "../../../contexts/VotacaoContext";

export default function EnquetePage() {
    const { id } = useParams(); // Pega o ID da URL
    const { enquete } = useContext(VotacaoContext);

    // Filtra a enquete com o ID correspondente
    const enqueteID = enquete.find((item) => item.id === Number(id));

    return (
        <div className={`container h-screen`}>
            {!enqueteID ? (
                <div role="status" className="animate-pulse pt-1">
                    <div className="flex items-center justify-center h-48 bg-gray-300 rounded-md mx-1">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-y-1 m-1 pb-1">
                        <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700"></div>
                        <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700"></div>
                        <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700"></div>
                        <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700"></div>
                        <div className="h-16 w-full bg-gray-300 rounded-md dark:bg-gray-700"></div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <Image className="w-full object-cover" width={300} height={300} src={"/assets/universidade_fortaleza.jpeg"} alt={"logo_unifor"} priority={true}></Image>
                    <div className="h-full flex flex-col">
                        <div className="flex flex-col justify-center mx-1">
                            <DataValidade data_enquete={enqueteID.local_votacao.inicio_votacao}></DataValidade>
                            <div className="text-3xl font-bold">
                                {enqueteID.local_votacao.nome_enquete}
                            </div>
                            <div className="text-md py-2">
                                {enqueteID.local_votacao.local_enquete}
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-between items-center m-auto">
                            {!window.localStorage.getItem(`botaoClicado_/enquete/${id}`) ? (
                                <ul className="w-full" key={enqueteID.id}>
                                    <li>
                                        <Votos id={enqueteID.id} categoria={"Muito Satisfeito"} imagem={"/assets/muito_satisfeito.jpeg"}></Votos>
                                    </li>
                                    <li>
                                        <Votos id={enqueteID.id} categoria={"Satisfeito"} imagem={"/assets/satisfeito.jpeg"}></Votos>
                                    </li>
                                    <li>
                                        <Votos id={enqueteID.id} categoria={"Moderado"} imagem={"/assets/moderado.jpeg"}></Votos>
                                    </li>
                                    <li>
                                        <Votos id={enqueteID.id} categoria={"Insatisfeito"} imagem={"/assets/insatisfeito.jpeg"}></Votos>
                                    </li>
                                    <li>
                                        <Votos id={enqueteID.id} categoria={"Muito Insatisfeito"} imagem={"/assets/muito_insatisfeito.jpeg"}></Votos>
                                    </li>
                                </ul>
                            ) :
                                <div className="w-72 h-72 relative">
                                    <Image className="object-cover" src={"/assets/moema2.png"} alt={"moema"} fill priority={true}></Image>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
