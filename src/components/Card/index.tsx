import styles from './styles.module.css'
type CardProps = {
    titulo: string
    valor: string
    className?: string
}
export default function Card({ titulo, valor, className }: CardProps) {

    return (

        <div className={styles.card}>
            <h4>{titulo}</h4>
            <p className={className}>{valor}</p>
        </div >

    )
}