import type { Metadata } from "next";
import "./globals.css";
import { VotacaoContextProvider } from "@/data/contexts/VotacaoContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <VotacaoContextProvider>
        <body>
          {children}
        </body>
      </VotacaoContextProvider>
    </html>
  );
}
