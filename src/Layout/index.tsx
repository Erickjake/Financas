import { Footer } from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    )
}