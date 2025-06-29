import { Container } from "../Container";
import styles from './styles.module.css'

export default function Main({ children }: { children: React.ReactNode }) {


    return (
        <Container>
            <div className={styles.main}>
                {children}
            </div>
        </Container>
    )
}