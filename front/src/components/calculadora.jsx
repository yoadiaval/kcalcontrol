import { useState, useEffect } from "react";
import Button from "./button";
import CardMacro from "./cardMacro";
import { Input, Select } from "./formComp";
import SectionMain from "./SectionMain";
import { toast } from "react-toastify";
import useCentralContext from "../hooks/useCentralContext";
import { Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'
import InfoText from "./infoText";
import Modal from "./modal";

function Calculadora() {

    /*CONTEXT */

    const { getPersonalInfo, setPersonalInfo, userData, computar } = useCentralContext();
    const usuario = userData?.usuario;
    /*ESTADOS */
    const [showModal, setShowModal] = useState(false);
    const [infoType, setInfoType] = useState(null);
    const [dataForm, setDataForm] = useState({
        genero: usuario?.sexo,
        edad: usuario?.edad,
        altura: usuario?.altura,
        peso: usuario?.peso,
        actividad: '',
        objetivo: usuario?.objetivo,
        bodyFat: '',
        proteinPerKg: '2',
        fatPerKg: '1',
        carbPerKg: '7'
    });
    const [includeFatBody, setIncludeFatBody] = useState(false);

    const [loading, setLoading] = useState(true)
    const [loadingCalc, setLoadingCalc] = useState(false)

    /*VARIABLES GLOBALES*/

    const optionsGender = [
        {
            label: "Hombre",
            value: "h"
        },
        {
            label: "Mujer",
            value: "m"
        },
    ]

    const optionsActivity = [
        {
            label: "Sedentario (Poco o ningún ejer.)",
            value: "1"
        },
        {
            label: "Ligeramente Activo (Ejer. 1 a 3 días)",
            value: "2"
        },
        {
            label: "Moderadamente Activo (Ejer. 3 a 5 días)",
            value: "3"
        },
        {
            label: "Muy Activo (Ejer. 6 a 7 días)",
            value: "4"
        },
        {
            label: "Extremadamente activo (Ejer. dos veces al día)",
            value: "5"
        },
    ]

    const optionsObjetivos = [
        {
            label: "Ganar Peso",
            value: "1"
        },
        {
            label: "Mantenerme",
            value: "2"
        },
        {
            label: "Perder Peso",
            value: "3"
        }
    ]



    let textResultado = "Rellena la información de la sección anterior para obtener/modificar el resultado estimado de macronutrintes necesarios por día"

    /*ACTUALIZACIONES */

    useEffect(() => {
        const fetchData = async () => {
            /*Resto de elementos que necesito cargar*/
            const resultGetPersonalInfo = await getPersonalInfo();

            if (resultGetPersonalInfo) {
                setLoading(false);
            }
        };

        fetchData();


    }, []);


    /*FUNCIONES */
    const handleSubmit = async (event) => {
        setLoadingCalc(true);
        event.preventDefault();
        if (
            dataForm.genero != '' &&
            dataForm.objetivo != '' &&
            dataForm.actividad != ''
        ) {
            /*Se gurdan los datos en la base de datos*/
            await setPersonalInfo(dataForm);
            /*Se envían los datos a computo de calorías*/
            await computar(dataForm);

        } else {
            toast.error('Ha dejado de indicar alguno de los siguientes valores: Género, Indice de actividad u Objetivo');
        }
        setLoadingCalc(false);

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataForm((prev) => {
            return { ...prev, [name]: value };
        });
    }

    const hadleModal = (infoType) => {
        setInfoType(infoType);
        setShowModal(true);
    }
    const closeModal = () => { setShowModal(false); }

    return (
        <SectionMain header="Calculadora de Macros">
            {showModal && (
                <Modal onClose={closeModal} title='Información'>
                    <InfoText infoType={infoType} />
                </Modal>
            )}
            {/*SECCION 1 - calculadora*/}
            <section className="flex flex-col lg:flex-row flex-wrap gap-10 p-6">
                {/* Columna izquierda: texto */}
                <div className="w-full lg:w-1/3 max-w-[448px]">
                    <h3 className="text-lg font-semibold mb-2">Datos Personales</h3>
                    <p className="text-sm text-gray-600">
                        Completa la siguiente información para que podamos estimar tus objetivos calóricos diarios.
                    </p>
                </div>
                <div className="w-full lg:flex-1 max-w-4xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="block mb-1">Inserte su Género</label>
                                <Select
                                    onChange={handleChange}
                                    name="genero"
                                    value={dataForm.genero}
                                    type="text"
                                    options={optionsGender}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block mb-1">Inserte su Edad</label>
                                <Input
                                    onChange={handleChange}
                                    name="edad"
                                    value={dataForm.edad}
                                    type="number"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1">Índice de actividad</label>
                            <Select
                                onChange={handleChange}
                                name="actividad"
                                value={dataForm.actividad}
                                type="text"
                                options={optionsActivity}
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Objetivo</label>
                            <Select
                                onChange={handleChange}
                                name="objetivo"
                                value={dataForm.objetivo}
                                type="text"
                                options={optionsObjetivos}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="block mb-1">Altura (cm)</label>
                                <Input
                                    onChange={handleChange}
                                    name="altura"
                                    value={dataForm.altura}
                                    type="number"
                                    step="any"
                                    min={50}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label className="block mb-1">Peso Actual (Kg)</label>
                                <Input
                                    onChange={handleChange}
                                    name="peso"
                                    value={dataForm.peso}
                                    type="number"
                                    step="any"
                                    min={0}
                                    required
                                />
                            </div>
                        </div>
                        {/* AJUSTES AVANZADOS */}
                        <fieldset className="border border-gray-300 p-6 rounded flex  gap-8">
                            <legend className="font-bold ">Ajustes avanzados</legend>
                            <div className="flex flex-col justify-between w-[50%] gap-2">
                                <p className="font-bold">Ajuste de macros por Kg de peso corporal</p>
                                <div className="">
                                    <label className="flex items-center gap-2">Proteinas <span className="cursor-pointer" onClick={() => hadleModal('proteinInfo')}><InfoCircleOutlined /></span></label>
                                    <Input
                                        type="number"
                                        step="any"
                                        min={1.2} max={2.2}
                                        onChange={handleChange}
                                        name="proteinPerKg"
                                        value={dataForm.proteinPerKg} />
                                </div>
                                <div className="">
                                    <label className="flex items-center gap-2">Grasas
                                        <span className="cursor-pointer" onClick={() => hadleModal('fatInfo')}><InfoCircleOutlined /></span>
                                    </label>
                                    <Input
                                        type="number"
                                        step="any"
                                        min={1} max={1.5}
                                        onChange={handleChange}
                                        name="fatPerKg"
                                        value={dataForm.fatPerKg}
                                    />
                                </div>
                                <div className="">
                                    <label className="flex items-center gap-2">Carbohidratos
                                        <span className="cursor-pointer" onClick={() => hadleModal('carbInfo')}><InfoCircleOutlined /></span>
                                    </label>
                                    <Input
                                        type="number"
                                        step="any"
                                        onChange={handleChange}
                                        name="carbPerKg"
                                        disabled='true'
                                        value={dataForm.carbPerKg}
                                    />
                                </div>
                            </div>

                            <div className="w-[50%] flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="checkbox"
                                        name="checkbox"
                                        checked={includeFatBody}
                                        onChange={(event) => {
                                            setIncludeFatBody(event.target.checked);
                                            setDataForm({ ...dataForm, bodyFat: '' });
                                        }} />
                                    <p className="mb-0">Incluye mi nivel de grasa corporal (%)</p><span className="cursor-pointer"
                                        onClick={() => hadleModal('bodyFatInfo')}><InfoCircleOutlined /></span>

                                </div>
                                <Input type="number" step="any" disabled={!includeFatBody} onChange={handleChange} name="bodyFat"
                                    value={dataForm.bodyFat} />

                            </div>


                        </fieldset>
                        <Button type="submit" variant="primary">{loadingCalc ? 'Procesando...' : 'Enviar'}</Button>
                    </form>
                </div>
            </section>

            {/*SECCION 2 - resultados */}
            <section className="flex flex-col lg:flex-row flex-wrap gap-10 p-6 mb-[150px] sm:mb-0">
                <div className="w-full lg:w-1/3 max-w-[448px] ">
                    <h3 className="text-lg font-semibold mb-2">Resultados</h3>
                    <p className="text-sm text-gray-600">
                        {textResultado}</p>
                </div>
                {loading ? <div className="w-full max-w-[896px] min-h-[118px] flex items-center justify-center pb-6"><Spin /></div> : <div className="w-full lg:flex-1 max-w-[896px] flex flex-col items-center lg:flex-row gap-4 ">
                    <div className="w-[100%] lg:w-1/2 max-w-[448px] flex flex-col gap-5">
                        <h3>Distribución de macros</h3>
                        <CardMacro color="#51a2ff" content={{ macro: 'Proteina', value: `${usuario.obj_proteinas} g`, percent: "50" }} />
                        <CardMacro color="#66be72" content={{ macro: 'Carbohidratos', value: `${usuario.obj_carbohidratos} g`, percent: "50" }} />
                        <CardMacro color="#ffc64d" content={{ macro: 'Grasas', value: `${usuario.obj_grasas} g`, percent: "50" }} />
                    </div>
                    <div className="w-[100%] lg:w-1/2 max-w-[448px] flex flex-col items-center gap-5">
                        <h3>Calorias totales a consumir por día</h3>
                        <div className="w-[150px] h-[150px] rounded-full bg-linear-to-bl from-[#51a2ff] to-[#66be72] flex items-center justify-center">
                            <div className="w-[85%] h-[85%] bg-white  rounded-full flex justify-center items-center text-4xl flex-col "><p>{usuario.obj_calorias}</p><p>kCal</p></div>
                        </div>
                    </div>
                </div>}
            </section>


        </SectionMain>

    )
}

export default Calculadora;