export type FinancasModel = {
  id: number;
  descricao: string;
  valor: number;
  data: Date;
  categoria: string;
  tipo?: string;
};

export interface FormDataType {
  descricao: string;
  valor: string; // Explicitamente string
  data: string; // Explicitamente string
  categoria: string;
  tipo: "entrada" | "saida"; // Garantindo os tipos literais
}
