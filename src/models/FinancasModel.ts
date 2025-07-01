export type Financa = {
  id: number;
  categoria: string;
  descricao: string;
  valor: number;
  tipo: "receita" | "despesa";
  data: string | Date;
};

export type Action =
  | { type: "ADD_FINANCA"; payload: Financa }
  | { type: "UPDATE_FINANCA"; payload: Financa }
  | { type: "DELETE_FINANCA"; payload: number };

export type State = {
  financas: Financa[];
};

export type FinancasCType = {
  state: State;
  removerFinanca: (id: number) => void;
  atualizarFinanca: (financa: Financa) => void;
  adiconarFinanca: (financa: Financa) => void;
};
export interface FormDataType {
  descricao: string;
  valor: string; // Explicitamente string
  data: string; // Explicitamente string
  categoria: string;
  tipo: "receita" | "despesa"; // Garantindo os tipos literais
}
