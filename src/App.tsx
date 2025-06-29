
import './styles/global.css'
import MainRouter from './routers/MainRouter'
import { FinancasProvider } from './contexts/FinancasContext/FinancasContextProvider'


function App() {
  return (

    <FinancasProvider>
      <MainRouter />
    </FinancasProvider>


  )
}

export default App
