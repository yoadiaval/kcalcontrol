import { DeleteOutlined } from "@ant-design/icons";
import Button from "./button";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "../hooks/useAuthContext";

import { getRegistros } from "../services/registrosService";
import useRegistrosContext from "../hooks/useRegistrosComidaContext";
function AlertDelete(props) {
    const { onClose, onDelete, value } = props;
    const { currentUser } = useAuthContext();

    const {setRegistros} = useRegistrosContext()
    const [loading, setLoading] = useState(false);
    if (!currentUser) return false;

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete(value.id)
            toast.success('Alimento eliminado con éxito')
            const updatedRegistros = await getRegistros(currentUser.uid);
            setRegistros(updatedRegistros);

        } catch (e) {
            console.error(e)
            toast.error('Ha Ocurrido un error')
        }
        
        setLoading(false);
        onClose();
    }
    return (
        <div className="text-center flex flex-col gap-4 items-center">
            <DeleteOutlined style={{ fontSize: '70px' }} />
            <p>Estás Seguro de realizar esta acción</p>
            <div className="flex justify-around gap-2">
                <Button variant="primary" onClick={handleDelete}>{loading ? 'Eliminando...' : 'Aceptar'}</Button>
                <Button variant="danger" onClick={onClose}>Cancelar</Button>
            </div>
        </div >
    )
}
export default AlertDelete;