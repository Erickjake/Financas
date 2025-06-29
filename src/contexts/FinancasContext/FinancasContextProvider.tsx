// src/contexts/FinancasContext.tsx (ou o caminho do seu arquivo)

import { useState, useEffect } from "react"; // IMPORTANTE: Adicionado useEffect
import type { FinancasStateModel } from "../../models/FinancasStateModel";
import type { FinancasModel } from "../../models/FinancasModel";
import { FinancasContext, type FinancasContextType } from "./index"; // Ajuste o caminho se necessário

const LOCAL_STORAGE_KEY = 'minhasFinancas';

export const FinancasProvider = ({ children }: { children: React.ReactNode }) => {
    // 1. Estado que gerencia todo o modelo de estado das finanças
    const [financasState, setFinancasState] = useState<FinancasStateModel>(() => {
        try {
            const storedFinancas = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedFinancas) {
                const parsedFinancas: FinancasModel[] = JSON.parse(storedFinancas)
                parsedFinancas.forEach(f => {
                    if (typeof f.data === 'string') {
                        f.data = new Date(f.data)
                    }
                })

                let totalEntradas = 0
                let totalSaidas = 0
                parsedFinancas.forEach(f => {
                    if (f.tipo === 'entrada') {
                        totalEntradas += f.valor
                    } else {
                        totalSaidas += f.valor
                    }
                })
                const saldo = totalEntradas - totalSaidas;
                return {
                    financas: parsedFinancas,
                    totalEntradas,
                    totalSaidas,
                    saldo,
                }
            }
        } catch (error) {
            console.error("Erro ao carregar do localStorage:", error);
        }
        return {
            financas: [],
            totalEntradas: 0,
            totalSaidas: 0,
            saldo: 0,
            ultimaAtualizacao: undefined,
        }
        // ultimaAtualizacao: undefined, // Se você tem isso no modelo, inicialize aqui
    });

    // 2. Função adicionarTransacao: apenas atualiza a lista de financas
    const adicionarTransacao = (novaTransacao: FinancasModel) => {
        setFinancasState(prevState => {
            // Gerar o ID da transação aqui se ainda não foi feito no Home.jsx
            // (Verifique onde você quer que o ID seja gerado para evitar duplicação ou conflitos)
            const id = novaTransacao.id || (prevState.financas.length > 0 ? Math.max(...prevState.financas.map(f => f.id)) + 1 : 1);

            const transacaoComId = { ...novaTransacao, id };

            // Adiciona a nova transação à lista e retorna o NOVO OBJETO DE ESTADO
            return {
                ...prevState,
                financas: [...prevState.financas, transacaoComId],
            };
        });
        // IMPORTANTE: Os totais e saldo serão recalculados pelo useEffect abaixo!
    };

    // 3. useEffect para recalcular os totais e o saldo
    // Este useEffect será executado toda vez que financasState.financas mudar.
    useEffect(() => {
        let currentTotalEntradas = 0;
        let currentTotalSaidas = 0;

        financasState.financas.forEach(t => {
            if (t.tipo === 'entrada') {
                currentTotalEntradas += t.valor;
            } else if (t.tipo === 'saida') {
                currentTotalSaidas += t.valor;
            }
        });

        const currentSaldo = currentTotalEntradas - currentTotalSaidas;

        setFinancasState(prevState => {
            if (prevState.totalEntradas !== currentTotalEntradas ||
                prevState.totalSaidas !== currentTotalSaidas ||
                prevState.saldo !== currentSaldo) {

                return {
                    ...prevState,
                    totalEntradas: currentTotalEntradas,
                    totalSaidas: currentTotalSaidas,
                    saldo: currentSaldo,
                    ultimaAtualizacao: new Date()
                };
            }
            return prevState;
        });

    }, [financasState.financas]);

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(financasState.financas))
            console.log("Finanças salvas no localStorage:", financasState.financas);
        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
        }
    }, [financasState.financas])
    // 4. O objeto de valor para o contexto
    const contextValue: FinancasContextType = {
        financas: financasState.financas,
        setFinancas: setFinancasState, // setFinancas é o setter do estado completo do provedor
        adicionarTransacao,
        totalEntradas: financasState.totalEntradas,
        totalSaidas: financasState.totalSaidas,
        saldo: financasState.saldo,
    };

    return (
        <FinancasContext.Provider value={contextValue}>
            {children}
        </FinancasContext.Provider>
    );
};