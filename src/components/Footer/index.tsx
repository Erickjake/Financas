import { Container } from "../Container";
import styles from './styles.module.css'
export function Footer() {
    return (

        <Container>
            <footer className={styles.footer}>
                <p>Desenvolvido por <strong><a href='/' className={styles.a}>Erickson.A.C</a></strong></p>
                <p>Copyright &copy;{new Date().getFullYear()}</p>
            </footer>
        </Container >

    )
}