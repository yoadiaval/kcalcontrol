import { useState, useRef } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { eliminarRegistro, editarRegistro } from "../services/registrosService"
import Modal from "./modal";
import AlertDelete from "./alertDelete";
import { toast } from "react-toastify";

function CardFood(props) {

    const { data, onCantidadChange } = props;

    /*CONTEXTO*/

    const { currentUser } = useAuthContext();

    /*ESTADOS */

    const [dataInput, setDataInput] = useState(data.cantidad);
    const [showDelModal, setShowDelModal] = useState(false);

    /*VARIABLES GLOBALES*/


    const inputRef = useRef(null);

    // const calorias = ((parseFloat(data.alimento_info.proteinas) * 4) + (parseFloat(data.alimento_info.carbohidratos) * 4) + (parseFloat(data.alimento_info.grasas) * 9)) * parseFloat(dataInput)/100;

    const calorias = data.alimento_info.calorias * parseFloat(dataInput) / 100;
   

    /*FUNCIONES */

    /*Computo de calorias totales  */


    const handleChange = (event) => {

        setDataInput(event.target.value);
        onCantidadChange(event.target.value, data.id);
    }

    const handleBlur = async () => {
        if (!currentUser) return false;

        try {
            await editarRegistro({ cantidad: dataInput }, data.id, currentUser.uid)
            toast.success('Registro actualizado correctamente');
        } catch (e) {
            console.error(e)
            toast.error('Error al actualizar el registro');
        }

    };
    const handleDelete = () => {
        setShowDelModal(true)

    }
    const closeModal = () => {
        setShowDelModal(false);
    }

    const modal = (
        <Modal onClose={closeModal} title='Eliminar Alimento'>
            <AlertDelete 
            onDelete={eliminarRegistro} 
            value={data}
            type="registro" 
            onClose={closeModal} />
        </Modal>)
    return (
        <>
            {showDelModal && modal}
            <div className="flex-1 max-w-[463px] min-w-[150px] bg-[#F6F6F6] rounded p-[10px]">
                <div className="flex items-center justify-between"><h3>{data.alimento_info.descripcion}</h3><span onClick={handleDelete} className="text-white bg-red-500 px-2 rounded-full m-1 cursor-pointer">x</span></div>

                <hr className="w-[100%] border-neutral-200" />
                <p>Datos (para 100g)</p>
                <div className="flex justify-between">
                    <div className="flex items-center gap-[5px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#51a2ff]"></div>
                        <p>Proteínas</p>
                    </div>
                    <p>{data.alimento_info.proteinas}g</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-[5px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#66be72]"></div>
                        <p>Carbohidratos</p>
                    </div>
                    <p>{data.alimento_info.carbohidratos}g</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-[5px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#ffc64d]"></div>
                        <p>Grasas</p>
                    </div>
                    <p>{data.alimento_info.grasas}g</p>
                </div>
                <hr className="border-neutral-200 " />
                <div className="flex justify-between py-[10px]">
                    <p>cantidad(g)</p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleBlur();
                        inputRef.current?.blur();

                    }}>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={dataInput}
                            step="any"
                            ref={inputRef}
                            type="number"
                            min={0}
                            className="border border-neutral-200 w-[80px] bg-white rounded px-[5px]" />
                    </form>

                </div>
                <hr className="w-[100%] border-neutral-200" />
                <div className="flex justify-between py-[10px]">
                    <p>Total calorias</p>
                    <p>{isNaN(calorias) ? 0 : calorias.toFixed(2)} Kcal</p>

                </div>
            </div>
        </>
    )
}

export default CardFood;