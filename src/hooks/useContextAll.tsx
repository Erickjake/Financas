import { useContext } from "react";
import { FinancasContexts } from "../contexts/FinancasContext/FinancasContextProvider";

export default function useContextAll() {
    const context = useContext(FinancasContexts);
    return context;
}

export function useFinancasContext() {
    const context = useContext(FinancasContexts);
    if (!context) {
        throw new Error('useFinancasContext must be used within a FinancasProvider');
    }
    return context;
}