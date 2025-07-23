import { SERVER_HOST } from "../config";
import axios from "axios";
import { obtenerFechaActual } from "../utils/utils";

const getAlimentos = async (uid) => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}/api/alimentos/usuario/${uid}`
        );
        return response.data.alimentos;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const insertarAlimento = async (data, uid) => {
    try {
        const dataToSend = {
            uid: uid,
            ...data
        }


        const response = await axios.post(
            `${SERVER_HOST}/api/alimentos`, dataToSend
        );
        return response.data;
    } catch (e) {
        console.log(e.response?.data)
        throw new Error(e.response?.data?.message || 'Error al insertar alimento');

    }
}

const editarAlimento = async (data, uid) => {
    try {
        const dataToSend = {
            uid: uid,
            ...data
        }

        const response = await axios.patch(
            `${SERVER_HOST}/api/alimentos/${data.id}`, dataToSend
        );

        getAlimentos(uid)

        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}


const eliminarAlimento = async (id) => {
    try {
        const response = await axios.delete(
            `${SERVER_HOST}/api/alimentos/${id}`
        );
        getAlimentos()
        return response;
    } catch (e) {
        throw new Error(e?.response?.data?.message || 'Error al eliminar alimento');
    }

}

const transaccionCrearRegistrarComida = async (data, tipoComida, uid) => {


    const fechaActual = obtenerFechaActual();

    const dataToSend = {
        ...data,
        uid: uid,
        tipo_comida_id: tipoComida,
        fecha: fechaActual[0],
        cantidad: 0,
        base: data.base ?? 100
    }

    console.log(dataToSend);
    try {
        const response = await axios.post(`${SERVER_HOST}/api/crear-registrar-comida`, dataToSend);

        return response;
    } catch (e) {
        console.log(e?.response?.data)
        throw new Error(e?.response?.data?.message || 'Error al registrar comida');
    }

}

export {
    getAlimentos,
    insertarAlimento,
    editarAlimento,
    eliminarAlimento,
    transaccionCrearRegistrarComida
}