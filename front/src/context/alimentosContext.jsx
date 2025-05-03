import { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContex";
import { SERVER_HOST } from "../config";
import useRegistrosComidaContext from "../hooks/useRegistrosComidaContext";


const AlimentosContext = createContext();

function AlimentosProvider({ children }) {
    const [alimentos, setAlimentos] = useState([]);
    const { currentUser } = useAuthContext();
const {getRegistros} = useRegistrosComidaContext();

    const getAlimentos = async () => {
        if (!currentUser) return false;
        try {
            const response = await axios.get(
                `${SERVER_HOST}/api/alimentos/usuario/${currentUser.uid}`
            );

            setAlimentos(response.data.alimentos);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const insertarAlimento = async (data) => {
        if (!currentUser) return false;

        try {
            const dataToSend = {
                uid: currentUser.uid,
                ...data
            }

            const response = await axios.post(
                `${SERVER_HOST}/api/alimentos/`, dataToSend
            );

            getAlimentos()

            return response;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const editarAlimento = async (data) => {
        if (!currentUser) return false;

        try {
            const dataToSend = {
                uid: currentUser.uid,
                ...data
            }

            const response = await axios.patch(
                `${SERVER_HOST}/api/alimentos/${data.id}`, dataToSend
            );

            getAlimentos()

            return response;
        } catch (e) {
            console.error(e);
            return false;
        }
    }


    const eliminarAlimento = async(data)=>{
    if (!currentUser) return false;

    try {
       
        const response = await axios.delete(
            `${SERVER_HOST}/api/alimentos/${data.id}`
        );

        getAlimentos()
getRegistros()
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }

}

    const valuesToShare = {
        alimentos,
        getAlimentos,
        insertarAlimento,
        editarAlimento,
        eliminarAlimento
    }
    return (
        <AlimentosContext.Provider value={valuesToShare}>
            {children}
        </AlimentosContext.Provider>
    );
}

export default AlimentosContext;
export { AlimentosProvider };