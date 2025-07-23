// hooks/useInsertarAlimento.js
import { useState } from 'react';
import { toast } from 'react-toastify';
import { insertarAlimento, getAlimentos, transaccionCrearRegistrarComida } from '../services/alimentosService';
import { getRegistros } from '../services/registrosService';
import useAuthContext from './useAuthContext';
import useRegistrosComidaContext from './useRegistrosComidaContext';
import useAlimentosContext from './useAlimentosContext';


export const useInsertarAlimento = () => {
    const { setAlimentos } = useAlimentosContext();
    const { setRegistros } = useRegistrosComidaContext();
    const { currentUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const submitAlimento = async (alimento, tipoComida) => {
        setLoading(true);
        try {
            if (!currentUser) throw new Error("Usuario no autenticado");

            if (tipoComida === undefined) {
                await insertarAlimento(alimento, currentUser.uid);
                toast.success("Alimento agregado exitosamente");
                const nuevos = await getAlimentos(currentUser.uid);
                setAlimentos(nuevos);
            } else {
                await transaccionCrearRegistrarComida(alimento, tipoComida, currentUser.uid);
                const updatedRegistros = await getRegistros();
                setRegistros(updatedRegistros);
                const updatedAlimentos = await getAlimentos();
                setAlimentos(updatedAlimentos);

                toast.success("Alimento agregado exitosamente");

            }

            return true;
        } catch (e) {
            toast.error(e.message + ". Alimento repetido");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submitAlimento, loading };
};
