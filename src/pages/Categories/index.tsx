import { useContext, useState } from "react";
import Layout from "../../Layout";
import styles from './styles.module.css'
import { FinancasContexts } from "../../contexts/FinancasContext/FinancasContextProvider";
import type { Financa } from "../../models/FinancasModel";
export default function Categories() {
    const { state, removerFinanca, atualizarFinanca } = useContext(FinancasContexts)
    const { financas } = state
    const [editId, setEditId] = useState<number | null>(null)
    const [edit, setEdit] = useState<Financa | null>(null)

    const dateFormatter = new Intl.DateTimeFormat('pt-BR');

    const handleEditClick = (financa: Financa) => {
        setEditId(financa.id)
        setEdit({ ...financa })
    }
    const handleCancel = () => {
        setEditId(null)
        setEdit(null)
    }

    const handleSaveClick = () => {
        if (edit) {
            atualizarFinanca(edit)
            setEdit(null)
            setEditId(null)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (edit) {
            const { name, value } = e.target
            setEdit({
                ...edit,
                [name]: name === 'valor' ? parseFloat(value) : value
            })
        }
    }

    const handleDelete = (id: number) => {
        removerFinanca(id)
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
                            <>
                                {editId === f.id ? (
                                    <tr className={styles.tr} key={`editing-${f.id}`}>
                                        <td className={styles.td}>{f.id}</td>
                                        <td className={styles.td}>
                                            <input
                                                title="Categoria"
                                                type="text"
                                                name="categoria"
                                                value={edit?.categoria || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                title="Descrição"
                                                type="text"
                                                name="descricao"
                                                value={edit?.descricao || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <input
                                                title="Valor"
                                                type="number"
                                                name="valor"
                                                value={edit?.valor || 0}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <select title="Tipo" name="tipo" value={edit?.tipo || ''} onChange={handleInputChange}>
                                                <option value="receita">Receita</option>
                                                <option value="despesa">Despesa</option>
                                            </select>
                                        </td>
                                        <td className={styles.td}>{dateFormatter.format(new Date(f.data))}</td>
                                        <td className={styles.td}>
                                            <button type="button" className={styles.button} onClick={handleSaveClick}>Salvar</button>
                                            <button type="button" className={styles.button} onClick={handleCancel}>Cancelar</button>
                                        </td>
                                    </tr>
                                ) : (

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
                                            <button type="button" className={styles.button} onClick={() => handleEditClick(f)} > Editar</button>
                                        </td>
                                    </tr >
                                )}
                            </>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Nenhum registro de finança encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Layout >
    );
}