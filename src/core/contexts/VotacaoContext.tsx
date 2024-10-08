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
    ip: string[] // Adiciona um campo para armazenar os ip
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
        ip: [] // Inicializa o array de ip vazio por padrão
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
        ip: [] // Inicializa o array de ip vazio por padrão
    });

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
            // Verifica se o array 'ip' existe, senão inicializa como array vazio
            const updatedData = {
                ...data,
                ip: data.ip || [] // Garante que 'ip' seja um array
            };
            setVotos(updatedData);   // Preenche o estado com os votos recebidos
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

        // Verifica se o array de ip está definido e o IP já está na lista
        if (votos.ip && votos.ip.includes(userIp)) {
            console.log("Este IP já votou.");
            return; // Bloqueia o voto se o IP já está na lista
        }

        // Adiciona o novo IP ao array de ip
        const novosip = [...(votos.ip || []), userIp]; // Garante que 'votos.ip' seja um array

        // Atualiza os votos e o array de ip no banco de dados
        const { error } = await supabase
            .from('satisfacao')
            .update([{
                muito_insatisfeito: props.muito_insatisfeito,
                insatisfeito: props.insatisfeito,
                moderado: props.moderado,
                satisfeito: props.satisfeito,
                muito_satisfeito: props.muito_satisfeito,
                ip: novosip // Atualiza o array de ip
            }])
            .eq('id', props.id);  // Atualiza o registro com o ID correspondente

        if (error) {
            console.log("Erro ao atualizar votos no banco de dados:", error);
        } else {
            // Atualiza o estado local com os novos votos e o array de ip atualizado
            setVotos({ ...props, ip: novosip });
        }
    }

    return (
        <VotosContext.Provider value={{ votos, putVotos }}>
            {children}
        </VotosContext.Provider>
    );
};

export default VotosContext;
