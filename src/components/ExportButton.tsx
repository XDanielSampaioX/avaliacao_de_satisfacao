import { IconDownload } from "@tabler/icons-react";

// app/enquete/[id]/page.tsx
const ExportButton = ({id}: {id: number}) => {
        const handleExport = () => {
        window.location.href = `/api/export?id=${id}`; // Redireciona para a rota de exportação
    };

    return (
        <div className="pb-3">
            <button className="flex justify-center items-center gap-2 bg-zinc-300 rounded-full hover:bg-zinc-400 px-3 py-1 mr-auto" onClick={handleExport}>
                <IconDownload/>
                <span>Exportar</span>
            </button>
        </div>
    );
};

export default ExportButton;
