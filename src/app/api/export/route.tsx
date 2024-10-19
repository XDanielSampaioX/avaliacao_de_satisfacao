// app/api/export/route.ts
import { NextResponse } from 'next/server';
import supabase from '@/config/supabaseClient';

// Define o tipo para os dados de qualquer tabela
type TableData = Record<string, string | number | boolean | null>;

const convertToCSV = (data: TableData[]): string => {
    const headers = Object.keys(data[0]).join(',') + '\n'; // Cabeçalhos CSV
    const rows = data.map(row => Object.values(row).join(',')).join('\n'); // Dados CSV
    return headers + rows; // Combina cabeçalhos e dados
};

export async function GET(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url);
    const localVotacaoId = searchParams.get('id'); // Obtém o ID da query string

    if (!localVotacaoId) {
        return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
    }

    // Obtém os dados da tabela 'satisfacao' usando o ID fornecido
    const { data: satisfacaoData, error: satisfacaoError } = await supabase
        .from('satisfacao')
        .select('*')
        .eq('local_votacao_id', localVotacaoId); // Usando o ID recebido

    if (satisfacaoError) {
        return NextResponse.json({ error: satisfacaoError.message }, { status: 500 });
    }

    // Obtém os dados da tabela 'local_votacao' usando o ID fornecido
    const { data: localVotacaoData, error: localVotacaoError } = await supabase
        .from('local_votacao')
        .select('*')
        .eq('id', localVotacaoId); // Usando o ID recebido

    if (localVotacaoError) {
        return NextResponse.json({ error: localVotacaoError.message }, { status: 500 });
    }

    // Verifica se os dados foram encontrados
    if (!satisfacaoData || !localVotacaoData || satisfacaoData.length === 0 || localVotacaoData.length === 0) {
        return NextResponse.json({ error: 'No data found for the provided ID' }, { status: 404 });
    }

    // Converte as tabelas para CSV
    const satisfacaoCSV = convertToCSV(satisfacaoData);
    const localVotacaoCSV = convertToCSV(localVotacaoData);

    // Combina os CSVs em um único arquivo
    const combinedCSV = `Dados de Satisfação\n${satisfacaoCSV}\n\nDados de Local Votação\n${localVotacaoCSV}`;

    // Define os headers para download
    const response = new Response(combinedCSV, {
        status: 200,
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="export.csv"',
        },
    });

    return response;
}
