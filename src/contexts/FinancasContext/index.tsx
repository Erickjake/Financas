import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FinancasModel } from "../../models/FinancasModel";
import type { FinancasStateModel } from "../../models/FinancasStateModel";

export interface FinancasContextType {
    financas: FinancasModel[];
    setFinancas: Dispatch<SetStateAction<FinancasStateModel>>;
    adicionarTransacao: (novaTransacao: FinancasModel) => void;
    totalEntradas: number;
    totalSaidas: number;
    saldo: number;
    ultimaAtualizacao?: Date;
}

export const FinancasContext = createContext<FinancasContextType>({
    financas: [],
    setFinancas: () => { console.warn('setFinancas utilizado fora do FinancasProvider'); }, // Adicione um aviso
    adicionarTransacao: () => { console.warn('adicionarTransacao utilizado fora do FinancasProvider'); }, // Adicione um aviso
    totalEntradas: 0, // Valor padrão para totalEntradas
    totalSaidas: 0,   // Valor padrão para totalSaidas
    saldo: 0,         // Valor padrão para saldo
})

