import { useContext } from "react";
import Layout from "../../Layout";
import styles from './styles.module.css'
import { FinancasContexts } from "../../contexts/FinancasContext/FinancasContextProvider";
import type { Financa } from "../../models/FinancasModel";
export default function Categories() {
    const { state, removerFinanca, atualizarFinanca } = useContext(FinancasContexts)
    const { financas } = state

    const dateFormatter = new Intl.DateTimeFormat('pt-BR');


    const handleDelete = (id: number) => {
        removerFinanca(id)
    }
    const handleUpdate = (financas: Financa) => {
        atualizarFinanca(financas)
    }
    // Ajuste conforme necessário para acessar categorias a partir do array financas
    // Exemplo: const categoriasArray = financas.map(f => f.categoria);
    return (
        <Layout>
            <h2>Minhas Finanças (Histórico/Categorias)</h2>
            <table className="financas-table"> {/* Opcional: Adicione uma classe para estilização específica */}
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Categoria</th> {/* Título mais claro para a coluna de categoria */}
                        <th className={styles.th}>Descrição</th>
                        <th className={styles.th}>Valor</th> {/* Adicionado coluna para valor */}
                        <th className={styles.th}>Tipo</th> {/* Se quiser mostrar o tipo */}
                        <th className={styles.th}>Data</th> {/* Se quiser mostrar a data */}
                        <th className={styles.th}>Ações</th> {/* Mantido para futuras ações como editar/excluir */}
                    </tr>
                </thead>
                <tbody>
                    {financas.length > 0 ? (
                        financas.map(f => (
                            <tr className={styles.tr} key={f.id}>
                                <td className={styles.td}>{f.id}</td>
                                <td className={styles.td}>{f.categoria}</td>
                                <td className={styles.td}>{f.descricao}</td>
                                <td className={styles.td}>R$ {f.valor ? f.valor.toFixed(2) : '0.00'}</td> {/* Formata o valor */}
                                <td className={styles.td}>{f.tipo}</td>
                                <td className={styles.td}>{dateFormatter.format(new Date(f.data))}</td>
                                <td className={styles.td}>
                                    {/* Aqui você pode adicionar botões de Ações, como Editar ou Excluir */}
                                    <button type="button" className={styles.button} onClick={() => handleDelete(f.id)}>Excluir</button>
                                    <button type="button" className={styles.button} onClick={() => handleUpdate(f)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Nenhum registro de finança encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Layout>
    );
}