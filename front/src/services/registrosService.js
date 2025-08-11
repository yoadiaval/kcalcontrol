import { obtenerFechaActual } from "../utils/utils";
import { SERVER_HOST } from "../config";
import axios from "axios";

 const getRegistros = async (uid) => {
        
        try {
            const response = await axios.get(
                `${SERVER_HOST}/api/registros/usuario/${uid}`
            );

            console.log(`${SERVER_HOST}/api/registros/usuario/${ uid }`)
           
            return response.data.registros;
        } catch (e) {
            console.error(e);
            throw new Error(e?.response?.data?.message || 'Error al obtener registro de alimentos');
        }
    }

const getRegistrosPorFecha = async (uid, fecha) => {
   
    try {
        const response = await axios.get(
            `${SERVER_HOST}/api/registros/usuario/${uid}?fecha=${fecha}`
        );

       
        return response.data.registros;
    } catch (e) {
        console.error(e);
        throw new Error(e?.response?.data?.message || 'Error al obtener registro de alimentos');
    }
}

    const getRegistrosPorRangoFechas = async (startDate, endDate, uid) => {
       
        try {
            const response = await axios.get(
                `${SERVER_HOST}/api/registros/usuario/${uid}/rango-fechas?fecha_inicio=${startDate}&fecha_fin=${endDate}`
            );
            console.log(`${SERVER_HOST}/api/registros/usuario/${uid}/rango-fechas?fecha_inicio=${startDate}&fecha_fin=${endDate}`)
            console.log(response.data.registros)
            return response.data.registros;
        } catch (e) {
            console.error(e);
            throw new Error(e?.response?.data?.message || 'Error al obtener registro de alimentos');
        }
    }

    const insertarRegistro = async (alimentoId, tipoComida, uid) => {
       
        const fechaActual = obtenerFechaActual();
        const dataToSend = {
            uid: uid,
            tipo_comida_id: tipoComida,
            fecha: fechaActual[0],
            alimento_id: alimentoId,
            cantidad: 0
        }


        try {

            const response = await axios.post(
                `${SERVER_HOST}/api/registros`, dataToSend
            );
            getRegistros()
            return response;
        } catch (e) {
            console.error(e);
            throw new Error(e?.response?.data?.message || 'Error al registrar el alimento');
        }
    }

    const editarRegistro = async (data, id, uid) => {
        

        try {
            const dataToSend = {
                uid: uid,
                ...data
            }
            const response = await axios.patch(
                `${SERVER_HOST}/api/registros/${id}`, dataToSend
            );

            getRegistros()

            return response;
        } catch (e) {
            console.error(e);
            throw new Error(e?.response?.data?.message || 'Error al editar el alimento');
        }
    }


    const eliminarRegistro = async (id) => {
        try {

            const response = await axios.delete(
                `${SERVER_HOST}/api/registros/${id}`
            );

            return response;
        } catch (e) {
            console.error(e);
            throw new Error(e?.response?.data?.message || 'Error al eliminar el alimento');
        }

    }


export { getRegistros, getRegistrosPorFecha, getRegistrosPorRangoFechas, insertarRegistro, editarRegistro, eliminarRegistro }