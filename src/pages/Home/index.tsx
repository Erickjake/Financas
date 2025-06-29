import { useContext, useState } from "react";
import DefaultInput from "../../components/Input";
import Layout from "../../Layout";
import styles from './styles.module.css'
import { FinancasContext } from "../../contexts/FinancasContext";
import type { FinancasModel, FormDataType } from "../../models/FinancasModel";
import DefaultSelect from "../../components/DefaultSelect";
export default function Home() {
    const { adicionarTransacao } = useContext(FinancasContext)
    const [formData, setFormData] = useState<FormDataType>({
        descricao: '',
        valor: '',
        data: '',
        categoria: '',
        tipo: 'entrada',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,

        }))
    }

    const categoriaOptions = [
        { value: 'alimentacao', text: 'Alimentação' },
        { value: 'transporte', text: 'Transporte' },
        { value: 'moradia', text: 'Moradia' },
        { value: 'laudos', text: 'Laudos' },
        { value: 'saude', text: 'Saúde' },
        { value: 'educacao', text: 'Educação' },
        { value: 'lazer', text: 'Lazer' },
        { value: 'outros', text: 'Outros' },
    ];
    const tipoOptions = [
        { value: 'entrada', text: 'Entrada' },
        { value: 'saida', text: 'Saída' },
    ];
    function handleSubmitFinancas(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const novaTransacao: FinancasModel = {
            id: Date.now(),
            tipo: formData.tipo,
            descricao: formData.descricao,
            valor: parseFloat(formData.valor),
            data: new Date(formData.data),
            categoria: formData.categoria,
        }

        adicionarTransacao(novaTransacao);
        setFormData({
            descricao: '',
            valor: '',
            data: '',
            categoria: '',
            tipo: 'entrada',
        })
        alert('Transacao adiconada com sucesso!')
        console.log(adicionarTransacao)
    }


    return (
        <Layout>
            <h1>Adicionar Transação</h1>
            <form className={styles.form} onSubmit={handleSubmitFinancas}>
                <DefaultInput labelText="Descrição" type="text" name="descricao" placeholder="Descrição" id={"descricao"} value={formData.descricao} onChange={handleChange} />
                <DefaultInput labelText="Valor" type="number" name="valor" placeholder="Valor" id={"valor"} value={formData.valor} onChange={handleChange} />
                <DefaultInput labelText="Data" type="date" name="data" placeholder="Data" id={"data"} value={formData.data} onChange={handleChange} />
                <DefaultSelect labelText="Categoria" name="categoria" options={categoriaOptions} placeholder="Categoria" id={"categoria"} value={formData.categoria} onChange={handleChange} />
                <DefaultSelect labelText="Tipo" options={tipoOptions} name="tipo" placeholder="Tipo" id={"tipo"} value={formData.tipo} onChange={handleChange} />
                <button type="submit">Adicionar</button>
            </form>
        </Layout>
    )
}