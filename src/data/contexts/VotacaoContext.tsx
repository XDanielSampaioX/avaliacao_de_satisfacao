'use client'

import { createContext, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

type VotacaoContextType = {
    enquete: TiposVotosProps[];
    fetchVotos: () => Promise<void>,
    postVotos: (votos: TipoLocalVotacaoProps) => Promise<void>;
    putVotos: (votos: TiposVotosProps) => Promise<void>;
};

type TipoLocalVotacaoProps = {
    id: number;
    nome_enquete: string;
    prazo_votacao: string;
    local_enquete: string;
}

type TiposVotosProps = {
    id: number;
    muito_insatisfeito: number;
    insatisfeito: number;
    moderado: number;
    satisfeito: number;
    muito_satisfeito: number;
    totalVotos: number;
    local_votacao: TipoLocalVotacaoProps
};

const VotacaoContext = createContext<VotacaoContextType>({
    enquete: [],
    fetchVotos: async () => { },
    postVotos: async () => { },
    putVotos: async () => { },
});

export const VotacaoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [enquete, setEnquete] = useState<TiposVotosProps[]>([]);
    const [userIp, setUserIp] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchUserIp = async () => {
        const response = await fetch('../../api/get_Ip');
        const data = await response.json();
        setUserIp(data.ip);
    };

    const fetchVotos = async () => {
        const { data, error } = await supabase
            .from('satisfacao')
            .select(`*,local_votacao (id, nome_enquete, prazo_votacao, local_enquete)`);
        if (error) {
            console.error("Erro ao buscar votos do Supabase:", error);
            setErrorMessage("Erro ao buscar votos.");
        } else if (data) {
            setEnquete(data); // Atualiza o estado com os dados retornados
        }
    };

    useEffect(() => {
        fetchUserIp();
        fetchVotos();
    }, []); // Array de dependências vazio para que seja executado apenas uma vez

    const postVotos = async (props: TipoLocalVotacaoProps) => {
        const { data, error } = await supabase.from('local_votacao').insert([{ ...props }]).select();
        if (error) {
            console.log("Erro ao inserir voto:", error);
            setErrorMessage("Erro ao inserir voto.");
        } else if (data) {
            setEnquete((prev) => [...prev, ...data]);
        }
    };

    const putVotos = async (props: TiposVotosProps) => {
        if (!window.localStorage.getItem("ip")) {
            window.localStorage.setItem("ip", userIp!);
            const { error } = await supabase
                .from('satisfacao')
                .update({
                    muito_insatisfeito: props.muito_insatisfeito,
                    insatisfeito: props.insatisfeito,
                    moderado: props.moderado,
                    satisfeito: props.satisfeito,
                    muito_satisfeito: props.muito_satisfeito,
                    totalVotos: (props.muito_insatisfeito ?? 0) + (props.insatisfeito ?? 0) +
                        (props.moderado ?? 0) + (props.satisfeito ?? 0) + (props.muito_satisfeito ?? 0),
                    local_votacao_id: props.local_votacao.id
                })
                .eq('id', props.id);

            if (error) {
                console.log("Erro ao atualizar votos no banco de dados:", error);
                setErrorMessage("Erro ao atualizar votos.");
            } else {
                setEnquete(prevVotos =>
                    prevVotos.map(voto => voto.id === props.id ? { ...voto, ...props } : voto)
                );
                fetchVotos();
            }
        } else {
            window.alert("Só é possível votar apenas uma vez!");
            fetchVotos();
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
