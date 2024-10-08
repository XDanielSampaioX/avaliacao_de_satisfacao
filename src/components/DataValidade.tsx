interface DataValidadeProps {
    data_enquete: string
}

export default function DataValidade(props : DataValidadeProps) {
    return (
        <>
            <span className="flex justify-center items-center">Avotação é possivel até {props.data_enquete}</span>
        </>
    )
};
