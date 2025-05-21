import { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContex";
import { SERVER_HOST } from "../config";
import useRegistrosComidaContext from "../hooks/useRegistrosComidaContext";


const AlimentosContext = createContext();

function AlimentosProvider({ children }) {
    const [alimentos, setAlimentos] = useState([]);
    const { currentUser } = useAuthContext();
    const { getRegistros, obtenerFechaActual } = useRegistrosComidaContext();

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
            console.log(dataToSend)
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


    const eliminarAlimento = async (id) => {
        if (!currentUser) return false;

        try {

            const response = await axios.delete(
                `${SERVER_HOST}/api/alimentos/${id}`
            );

            getAlimentos()
            getRegistros()
            return response;
        } catch (e) {
            console.error(e);
            return false;
        }

    }

    /*Este método tiene que estar aquí, si lo pongo en registroContext() no podria acceder a getAlimentos() por la organizacion de los provider, si invierto esta organizacion entonces me fallaria getRegistros en AlimentosContext() */
    const transaccionCrearRegistrarComida = async (data, tipoComida) => {
        if (!currentUser) return false;

        const fechaActual = obtenerFechaActual();

        const dataToSend = {
            ...data,
            uid: currentUser.uid,
            tipo_comida_id: tipoComida,
            fecha: fechaActual[0],
            cantidad: 100,
            base: 100
        }


        try {
            const response = await axios.post(`${SERVER_HOST}/api/crear-registrar-comida`, dataToSend);
            getRegistros();
            getAlimentos();
            return response;
        } catch (e) {
            console.error(e)
        }

    }

    const valuesToShare = {
        alimentos,
        getAlimentos,
        insertarAlimento,
        editarAlimento,
        eliminarAlimento,
        transaccionCrearRegistrarComida
    }
    return (
        <AlimentosContext.Provider value={valuesToShare}>
            {children}
        </AlimentosContext.Provider>
    );
}

export default AlimentosContext;
export { AlimentosProvider };