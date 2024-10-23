import { IconDownload } from "@tabler/icons-react";

// app/enquete/[id]/page.tsx
const ExportButton = ({id}: {id: number}) => {
        const handleExport = () => {
        window.location.href = `/api/export?id=${id}`; // Redireciona para a rota de exportação
    };

    return (
        <div className="w-full">
            <button className="w-full flex justify-center items-center gap-2 bg-zinc-300 rounded-md hover:bg-zinc-400 px-3 py-2" onClick={handleExport}>
                <IconDownload/>
                <span>Exportar</span>
            </button>
        </div>
    );
};

export default ExportButton;
