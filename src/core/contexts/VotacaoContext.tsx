import { createContext, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

type TiposVotosProps = {
    id : number,
    muito_insatisfeito: number,
    insatisfeito: number,
    moderado: number,
    satisfeito: number,
    muito_satisfeito: number,
    totalVotos: number,
}

type VotosContextType = {
    votos: TiposVotosProps,
    putVotos: (votos: TiposVotosProps) => Promise<void>;
}

type VotosContextProps = {
    children: React.ReactNode;
}

const VotosContext = createContext<VotosContextType>({
    votos: {
        id: 0,
        muito_insatisfeito: 0,
        insatisfeito: 0,
        moderado: 0,
        satisfeito: 0,
        muito_satisfeito: 0,
        totalVotos: 0,
    },
    putVotos: async () => { },
});

export const VotosContextProvider = ({ children }: VotosContextProps) => {
    const [votos, setVotos] = useState<TiposVotosProps>({
        id: 0,
        muito_insatisfeito: 0,
        insatisfeito: 0,
        moderado: 0,
        satisfeito: 0,
        muito_satisfeito: 0,
        totalVotos: 0,
    });

    const [id, setId] = useState<number | null>(null); // Armazena o ID do registro de votos

    const [userIp, setUserIp] = useState<string | null>(null);

    // Função para buscar o IP do usuário
    const fetchUserIp = async () => {
        const response = await fetch('/api/get_Ip');
        const data = await response.json();
        setUserIp(data.ip);
    };

    // Função para buscar votos do Supabase
    const fetchVotos = async () => {
        const { data, error } = await supabase
            .from('satisfacao')
            .select()
            .single(); // Assumindo que só há um registro

        if (data) {
            setVotos(data);   // Preenche o estado com os votos recebidos
            setId(data.id);   // Armazena o ID do registro
            console.log(data);
        }
        if (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserIp();
        fetchVotos();
    }, []);

    // Função para atualizar votos no Supabase
    const putVotos = async (props: TiposVotosProps) => {

        if (!userIp) {
            console.log("IP do usuário não encontrado.");
            return;
        }

        // Verifica se o IP já votou
        const { data: existingVote } = await supabase
            .from('satisfacao')
            .select('*')
            .eq('ip', userIp);

        if (existingVote && existingVote.length > 0) {
            console.log("Este IP já votou.");
            return; // Bloqueia o voto
        }

        if (id) {
            // Atualiza os votos no banco de dados com base no ID
            const { error } = await supabase
                .from('satisfacao')
                .update([{
                    muito_insatisfeito: props.muito_insatisfeito,
                    insatisfeito: props.insatisfeito,
                    moderado: props.moderado,
                    satisfeito: props.satisfeito,
                    muito_satisfeito: props.muito_satisfeito,
                    ip: userIp,
                }])
                .eq('id', props.id);  // Atualiza o registro com o ID correspondente

            if (error) {
                console.log("Erro ao atualizar votos no banco de dados:", error);
            } else {
                // Atualiza o estado local após a atualização bem-sucedida
                setVotos(props);
            }
        } else {
            console.log("ID do registro não encontrado!");
        }
    }

    return (
        <VotosContext.Provider value={{ votos, putVotos }}>
            {children}
        </VotosContext.Provider>
    );
};

export default VotosContext;
