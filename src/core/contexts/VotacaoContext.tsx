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
                }])
                .eq('id', props.id);  // Atualiza o registro com o ID correspondente

            if (error) {
                console.log("Erro ao atualizar votos no banco de dados:", error);
            } else {
                setVotos(props);  // Atualiza o estado local
            }
            return;
        } else {
            window.alert("Só é possivel votar apenas uma vez !");
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
