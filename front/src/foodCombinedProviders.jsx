import { AlimentosProvider } from "./context/alimentosContext.jsx";
import { RegistrosProvider } from "./context/registrosComidaContext.jsx";

const FoodCombinedProvider = ({ children }) => {
    return (
        <RegistrosProvider>
            <AlimentosProvider>
                {children}
            </AlimentosProvider>
        </RegistrosProvider >);
}

export default FoodCombinedProvider;