import SectionMain from "./SectionMain";
import { Progress, Spin } from "antd";
import CardFood from "./cardFood";
import Button from "./button";
import Modal from "./modal";
import { useState, useEffect } from "react";
import AddRegistro from "./addRegistro";
import useCentralContext from "../hooks/useCentralContext";
import imgNoData from '../assets/nodata.png';


function Dietario() {





    /*CONTEXT*/
    const { userData, obtenerFechaActual, isMobile, getRegistros, registros } = useCentralContext();



    /*ESTADOS*/
    const [showModal, setShowModal] = useState(false);
    const [origenAccion, setOrigenAccion] = useState(null);
    const [activo, setActivo] = useState(1);
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
    });
    const [loading, setLoading] = useState(true);

    /*VARIABLES GLOBALES */
    const tiposComidas = ['desayuno', 'comida', 'cena', 'merienda'];
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };
    const currentDate = obtenerFechaActual();

    /*ACTUALIZACIONES*/

    useEffect(() => {
        const fetchData = async () => {
            /*Resto de elementos que necesito cargar*/
            const resultGetRegistros = await getRegistros();

            if (resultGetRegistros) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        computosDePorcentajesMacros();
        loadFood(activo);
    }, [registros]);


    /*FUNCIONES*/
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


    const loadFood = (foodActiva) => {
        setFood(registros.filter((item) => item.tipo_comida_id === foodActiva))
    };

    const activarFoodType = (foodType) => {
        let posicion = tiposComidas.indexOf(foodType) + 1;
        setActivo(posicion)
        loadFood(posicion)
    };

    const openModal = () => {
        setOrigenAccion(activo)
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }
    const modal = (<Modal onClose={closeModal} title='Añadir comida'><AddRegistro tipoComida={origenAccion} /></Modal>)

    return (
        <SectionMain header="Dietario">
            {showModal && modal}
            <div className="flex flex-col md:flex-row">
                {/*SECCION LISTADO POR TIPOS DE COMIDAS*/}
                <section className={`flex-1 ${isMobile ? 'order-2 mb-[90px]' : ''}`}>
                    <div className="p-[20px]">
                        {/*OPCIONES DE COMIDAS */}
                        <ul className={`flex sticky ${isMobile ? 'top-[59px] bg-white' : ''}`}>
                            {tiposComidas.map((item) => (
                                <li
                                    key={item}
                                    onClick={() => { activarFoodType(item) }}
                                    className={`${tiposComidas[activo - 1] === item ? 'border-b-4 border-b-blue-300 ' : ''
                                        } cursor-pointer  hover:bg-neutral-200 w-[80px] p-[5px] border-b-4 border-transparent transition-all duration-200 ease-in`}
                                >{item.charAt(0).toUpperCase() + item.slice(1)}
                                </li>
                            ))}
                        </ul>
                        <hr className="w-[100%] border-gray-200 " />
                        <div className="w-[100%] text-end pr-[31px] my-4 sticky top-[105px] bg-white z-10">
                            <Button onClick={() => openModal()}>Agregar Comida</Button>
                        </div>
                        {/*LISTADO DE ALIMENTOS*/}
                        {loading ? <div className="w-[100%] min-h-[75%] flex items-center justify-center"><Spin /></div> : <div className={`max-h-[75%] overflow-y-auto flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
                            {food.length === 0 ? <div className="w-[100%] flex justify-center"><img src={imgNoData} /></div> : food.map((item) => (
                                <CardFood key={item.id} data={item} />
                            ))}

                        </div>}
                    </div>
                </section>
                {/*SECCION OBJETIVOS */}
                <section className={`flex flex-col gap-[20px] items-center p-[10px] bg-[#DBEAFE] rounded-2xl ${isMobile ? 'order-1' : ''}`}>
                    <div className="text-center">
                        <h3>Objetivos</h3>
                        <p>Este es tu progreso en el día de hoy</p>
                        <p className="font-bold text-3xl">{currentDate[1]}</p>
                    </div>
                    <div className={`flex flex-col justify-around gap-[10px] ${isMobile ? 'flex-row flex-wrap' : ''} `}>
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