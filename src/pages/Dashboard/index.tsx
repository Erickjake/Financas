import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import Layout from "../../Layout";
import useContextAll from "../../hooks/useContextAll";
import { useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import styles from './styles.module.css'
import Card from "../../components/Card";

const generateDynamicColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const hue = (i * 360) / numColors;
        colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
};
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
export default function Dashboard() {
    const { state } = useContextAll()
    const { financas } = state

    const dadosFinanceiros = useMemo(() => {
        const receitas = financas.filter(f => f.tipo === 'receita')
        const despesa = financas.filter(f => f.tipo === 'despesa')

        const totalReceitas = receitas.reduce((acc, f) => acc + f.valor, 0)
        const totalDespesas = despesa.reduce((acc, f) => acc + f.valor, 0)
        const saldoFinal = totalReceitas - totalDespesas

        const despesaPorCategoria = despesa.reduce((acc, despesa) => {
            const { categoria, valor } = despesa
            if (!acc[categoria]) {
                acc[categoria] = 0
            }
            acc[categoria] += valor
            return acc
        }, {} as { [key: string]: number })
        return {
            totalReceitas: totalReceitas, totalDespesas, saldoFinal, despesaPorCategoria
        }
    }, [financas])
    const pieChartLabels = Object.keys(dadosFinanceiros.despesaPorCategoria);
    const dynamicColors = generateDynamicColors(pieChartLabels.length);

    const pieChartData = {
        labels: Object.keys(dadosFinanceiros.despesaPorCategoria),
        datasets: [{
            label: 'Despesas por Categoria',
            data: Object.values(dadosFinanceiros.despesaPorCategoria),
            backgroundColor: dynamicColors,
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: '#fff'
        }]
    }

    const barChartData = {
        labels: ['Totais'],
        datasets: [{
            label: 'Receita',
            data: [dadosFinanceiros.totalReceitas],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
            label: 'Despesas',
            data: [dadosFinanceiros.totalDespesas],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }]
    }
    return (
        <Layout>
            <h2>Dashboard Financeiro</h2>
            {/* CARDS DE RESUMO */}
            <div className={styles.cardsContainer}>
                <Card titulo="Total de Receitas" className={styles.receita} valor={'R$ ' + dadosFinanceiros.totalReceitas.toFixed(2)} />
                <Card titulo="Total de Despesas" className={styles.despesa} valor={'R$ ' + dadosFinanceiros.totalDespesas.toFixed(2)} />
                <Card titulo="Saldo Final" className={dadosFinanceiros.saldoFinal >= 0 ? styles.receita : styles.despesa} valor={'R$ ' + dadosFinanceiros.saldoFinal.toFixed(2)} />
            </div>
            {/* GRÁFICOS */}
            <div className={styles.chartsContainer}>
                <div className={styles.chart}>
                    <h3>Despesas por Categoria</h3>
                    {Object.keys(dadosFinanceiros.despesaPorCategoria).length > 0 ? (
                        <Pie data={pieChartData} />
                    ) : (
                        <p>Nenhuma despesa registrada para exibir o gráfico.</p>
                    )}
                </div>
                <div className={styles.chart}>
                    <h3>Receitas vs. Despesas</h3>
                    <Bar data={barChartData} />
                </div>
            </div>
        </Layout>
    )
}