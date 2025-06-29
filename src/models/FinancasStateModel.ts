import type { FinancasModel } from "./FinancasModel";

export type FinancasStateModel = {
  financas: FinancasModel[];
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
  ultimaAtualizacao?: Date;
};
