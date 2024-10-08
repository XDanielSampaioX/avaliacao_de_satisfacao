interface DataValidadeProps {
    data_enquete: string
}

export default function DataValidade(props : DataValidadeProps) {
    return (
        <>
            <span>Avotação é possivel até {props.data_enquete}</span>
        </>
    )
};
