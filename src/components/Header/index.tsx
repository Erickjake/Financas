import { Link } from "react-router-dom";
import { Container } from "../Container";
import styles from './styles.module.css'

export default function Header() {
    return (
        <Container>
            <h1 className={styles.titulo}>Finanças Pessoais💸</h1>
            <div className={styles.cabecalho}>
                <Link to="/" className={styles.items}>Home</Link>
                <Link to="/categories" className={styles.items}>Categorias</Link>
                <Link to="/dashboard" className={styles.items}>Dashboard</Link>
                <Link to="/about" className={styles.items}>Conta</Link>
            </div>

        </Container>
    )
}