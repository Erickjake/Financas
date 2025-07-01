import { createContext, useEffect, useReducer } from "react";
import type { FinancasCType, Financa, State } from "../../models/FinancasModel";
import { financasReducer } from "../../models/FinancasReducer";

const LOCAL_STORAGE_KEY = 'minhaFinancas'

const initialState: State = {
    financas: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
}


// eslint-disable-next-line react-refresh/only-export-components
export const FinancasContexts = createContext<FinancasCType>({
    state: initialState,
    removerFinanca: () => { },
    atualizarFinanca: () => { },
    adiconarFinanca: () => { },
})

export const FinancasProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(financasReducer, initialState);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.financas))
    }, [state.financas])

    const removerFinanca = (id: number) => {
        const confirmar = window.confirm("Tem certeza que deseja remover?")
        if (confirmar) {
            dispatch({
                type: 'DELETE_FINANCA',
                payload: id
            })
        }
    }
    const atualizarFinanca = (financa: Financa) => {
        dispatch({
            type: 'UPDATE_FINANCA',
            payload: financa
        })
    }
    const adiconarFinanca = (financa: Financa) => {
        dispatch({
            type: 'ADD_FINANCA',
            payload: financa
        })
    }


    return (
        <FinancasContexts.Provider value={{ state, removerFinanca, atualizarFinanca, adiconarFinanca }}>
            {children}
        </FinancasContexts.Provider>
    );
};