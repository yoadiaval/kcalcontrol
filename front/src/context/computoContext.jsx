import { createContext, useState } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";
import { bmrCompute, tdeeCompute, goalAdjustCompute } from "../utils/computoFn.js";


const ComputoContext = createContext();

function ComputoProvider({ children }) {
    const { setPersonalInfo } = usePersonalInfoContext();
    const [nutriMacros, setNutriMacros] = useState({
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0,
    });


    const computar = async (data) => {

        let bmr = 0;
        const distinctH = 5;
        const distinctM = -161;
        
        switch (data.genero) {

            case "h":
                bmr = bmrCompute(distinctH, data);
                break;
            case "m":
                bmr = bmrCompute(distinctM, data);
                break;
            default:
                break;
        }
       
        const gastoEnergTot = tdeeCompute(bmr, data.actividad);
       
        const goalAdjust = goalAdjustCompute(gastoEnergTot, data.objetivo);
    

        /*Ajuste de macros por peso */
        const protObj = (data.proteinPerKg * parseFloat(data.peso));
        const graObj = (data.fatPerKg * parseFloat(data.peso));
        const carboObj = (goalAdjust - (protObj * 4 + graObj * 9)) / 4;

        const nuevosMacros = {
            calorias: goalAdjust || 0,
            proteinas: protObj || 0,
            grasas: graObj || 0,
            carbohidratos: carboObj || 0,
        };


        setNutriMacros(nuevosMacros);
        await setPersonalInfo(nuevosMacros);


    };

    const valuesToShare = {
        nutriMacros,
        computar,
    };

    return (
        <ComputoContext.Provider value={valuesToShare}>
            {children}
        </ComputoContext.Provider>
    );
}

export { ComputoProvider };
export default ComputoContext;