import Modal from "./modal";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "./button";
function AlertDelete() {
    return (
        <div className="text-center">
            <DeleteOutlined />
            <p>Estás Seguro de realizar esta acción</p>
            <div className="flex justify-around">
                <Button variant="primary">Aceptar</Button>
                <Button variant="danger">Cancelar</Button>
            </div>
        </div>
    )
}
export default AlertDelete;