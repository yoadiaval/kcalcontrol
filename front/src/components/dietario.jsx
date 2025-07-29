import SectionMain from "./SectionMain";
import AddRegistro from "./addRegistro";
import ObjetivosProgreso from "./objetivosProgreso";
import CardFood from "./cardFood";
import Button from "./button";
import Modal from "./modal";

import { useState, useEffect } from "react";
import { getRegistros } from "../services/registrosService"


import useCentralContext from "../hooks/useCentralContext";
import useRegistrosContext from "../hooks/useRegistrosComidaContext";
import useAuthContext from "../hooks/useAuthContext";

import imgNoData from '../assets/nodata.png';

//IMPORTACIONES DE ANTDESIGN//
import 'antd/es/progress/style';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style';
//==========================//

function Dietario() {

    /*CONTEXT*/
    const { currentUser } = useAuthContext();
    const { userData, isMobile } = useCentralContext();
    const { registros, setRegistros } = useRegistrosContext();


    /*ESTADOS*/
    const [showModal, setShowModal] = useState(false);
    const [origenAccion, setOrigenAccion] = useState(null);
    const [activo, setActivo] = useState(1);
    const [food, setFood] = useState([]);
    const [porcentajeMacros, setPorcentajeMacros] = useState({
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        calorias: 0
    });
    const [macrosAcc, setMacrosAcc] = useState({
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        calorias: 0
    });
    const [loading, setLoading] = useState(true);

    /*VARIABLES GLOBALES */
    const tiposComidas = ['desayuno', 'comida', 'cena', 'merienda'];


    /*ACTUALIZACIONES*/
    useEffect(() => {
        // Cuando currentUser cambie y NO sea undefined, desactiva loading
        if (userData !== undefined) {
            setLoading(false);
        }
    }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            const resultGetRegistros = await getRegistros(currentUser.uid);
            setRegistros(resultGetRegistros);
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

        const objProt = parseFloat(userData?.usuario?.obj_proteinas)
        const objCarb = parseFloat(userData?.usuario?.obj_carbohidratos)
        const objGras = parseFloat(userData?.usuario?.obj_grasas)
        const objCal = parseFloat(userData?.usuario?.obj_calorias)
        setPorcentajeMacros({
            proteinas: objProt === 0 ? 0 : ((proteinas / objProt) * 100).toFixed(2),
            carbohidratos: objCarb === 0 ? 0 : ((carbohidratos / objCarb) * 100).toFixed(2),
            grasas: objGras === 0 ? 0 : ((grasas / objGras) * 100).toFixed(2),
            calorias: objCal === 0 ? 0 : ((calorias / objCal) * 100).toFixed(2)
        })

    };

    const handleCantidadChange = (value, id) => {
        setRegistros((prevRegistros) => {
            return prevRegistros.map((item) => {
                if (item.id === id) {
                    return { ...item, cantidad: value };
                }
                return item;
            });
        });
        computosDePorcentajesMacros();

    }

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
            {loading ? <div className="flex justify-center items-center h-[400px]"><Spin /></div> : <div className="flex flex-col md:flex-row">
                {/*SECCION LISTADO POR TIPOS DE COMIDAS*/}
                <section className={`flex-1 ${isMobile ? 'order-2 mb-[90px]' : ''}`}>
                    <div className="p-[20px]">
                        {/*OPCIONES DE COMIDAS */}
                        <ul className={`flex sticky ${isMobile ? 'top-[50px] pt-2 bg-white' : ''}`}>
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
                        <div className="w-[100%] text-end pr-[31px] my-4 sticky top-[95px] bg-white z-10 py-3">
                            <Button onClick={() => openModal()}>Agregar Comida</Button>
                        </div>
                        {/*LISTADO DE ALIMENTOS*/}
                        {loading ? <div className="w-[100%] min-h-[75%] flex items-center justify-center"><Spin /></div> : <div className={`max-h-[75%] overflow-y-auto flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
                            {food.length === 0 ? <div className="w-[100%] flex justify-center"><img src={imgNoData} /></div> : food.map((item) => (
                                <CardFood key={item.id} data={item} onCantidadChange={handleCantidadChange} />
                            ))}

                        </div>}
                    </div>
                </section>
                {/*SECCION OBJETIVOS */}
                <ObjetivosProgreso porcentajeMacros={porcentajeMacros} macrosAcc={macrosAcc} />
            </div>}
        </SectionMain>
    )
}

export default Dietario;