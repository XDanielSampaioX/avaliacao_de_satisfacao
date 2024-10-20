interface DataValidadeProps {
    data_enquete: string
}

export default function DataValidade(props: DataValidadeProps) {
    const date = new Date(props.data_enquete);

    // Extrair dia, mês e ano
    const day = String(date.getDate()).padStart(2, '0'); // Garante que o dia tenha 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`; // Formato desejado

    return (
        <>
            <span className="flex justify-center items-center text-zinc-400">Inicio das votações: {formattedDate}</span>
        </>
    )
};
