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
import imgNoData from '../assets/nodata.png';


function Dietario() {
    const { userData } = usePersonalInfoContext();
    const { obtenerFechaActual } = useCentralContext();
    const { registros } = useRegistrosContext();
    const [showModal, setShowModal] = useState(false);
    const [origenAccion, setOrigenAccion] = useState(null);
    const [food, setFood] = useState([]);

    const [macrosAcc, setMacrosAcc] = useState({
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        calorias: 0
    });

    const [porcentajeMacros, setPorcentajeMacros] = useState({
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        calorias: 0
    })


    const currentDate = obtenerFechaActual();

    const accPorMacro = (macro) => {
        return registros.reduce((acc, item) => {
            const valor = parseFloat(item.alimento_info[macro]) || 0;
            return acc + (valor * item.cantidad) / 100;
        }, 0);
    };

    const computosDePorcentajesMacros = () => {
        const proteinas = accPorMacro('proteinas');
        const carbohidratos = accPorMacro('carbohidratos');
        const grasas = accPorMacro('grasas');
        const calorias = accPorMacro('calorias');

        setMacrosAcc({
            proteinas: proteinas,
            carbohidratos: carbohidratos,
            grasas: grasas,
            calorias: calorias
        })

        const objProt = parseFloat(userData.usuario.obj_proteinas)
        const objCarb = parseFloat(userData.usuario.obj_carbohidratos)
        const objGras = parseFloat(userData.usuario.obj_grasas)
        const objCal = parseFloat(userData.usuario.obj_calorias)
        setPorcentajeMacros({
            proteinas: objProt === 0 ? 0 : ((proteinas / objProt) * 100).toFixed(2),
            carbohidratos: objCarb === 0 ? 0 : ((carbohidratos / objCarb) * 100).toFixed(2),
            grasas: objGras === 0 ? 0 : ((grasas / objGras) * 100).toFixed(2),
            calorias: objCal === 0 ? 0 : ((calorias / objCal) * 100).toFixed(2)
        })

    };

    useEffect(() => {
        computosDePorcentajesMacros();
    }, [registros]);

    const [activo, setActivo] = useState('desayuno');

    const tiposComidas = ['desayuno', 'comida', 'cena', 'merienda'];
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    const openModal = (tipoComida) => {
        let origen;
        switch (tipoComida) {
            case 'desayuno':
                origen = 1;
                break;
            case 'comida':
                origen = 2;
                break;
            case 'cena':
                origen = 3;
                break;
            case 'merienda':
                origen = 4;
                break;

            default:
                break;
        }

        setOrigenAccion(origen)
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }
    const modal = (<Modal onClose={closeModal} title='Añadir comida'><AddRegistro tipoComida={origenAccion} /></Modal>)

    return (
        <SectionMain header="Dietario">
            {showModal && modal}
            <div className="flex">
                <section className="flex-1  ">
                    <div className="p-[20px]">

                        <ul className="flex sticky">
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
                        <div className="w-[100%] text-end pr-[31px]">
                            <Button onClick={() => openModal(activo)}>Agregar Comida</Button>
                        </div>
                        <div className=" h-[75vh] overflow-y-scroll">
                            {activo === 'desayuno' && <div>
                                <div className="flex flex-wrap gap-5 p-[30px]">
                                    {(() => {
                                        const filtrados = registros.filter((item) => item.tipo_comida_id === 1)

                                        if (filtrados.length === 0) {
                                            return <div className="w-[100%] flex justify-center"><img src={imgNoData} /></div>;
                                        }

                                        return filtrados.map((item) => (
                                            <CardFood key={item.id} data={item} />
                                        ));
                                    })()}
                                </div>
                            </div>}
                            {activo === 'comida' && <div>


                                <div className="flex flex-wrap  gap-5 p-[30px]">
                                    {(() => {
                                        const filtrados = registros.filter((item) => item.tipo_comida_id === 2)

                                        if (filtrados.length === 0) {
                                            return <div className="w-[100%] flex justify-center"><img src={imgNoData} /></div>;
                                        }

                                        return filtrados.map((item) => (
                                            <CardFood key={item.id} data={item} />
                                        ));
                                    })()}
                                </div>
                            </div>}
                            {activo === 'cena' && <div>


                                <div className="flex flex-wrap gap-5 p-[30px]">
                                    {(() => {
                                        const filtrados = registros.filter((item) => item.tipo_comida_id === 3)

                                        if (filtrados.length === 0) {
                                            return <div className="w-[100%] flex justify-center"><img src={imgNoData} /></div>;
                                        }

                                        return filtrados.map((item) => (
                                            <CardFood key={item.id} data={item} />
                                        ));
                                    })()}
                                </div>
                            </div>}
                            {activo === 'merienda' && <div>


                                <div className="flex flex-wrap justify-between gap-[30px] p-[30px]">
                                    {(() => {
                                        const filtrados = registros.filter((item) => item.tipo_comida_id === 4)

                                        if (filtrados.length === 0) {
                                            return <div className="w-[100%] flex justify-center"><img src={imgNoData} /></div>;
                                        }

                                        return filtrados.map((item) => (
                                            <CardFood key={item.id} data={item} />
                                        ));
                                    })()}

                                </div>
                            </div>}
                        </div>
                    </div>
                </section>
                {/*SECCION OBJETIVOS */}
                <section className="flex flex-col gap-[20px] items-center p-[10px] bg-[#DBEAFE] rounded-2xl">
                    <div className="text-center">
                        <h3>Objetivos</h3>
                        <p>Este es tu progreso en el día de hoy</p>
                        <p className="font-bold text-3xl">{currentDate[1]}</p>
                    </div>
                    <div className="flex flex-col justify-around gap-[10px]">
                        <div className="flex flex-col items-center ">
                            <Progress type="circle" percent={porcentajeMacros.proteinas} strokeColor={twoColors} />
                            <div className="font-bold">{macrosAcc.proteinas.toFixed(2)} / {userData.usuario.obj_proteinas}</div>
                            <p>Proteinas (g)</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <Progress type="circle" percent={porcentajeMacros.carbohidratos} strokeColor={twoColors} />
                            <div className="font-bold">{macrosAcc.carbohidratos.toFixed(2)} / {userData.usuario.obj_carbohidratos}</div>
                            <p>Carbohidratos (g)</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <Progress type="circle" percent={porcentajeMacros.grasas} strokeColor={twoColors} />
                            <div className="font-bold">{macrosAcc.grasas.toFixed(2)} / {userData.usuario.obj_grasas}</div>
                            <p>Grasas (g)</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <Progress type="circle" percent={porcentajeMacros.calorias} strokeColor={twoColors} />
                            <div className="font-bold">{macrosAcc.calorias.toFixed(2)} / {userData.usuario.obj_calorias}</div>
                            <p>Calorias  </p>
                        </div>
                    </div>
                </section>

            </div>


        </SectionMain>
    )
}

export default Dietario;