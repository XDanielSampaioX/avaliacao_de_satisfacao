'use client';

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
    prazo_votacao: string;
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
    ip: string[];
    local_votacao: TipoLocalVotacaoProps;
};

const VotacaoContext = createContext<VotacaoContextType>({
    enquete: [],
    fetchVotos: async () => {},
    postVotos: async () => {},
    putVotos: async () => {},
});

export const VotacaoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [enquete, setEnquete] = useState<TiposVotosProps[]>([]);
    const [userIp, setUserIp] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchUserIp = async () => {
        try {
            const response = await fetch('/api/get_Ip');
            const data = await response.json();
            setUserIp(data.ip);
        } catch (error) {
            console.error("Erro ao buscar IP do usuário:", error);
        }
    };

    const fetchVotos = async () => {
        try {
            const { data, error } = await supabase
                .from('satisfacao')
                .select(`*,local_votacao (id, nome_enquete, prazo_votacao, local_enquete)`);
            if (error) throw error;
            setEnquete(data || []);
        } catch (error) {
            console.error("Erro ao buscar votos do Supabase:", error);
            setErrorMessage("Erro ao buscar votos.");
        }
    };

    useEffect(() => {
        fetchUserIp();
        fetchVotos();
    }, []);

    const postVotos = async (props: TipoLocalVotacaoProps) => {
        try {
            const { data: localData, error: localError } = await supabase
                .from('local_votacao')
                .insert([props])
                .select();
            if (localError) throw localError;

            const { data: satisfacaoData, error: satisfacaoError } = await supabase
                .from('satisfacao')
                .insert([{ local_votacao_id: localData[0].id }]) // Ajustar conforme necessário
                .select();
            if (satisfacaoError) throw satisfacaoError;

            setEnquete((prev) => [...prev, ...satisfacaoData]);
            fetchVotos();
        } catch (error) {
            console.error("Erro ao inserir voto:", error);
            setErrorMessage("Erro ao inserir voto.");
        }
    };

    const putVotos = async (props: TiposVotosProps) => {
        // Garante que props.ip seja um array válido
        const existingIps = props.ip || [];

        if (existingIps.includes(userIp || "")) {
            window.alert("Só é possível votar apenas uma vez!");
            return;
        }

        try {
            const updatedIps = [...existingIps, userIp || ""];
            const { error } = await supabase
                .from('satisfacao')
                .update({
                    muito_insatisfeito: props.muito_insatisfeito,
                    insatisfeito: props.insatisfeito,
                    moderado: props.moderado,
                    satisfeito: props.satisfeito,
                    muito_satisfeito: props.muito_satisfeito,
                    totalVotos: props.muito_insatisfeito + props.insatisfeito +
                        props.moderado + props.satisfeito + props.muito_satisfeito,
                    local_votacao_id: props.local_votacao.id,
                    ip: updatedIps
                })
                .eq('id', props.id);
            
            if (error) throw error;

            setEnquete(prevVotos =>
                prevVotos.map(voto => voto.id === props.id ? { ...voto, ...props, ip: updatedIps } : voto)
            );
            fetchVotos();
        } catch (error) {
            console.error("Erro ao atualizar votos no banco de dados:", error);
            setErrorMessage("Erro ao atualizar votos.");
        }
    };

    return (
        <VotacaoContext.Provider value={{ enquete, fetchVotos, postVotos, putVotos }}>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {children}
        </VotacaoContext.Provider>
    );
};

export default VotacaoContext;
