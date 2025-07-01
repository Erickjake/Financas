import type { Action, Financa, State } from "./FinancasModel";

const calcularResumo = (financas: Financa[]) => {
    const resumo = financas.reduce((acc, financa) => {
        if (financa.tipo === 'receita') {
            acc.receitas += financa.valor;
        } else {
            acc.despesas += financa.valor;
        }
        return acc;
    }, { receitas: 0, despesas: 0 });

    return { ...resumo, total: resumo.receitas - resumo.despesas };
};

export const financasReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "DELETE_FINANCA": {
            const novasFinancas = state.financas.filter(f => f.id !== action.payload);
            return {
                ...state,
                financas: novasFinancas,
                ...calcularResumo(novasFinancas) // Recalcula o resumo
            };
        }

        case 'ADD_FINANCA': {
            const novasFinancas = [...state.financas, action.payload];
            return {
                ...state,
                financas: novasFinancas,
                ...calcularResumo(novasFinancas)
            }
        }
        case 'UPDATE_FINANCA': {
            const novasFinancas = state.financas.map(f => f.id === action.payload.id ? action.payload : f)
            return {
                ...state,
                financas: novasFinancas,
                ...calcularResumo(novasFinancas)

            }
        }
        default:
            return state;
    }
}