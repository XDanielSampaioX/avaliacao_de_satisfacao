import { VotosContextProvider } from "@/data/contexts/VotacaoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VotosContextProvider>
      <Component {...pageProps} />
    </VotosContextProvider>
  )
}
