import Cabecalho from "../components/Cabecalho";
import DataValidade from "../components/DataValidade";
import Main from "../components/Main";
import { VotosContextProvider } from "@/core/contexts/VotacaoContext";

export default function Home() {
  return (
    <div className="boxed m-auto">
      <VotosContextProvider>
        <Cabecalho />
        <DataValidade data_enquete={"2024"} />
        <Main />
      </VotosContextProvider>
    </div>
  )
}
