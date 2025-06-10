import { createContext, useState } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";



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

    //============FUNCIONES AUXILIARES==========//
    const bmrCompute = (distinct, data) => {
        let bmr = 0;
        if (data.bodyFat !== '') {
        
        /*Se tiene en cuenta la grasa corporal, ecuacion: Katch-McArdle */
            const masaMagra = parseFloat(data.peso) * (1-parseFloat(data.bodyFat)/100);
            console.log('masa magra '+masaMagra)
            bmr = 370 + (21.6 * masaMagra);
            console.log('bmr '+bmr)
        }else{
            /* ecuación: Mifflin-St Jeor */
            bmr = 10 * parseFloat(data.peso) +
                6.25 * parseFloat(data.altura) -
                5 * parseFloat(data.edad) +
                distinct;
        }
        return bmr;
    };


    const tdeeCompute = (bmr, actividad) => {
        let tdee = 0;
        switch (actividad) {
            case "1":
                tdee = bmr * 1.2;
                break;
            case "2":
                tdee = bmr * 1.375;
                break;
            case "3":
                tdee = bmr * 1.55;
                break;
            case "4":
                tdee = bmr * 1.725;
                break;
            case "5":
                tdee = bmr * 1.9;
                break;
            default:
                break;
        }
        return tdee;
    };


    const goalAdjustCompute = (gastoEnergTot, objetivo) => {
        let goalAdjust = 0;
        switch (objetivo) {
            case "1":
                goalAdjust = gastoEnergTot + 0.15 * gastoEnergTot;
                break;
            case "2":
                goalAdjust = gastoEnergTot;

                break;
            case "3":
                goalAdjust = gastoEnergTot - 0.15 * gastoEnergTot;

                break;

            default:
                break;
        }
        return goalAdjust;
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