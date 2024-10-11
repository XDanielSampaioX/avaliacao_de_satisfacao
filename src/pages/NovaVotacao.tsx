import VotosContext from "@/data/contexts/VotacaoContext";
import { IconArrowLeft, IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useContext, useState } from "react";

interface TiposVotosProps {
    nome_enquete: string;
    descricao: string;
    prazo_votacao: string;
}

export default function NovaVotacao() {
    const { postVotos } = useContext(VotosContext);

    const [formData, setFormData] = useState<TiposVotosProps>({
        nome_enquete: '',
        descricao: '',
        prazo_votacao: ''
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
            descricao: '',
            prazo_votacao: '',
        });
    };

    return (
        <div className="flex flex-col h-screen w-full m-auto relative">
            <div className="flex w-full justify-start p-3 gap-3 border-b-2 border-gray-200 bg-white fixed top-0">
                <Link href="/Home">
                    <IconArrowLeft />
                </Link>
                <span>Nova Votação</span>
            </div>
            <form className="py-16 gap-5" onSubmit={handleSubmit}>
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
                    className="mx-2 p-1 border border-spacing-1 rounded-md"
                    type="text"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Descrição"
                    required
                />
                <div className="flex justify-between px-2">
                    <span>Prazo de Votação</span>
                    <input
                        type="datetime-local"
                        name="prazo_votacao" // Corrigido para o nome correto
                        value={formData.prazo_votacao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    <IconCircleCheckFilled className="text-blue-500 w-12 h-12 bottom-2 right-3 fixed" />
                </button>
            </form>
        </div>
    );
}
