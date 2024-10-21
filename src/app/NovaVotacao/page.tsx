'use client'

import VotosContext from "@/data/contexts/VotacaoContext";
import { IconArrowLeft, IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useContext, useState } from "react";


type TipoLocalVotacaoProps = {
    nome_enquete: string;
    inicio_votacao: string;
    local_enquete: string;
}

export default function NovaVotacao() {
    const { postVotos } = useContext(VotosContext);

    const [formData, setFormData] = useState<TipoLocalVotacaoProps>({
        nome_enquete: '',
        inicio_votacao: '',
        local_enquete: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Enviar os dados para o Supabase
        await postVotos(formData);
        // Limpar o formulário após o envio
        setFormData({
            nome_enquete: '',
            inicio_votacao: '',
            local_enquete: '',
        });
    };

    return (
        <div className="container relative">
            <div className="flex w-[375px] p-3 gap-3 border-b-2 border-gray-200">
                <Link href="/">
                    <IconArrowLeft />
                </Link>
                <span>Nova Votação</span>
            </div>
            <form className="py-5 gap-5" onSubmit={handleSubmit}>
                <input
                    className="border border-spacing-1 rounded-md p-1 mx-2 my-1"
                    type="text"
                    name="nome_enquete"
                    value={formData.nome_enquete}
                    onChange={handleChange}
                    placeholder="Questão"
                    required
                />
                <input
                    className="border border-spacing-1 rounded-md p-1 mx-2 my-1"
                    type="text"
                    name="local_enquete"
                    value={formData.local_enquete}
                    onChange={handleChange}
                    placeholder="Local da votação"
                    required
                />
                <div className="flex justify-between p-2">
                    <span>Prazo de Votação</span>
                    <input
                        type="datetime-local"
                        name="inicio_votacao" // Corrigido para o nome correto
                        value={formData.inicio_votacao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    <IconCircleCheckFilled className="text-blue-500 w-12 h-12 bottom-2 right-3 absolute" />
                </button>
            </form>
        </div>
    );
}
