import { useState, useRef } from "react";
import useCentralContext from "../hooks/useCentralContext";

function CardFood( props ) {
    const inputRef = useRef(null);
    const {data} = props;
    const [dataInput, setDataInput] = useState(data.cantidad);
    const { eliminarRegistro, editarRegistro } = useCentralContext();

    const handleChange = (event) => {
        setDataInput(event.target.value);
    }
    const handleBlur = () => {
        editarRegistro({cantidad:dataInput},data.id)
       
        //editarRegistro(data_id, dataInput)
    };
   

    
    /*ESTIMACIÓN DE CALORIAS TOTALES */
    const calorias = ((parseFloat(data.alimento_info.proteinas) * 4) + (parseFloat(data.alimento_info.carbohidratos) * 4) + (parseFloat(data.alimento_info.grasas) * 9)) * parseFloat(dataInput);
    
    const handleDelete=()=>{
        eliminarRegistro(data.id)
    }
 
    return (<div className="w-[230px] bg-[#F6F6F6] rounded p-[10px]">
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
                    ref={inputRef}
                    type="number"
                    min={0}
                    className="border border-neutral-200 w-[80px] bg-white rounded px-[5px]" />
            </form>
           
        </div>
        <hr className="w-[100%] border-neutral-200" />
        <div className="flex justify-between py-[10px]">
            <p>Total calorias</p>
            <p>{calorias} Kcal</p>
        </div>

    </div>)
}

export default CardFood;