import { IconArrowLeft, IconCircleCheckFilled, IconPhotoUp } from "@tabler/icons-react";
import Link from "next/link";

export default function NovaVotacao() {
    return (
        <div className="flex flex-col h-screen w-full m-auto relative">
            <div className="flex w-full justify-start p-3 gap-3 border-b-2 border-gray-200 bg-white fixed top-0">
                <Link href="/Home">
                    <IconArrowLeft />
                </Link>
                <span>Nova Votação</span>
            </div>
            <div className="py-16 gap-5">
                <div className="flex justify-between px-2 my-1">
                    <input className="border border-spacing-1 rounded-md p-1" type="text" placeholder="Questão" />
                    <label htmlFor="imagem_questao">
                        <IconPhotoUp className="text-blue-500" />
                    </label>
                    <input className="hidden" type="file" name="imagem_questao" id="imagem_questao" />
                </div>
                <input className="mx-2 p-1 border border-spacing-1 rounded-md" type="text" placeholder="Descricão" />
                <div className="flex justify-between px-2">
                    <span>Prazo de Votação</span>
                    <input type="datetime-local" />
                </div>
                <button>
                    <IconCircleCheckFilled className="text-blue-500 w-12 h-12 bottom-2 right-3 fixed" />
                </button>
            </div>
        </div>
    )
};
