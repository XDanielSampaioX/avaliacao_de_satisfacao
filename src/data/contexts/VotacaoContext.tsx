import { createContext, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

type TiposVotosProps = {
    id?: number;
    nome_enquete: string;
    descricao: string;
    prazo_votacao: string;
    muito_insatisfeito?: number;
    insatisfeito?: number;
    moderado?: number;
    satisfeito?: number;
    muito_satisfeito?: number;
    totalVotos?: number;
};

type VotosContextType = {
    votos: TiposVotosProps[];
    postVotos: (votos: TiposVotosProps) => Promise<void>;
    putVotos: (votos: TiposVotosProps) => Promise<void>;
};

type VotosContextProps = {
    children: React.ReactNode;
};

const VotosContext = createContext<VotosContextType>({
    votos: [],
    postVotos: async () => {},
    putVotos: async () => {},
});

export const VotosContextProvider = ({ children }: VotosContextProps) => {
    const [votos, setVotos] = useState<TiposVotosProps[]>([]);
    const [userIp, setUserIp] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchUserIp = async () => {
        const response = await fetch('/api/get_Ip');
        const data = await response.json();
        setUserIp(data.ip);
    };

    const fetchVotos = async () => {
        const { data, error } = await supabase.from('satisfacao').select();
        if (error) {
            console.log(error);
            setErrorMessage("Erro ao buscar votos.");
        } else if (data) {
            setVotos(data as TiposVotosProps[]);
        }
    };

    useEffect(() => {
        fetchUserIp();
        fetchVotos();
    }, []);

    const postVotos = async (props: TiposVotosProps) => { 
        const { data, error } = await supabase.from('satisfacao').insert([{ ...props ,local_votacao_id:props.id}]).select();
        if (error) {
            console.log("Erro ao inserir voto:", error);
            setErrorMessage("Erro ao inserir voto.");
        } else if (data) {
            setVotos((prev) => [...prev, ...data]);
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
                                (props.moderado ?? 0) + (props.satisfeito ?? 0) + (props.muito_satisfeito ?? 0)
                })
                .eq('id', props.id);

            if (error) {
                console.log("Erro ao atualizar votos no banco de dados:", error);
                setErrorMessage("Erro ao atualizar votos.");
            } else {
                setVotos(prevVotos =>
                    prevVotos.map(voto => voto.id === props.id ? { ...voto, ...props } : voto)
                );
            }
        } else {
            window.alert("Só é possível votar apenas uma vez!");
        }
    };

    return (
        <VotosContext.Provider value={{ votos, postVotos, putVotos }}>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {children}
        </VotosContext.Provider>
    );
};

export default VotosContext;
