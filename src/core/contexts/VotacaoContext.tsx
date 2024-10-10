import { createContext, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

type TiposVotosProps = {
    id: number,
    nome_enquete: string,
    muito_insatisfeito: number,
    insatisfeito: number,
    moderado: number,
    satisfeito: number,
    muito_satisfeito: number,
    totalVotos: number,
    created_at: string
}

type VotosContextType = {
    votos: TiposVotosProps[],
    putVotos: (votos: TiposVotosProps) => Promise<void>;
}

type VotosContextProps = {
    children: React.ReactNode;
}

const VotosContext = createContext<VotosContextType>({
    votos: [],
    putVotos: async () => { },
});

export const VotosContextProvider = ({ children }: VotosContextProps) => {
    // Inicializa o estado com um array de TiposVotosProps corretamente tipado
    const [votos, setVotos] = useState<TiposVotosProps[]>([]);

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
            .select();

        if (data) {
            setVotos(data as TiposVotosProps[]);   // Preenche o estado com os votos recebidos e garante a tipagem correta
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

        if (!window.localStorage.getItem("ip")) {
            window.localStorage.setItem("ip", userIp!);
            const { error } = await supabase
                .from('satisfacao')
                .update([{
                    muito_insatisfeito: props.muito_insatisfeito,
                    insatisfeito: props.insatisfeito,
                    moderado: props.moderado,
                    satisfeito: props.satisfeito,
                    muito_satisfeito: props.muito_satisfeito,
                    totalVotos: props.muito_insatisfeito + props.insatisfeito + props.moderado + props.satisfeito + props.muito_satisfeito,
                }])
                .eq('id', props.id);  // Atualiza o registro com o ID correspondente

            if (error) {
                console.log("Erro ao atualizar votos no banco de dados:", error);
            } else {
                // Atualiza o estado local, substituindo o voto atualizado
                setVotos(prevVotos =>
                    prevVotos.map(voto => voto.id === props.id ? props : voto)
                );
            }
            return;
        } else {
            window.alert("Só é possível votar apenas uma vez!");
            return;
        }
    }

    return (
        <VotosContext.Provider value={{ votos, putVotos }}>
            {children}
        </VotosContext.Provider>
    );
};

export default VotosContext;