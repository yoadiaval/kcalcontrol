import { createContext, useState } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContex";
import { SERVER_HOST } from "../config";


const RegistrosContext = createContext();

function RegistrosProvider({ children }) {
    const [registros, setRegistros] = useState([]);
    const { currentUser } = useAuthContext();


    const getRegistros = async () => {
        if (!currentUser) return false;
        try {
            const response = await axios.get(
                `${SERVER_HOST}/api/registros/usuario/${currentUser.uid}`
            );


            setRegistros(response.data.registros);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const insertarRegistro = async (alimentoId, tipoComida) => {
        if (!currentUser) return false;
        const fechaActual = obtenerFechaActual();
        const dataToSend = {
            uid: currentUser.uid,
            tipo_comida_id: tipoComida,
            fecha: fechaActual[0],
            alimento_id: alimentoId,
            cantidad: 100
        }
      
        console.log(dataToSend)
        try {

            const response = await axios.post(
                `${SERVER_HOST}/api/registros/`, dataToSend
            );
            getRegistros()
            return response;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const editarRegistro = async (data, id) => {
        if (!currentUser) return false;

        try {
            const dataToSend = {
                uid: currentUser.uid,
                ...data
            }
        console.log(dataToSend);
            const response = await axios.patch(
                `${SERVER_HOST}/api/registros/${id}`, dataToSend
            );

            getRegistros()

            return response;
        } catch (e) {
            console.error(e);
            return false;
        }
    }


    const eliminarRegistro = async (id) => {
        if (!currentUser) return false;

        try {

            const response = await axios.delete(
                `${SERVER_HOST}/api/registros/${id}`
            );

            getRegistros()

            return response;
        } catch (e) {
            console.error(e);
            return false;
        }

    }

    const obtenerFechaActual = () => {
        const fecha = new Date();
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return [`${anio}-${mes}-${dia}`, `${dia}-${mes}-${anio}`];
    }

    const valuesToShare = {
        registros,
        getRegistros,
        insertarRegistro,
        editarRegistro,
        eliminarRegistro,
        obtenerFechaActual
    }
    return (
        <RegistrosContext.Provider value={valuesToShare}>
            {children}
        </RegistrosContext.Provider>
    );
}

export default RegistrosContext;
export { RegistrosProvider };