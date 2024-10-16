type TipoLocalVotacaoProps = {
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
    local_votacao_id: number;
};