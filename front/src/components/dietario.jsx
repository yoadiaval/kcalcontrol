import SectionMain from "./SectionMain";
import { Progress } from "antd";
import CardFood from "./cardFood";
import Button from "./button";
import Modal from "./modal";
import { useState, useEffect } from "react";
import usePersonalInfoContext from "../hooks/usePersonalInfoContext";
import useRegistrosContext from "../hooks/useRegistrosComidaContext";
import AddRegistro from "./addRegistro";
import useCentralContext from "../hooks/useCentralContext";



function Dietario() {
    const { userData } = usePersonalInfoContext();
    const { obtenerFechaActual } = useCentralContext();
    const { registros } = useRegistrosContext();
    const [showModal, setShowModal] = useState(false);
    const [origenAccion, setOrigenAccion] = useState(null);
   const [macros, setMacros] = useState({
    proteinas:0,
    carbohidratos:0,
    grasas:0,
    calorias:0
   })
    const currentDate = obtenerFechaActual() ;
    const accPorMacro = (macro) => {
        return registros.reduce((acc, item) => {
            const valor = parseFloat(item.alimento_info[macro]) || 0;
            return acc + (valor * item.cantidad) / 100;
        }, 0);
    };

    const computosDeMacros = () => {
        setMacros({
            proteinas: accPorMacro('proteinas'),
            carbohidratos: accPorMacro('carbohidratos'),
            grasas: accPorMacro('grasas'),
            calorias: accPorMacro('calorias')
        });
    };

    useEffect(() => {
        computosDeMacros();
    }, [registros]); 
  
    const [activo, setActivo] = useState('desayuno');

    const tiposComidas = ['desayuno', 'comida', 'cena', 'merienda'];
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    const openModal = (origen) => {
        setOrigenAccion(origen)
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }
    const modal = (<Modal onClose={closeModal}><AddRegistro tipoComida={origenAccion} /></Modal>)

    return (
        <SectionMain header="Dietario">
            {showModal && modal}
            <section className="flex flex-col gap-[50px] items-center p-[30px]">
                <div className="text-center">
                    <h3>Objetivos</h3>
                    <p>Este es tu progreso en el día de hoy</p>
                    <p className="font-bold text-3xl">{currentDate}</p>
                </div>
                <div className="flex justify-around gap-[30px]">
                    <div className="flex flex-col items-center gap-2">
                        <Progress type="circle" percent={(macros.proteinas / parseFloat(userData.usuario.obj_proteinas)).toFixed(2)} strokeColor={twoColors} />
                        <div className="font-bold">{macros.proteinas.toFixed(2)} / {userData.usuario.obj_proteinas}</div>
                        <p>Proteinas (g)</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Progress type="circle" percent={(macros.carbohidratos / parseFloat(userData.usuario.obj_carbohidratos)).toFixed(2)} strokeColor={twoColors} />
                        <div className="font-bold">{macros.carbohidratos.toFixed(2)} / {userData.usuario.obj_carbohidratos}</div>
                        <p>Carbohidratos (g)</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Progress type="circle" percent={(macros.grasas / parseFloat(userData.usuario.obj_grasas)).toFixed(2)} strokeColor={twoColors} />
                        <div className="font-bold">{macros.grasas.toFixed(2)} / {userData.usuario.obj_grasas}</div>
                        <p>Grasas (g)</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Progress type="circle" percent={(macros.calorias / parseFloat(userData.usuario.obj_calorias)).toFixed(2)} strokeColor={twoColors} />
                        <div className="font-bold">{macros.calorias.toFixed(2)} / {userData.usuario.obj_calorias}</div>
                        <p>Calorias  </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="p-[20px]">
                    <ul className="flex ">
                        {tiposComidas.map((item) => (
                            <li
                                key={item}
                                
                                onClick={() => { setActivo(item) }}
                                
                                className={`${activo === item ? 'border-b-4 border-b-blue-300 ' : ''
                                    } cursor-pointer  hover:bg-neutral-200 w-[80px] p-[5px] border-b-4 border-transparent transition-all duration-200 ease-in`}

                            >{item.charAt(0).toUpperCase() + item.slice(1)}
                            </li>
                        ))}
                    </ul>

                    <hr className="w-[100%] border-gray-200 mb-[20px]" />
                    {activo === 'desayuno' && <div>
                        <div className="w-[100%] text-end pr-[31px]">
                            <Button onClick={() => openModal(1)}>Agregar Comida</Button>
                        </div>

                        <div className="flex flex-wrap gap-5 p-[30px]">
                            {registros
                                .filter((item) => item.tipo_comida_id === 1)
                                .map((item) => (
                                    <CardFood key={item.id} data={item} />
                                ))
                            }
                        </div>
                    </div>}
                    {activo === 'comida' && <div>
                        <div className="w-[100%] text-end pr-[31px]">
                            <Button onClick={() => openModal(2)}>Agregar Comida</Button>
                        </div>

                        <div className="flex flex-wrap  gap-5 p-[30px]">
                            {registros
                                .filter((item) => item.tipo_comida_id === 2)
                                .map((item) => (
                                    <CardFood key={item.id} data={item} />
                                ))
                            }
                        </div>
                    </div>}
                    {activo === 'cena' && <div>
                        <div className="w-[100%] text-end pr-[31px]">
                            <Button onClick={() => openModal(3)}>Agregar Comida</Button>
                        </div>

                        <div className="flex flex-wrap gap-[30px] p-5">
                            {registros
                                .filter((item) => item.tipo_comida_id === 3)
                                .map((item) => (
                                    <CardFood key={item.id} data={item} />
                                ))
                            }
                        </div>
                    </div>}
                    {activo === 'merienda' && <div>
                        <div className="w-[100%] text-end pr-[31px]">
                            <Button onClick={()=>openModal(4)}>Agregar Comida </Button>
                        </div>

                        <div className="flex flex-wrap justify-between gap-[30px] p-[30px]">
                            {registros
                                .filter((item) => item.tipo_comida_id === 4)
                                .map((item) => (
                                    <CardFood key={item.id} data={item} />
                                ))
                            }
                        </div>
                    </div>}

                </div>
            </section>

        </SectionMain>
    )
}

export default Dietario;