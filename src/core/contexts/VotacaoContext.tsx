import { createContext, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

type TiposVotosProps = {
    id: number,
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

    const [userIps, setUserIps] = useState<string[]>([]); // Array para armazenar IPs

    // Função para buscar o IP do usuário e adicionar ao array
    const fetchUserIp = async () => {
        try {
            const response = await fetch('/api/get_Ip');
            const data = await response.json();
            
            // Adiciona o novo IP ao array de IPs existentes, se não existir
            setUserIps((prevIps) => {
                if (!prevIps.includes(data.ip)) {
                    return [...prevIps, data.ip];
                }
                return prevIps; // Retorna o array anterior se o IP já existir
            });
        } catch (error) {
            console.error("Erro ao buscar o IP do usuário:", error);
        }
    };

    // Função para buscar votos do Supabase
    const fetchVotos = async () => {
        const { data, error } = await supabase
            .from('satisfacao')
            .select()
            .single(); // Assumindo que só há um registro

        if (data) {
            setVotos(data);   // Preenche o estado com os votos recebidos
        }
        if (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserIp();
        fetchVotos();
    }, []);

    const putVotos = async (props: TiposVotosProps) => {
        if (userIps.length === 0) {
            console.log("Nenhum IP registrado.");
            return;
        }

        // Verifica se o IP já votou
        const { data: existingVote } = await supabase
            .from('satisfacao')
            .select('*')
            .eq('ip', userIps[userIps.length - 1]); // Usando o último IP adicionado

        if (existingVote && existingVote.length > 0) {
            console.log("Este IP já votou.");
            return; // Bloqueia o voto
        }

        // Atualiza os votos no banco de dados
        const { error } = await supabase
            .from('satisfacao')
            .update([{
                muito_insatisfeito: props.muito_insatisfeito,
                insatisfeito: props.insatisfeito,
                moderado: props.moderado,
                satisfeito: props.satisfeito,
                muito_satisfeito: props.muito_satisfeito,
                ip: userIps[userIps.length - 1], // Adiciona o IP ao registro
            }])
            .eq('id', props.id);

        if (error) {
            console.log("Erro ao atualizar votos no banco de dados:", error);
        } else {
            // Atualiza o estado local após a atualização bem-sucedida
            setVotos(props);
        }
    }

    return (
        <VotosContext.Provider value={{ votos, putVotos }}>
            {children}
        </VotosContext.Provider>
    );
};

export default VotosContext;
