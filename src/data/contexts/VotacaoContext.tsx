'use client'

import { createContext, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

type VotacaoContextType = {
    enquete: TiposVotosProps[];
    fetchVotos: () => Promise<void>;
    postVotos: (votos: TipoLocalVotacaoProps) => Promise<void>;
    putVotos: (votos: TiposVotosProps) => Promise<void>;
};

type TipoLocalVotacaoProps = {
    id?: number;
    nome_enquete: string;
    inicio_votacao: string;
    local_enquete: string;
};

type TiposVotosProps = {
    id: number;
    muito_insatisfeito: number;
    insatisfeito: number;
    moderado: number;
    satisfeito: number;
    muito_satisfeito: number;
    totalVotos: number;
    local_votacao: TipoLocalVotacaoProps;
};

const VotacaoContext = createContext<VotacaoContextType>({
    enquete: [],
    fetchVotos: async () => { },
    postVotos: async () => { },
    putVotos: async () => { },
});

export const VotacaoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [enquete, setEnquete] = useState<TiposVotosProps[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Função para buscar votos da tabela 'satisfacao'
    const fetchVotos = async () => {
        const { data, error } = await supabase
            .from('satisfacao')
            .select(`*, local_votacao (id, nome_enquete, inicio_votacao, local_enquete)`);

        if (error) {
            console.error("Erro ao buscar votos do Supabase:", error);
            setErrorMessage("Erro ao buscar votos.");
        } else if (data) {
            setEnquete(data); // Atualiza o estado com os dados retornados
        }
    };

    useEffect(() => {
        fetchVotos();
    }, []); // Executado apenas uma vez no carregamento do componente

    // Função para postar votos na tabela 'local_votacao'
    const postVotos = async (props: TipoLocalVotacaoProps) => {
        const { data, error } = await supabase.from('local_votacao').insert([{ ...props }]).select();

        if (error) {
            console.log("Erro ao inserir voto:", error);
            setErrorMessage("Erro ao inserir voto.");
        } else if (data) {
            console.log("Voto inserido com sucesso:", data);
            setEnquete((prev) => [...prev, ...data]);
            fetchVotos(); // Atualiza a lista de votos após a inserção
        }
    };

    // Função para atualizar votos na tabela 'satisfacao'
    const putVotos = async (props: TiposVotosProps) => {
        const { error } = await supabase
            .from('satisfacao')
            .update({
                muito_insatisfeito: props.muito_insatisfeito,
                insatisfeito: props.insatisfeito,
                moderado: props.moderado,
                satisfeito: props.satisfeito,
                muito_satisfeito: props.muito_satisfeito,
                totalVotos: (props.muito_insatisfeito + props.insatisfeito + props.moderado + props.satisfeito + props.muito_satisfeito),
                local_votacao_id: props.local_votacao.id // Atualiza a referência para local_votacao
            })
            .eq('id', props.id);

        if (error) {
            console.log("Erro ao atualizar votos no banco de dados:", error);
            setErrorMessage("Erro ao atualizar votos.");
        } else {
            // Atualiza o estado local com os novos dados
            setEnquete(prevVotos =>
                prevVotos.map(voto => voto.id === props.id ? { ...voto, ...props } : voto)
            );
            fetchVotos(); // Atualiza a lista de votos após a atualização
        }
    };

    return (
        <VotacaoContext.Provider value={{ enquete, fetchVotos, postVotos, putVotos }}>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {children}
        </VotacaoContext.Provider>
    );
}

export default VotacaoContext;
