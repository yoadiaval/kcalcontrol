import Modal from "./modal";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "./button";
import { useState } from "react";
import { toast } from "react-toastify";

function AlertDelete(props) {
    const { onClose, onDelete, value } = props;
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const result = await onDelete(value.id)
        if (result.status == 200) {
            toast.success('Alimento eliminado con éxito')
        } else {
            toast.error('Ha Ocurrido un error al eliminar el alimento')
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