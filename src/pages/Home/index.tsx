import { useContext, useState } from "react";
import DefaultInput from "../../components/Input";
import Layout from "../../Layout";
import styles from './styles.module.css'
import type { Financa, FormDataType } from "../../models/FinancasModel";
import DefaultSelect from "../../components/DefaultSelect";
import { FinancasContexts } from "../../contexts/FinancasContext/FinancasContextProvider";
export default function Home() {
    const { adiconarFinanca } = useContext(FinancasContexts)
    const [formData, setFormData] = useState<FormDataType>({
        descricao: '',
        valor: '',
        data: '',
        categoria: '',
        tipo: 'receita',

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
        { value: 'receita', text: 'Receita' },
        { value: 'despesa', text: 'Despesa' },
    ];
    function handleSubmitFinancas(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Validação simples para evitar adicionar valores inválidos
        if (!formData.descricao || !formData.valor || isNaN(parseFloat(formData.valor)) || !formData.categoria || !formData.data || !formData.tipo) {


            alert('Por favor, preencha a descrição e um valor válido.');
            return;
        }
        const dataStringDoForm = formData.data;

        // Substitui os hífens, resultando em '2025/07/02'
        const dataAjustada = dataStringDoForm.replace(/-/g, '/');

        // Agora, o new Date() interpretará no fuso horário local
        const dataCorreta = new Date(dataAjustada);
        const novaTransacao: Financa = {
            id: Date.now(),
            tipo: formData.tipo,
            descricao: formData.descricao,
            valor: parseFloat(formData.valor),
            data: dataCorreta,
            categoria: formData.categoria,
        }

        adiconarFinanca(novaTransacao);
        setFormData({
            descricao: '',
            valor: '',
            data: '',
            categoria: '',
            tipo: 'receita',
        })
        alert('Transacao adiconada com sucesso!')
        console.log(adiconarFinanca)
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