import { useState } from "react";
import Button from "./button";
import CardMacro from "./cardMacro";
import { Input, Select } from "./formComp";
import SectionMain from "./SectionMain";
import { toast } from "react-toastify";
import useCentralContext from "../hooks/useCentralContext";

function MainCalculadora() {
    const { setPersonalInfo, nutriMacros, computar } = useCentralContext();
    const [dataForm, setDataForm] = useState({
        genero: '',
        edad: '',
        actividad: '',
        objetivo: '',
        altura: '',
        peso: ''
    });


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
            label: "Sedentario",
            value: "1"
        },
        {
            label: "Ligeramente Activo",
            value: "2"
        },
        {
            label: "Moderadamente Activo",
            value: "3"
        },
        {
            label: "Muy Activo",
            value: "4"
        },
        {
            label: "Extremadamente activo",
            value: "5"
        },
    ]

    const optionsObjetivos = [
        {
            label: "Ganar Peso",
            value: "1"
        },
        {
            label: "mantenerme",
            value: "2"
        },
        {
            label: "Perder Peso",
            value: "3"
        }
    ]

    let textResultado = "Rellena la información de la sección anterior para obtener un resultado estimado "

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Se envían los datos a computo de calorías

        if (
            dataForm.genero != '' &&
            dataForm.objetivo != '' &&
            dataForm.actividad != ''
        ) {

            setPersonalInfo(dataForm);
            const resultado = await computar(dataForm);
            console.log(resultado)
            setDataForm({
                genero: '',
                edad: '',
                actividad: '',
                objetivo: '',
                altura: '',
                peso: ''
            })
        } else {
            toast.error('Ha dejado de indicar alguno de los siguientes valores: Género, Indice de actividad u Objetivo');
        }
        //Se actualiza la info en la base de datos 


    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataForm((prev) => {
            return { ...prev, [name]: value };
        });
    }

    return (
        <SectionMain header="Calculadora de Macros">
            <section className="flex gap-[50px] p-[50px]">
                <div className="w-[30%] ">
                    <h3>Datos Personales</h3>
                    <p>Completa la siguiente información para que podamos estimar tus objetivos calóricos diarios</p>
                </div>
                <div className="w-[70%]">
                    <form onSubmit={handleSubmit} className="w-[700px] flex flex-col gap-[30px] ">

                        <div className="flex gap-[20px]">
                            <div className="w-[50%]">
                                <label className="block" >Inserte su Género</label>
                                <Select
                                    onChange={handleChange}
                                    name='genero'
                                    value={dataForm.genero}
                                    type="text"
                                    options={optionsGender} />
                            </div>
                            <div className="w-[50%]">
                                <label className="block">Inserte su Edad</label>
                                <Input
                                    onChange={handleChange}
                                    name='edad'
                                    value={dataForm.edad}
                                    type="number"
                                    required />
                            </div>
                        </div>

                        <div>
                            <label className="block">Indice de actividad</label>
                            <Select
                                onChange={handleChange}
                                name='actividad'
                                value={dataForm.actividad}
                                type="text"
                                options={optionsActivity} />
                        </div>
                        <div>
                            <label className="block">Objetivo</label>
                            <Select
                                onChange={handleChange}
                                name='objetivo'
                                value={dataForm.objetivo}
                                type="text"
                                options={optionsObjetivos} />
                        </div>

                        <div>
                            <div className="flex gap-[20px]">
                                <div className="w-[50%]">
                                    <label className="block">Altura(cm)</label>
                                    <Input
                                        onChange={handleChange}
                                        name='altura'
                                        value={dataForm.altura}
                                        type="number" min={0}
                                        required />
                                </div>
                                <div className="w-[50%]">
                                    <label className="block">Peso Actual(Kg)</label>
                                    <Input
                                        onChange={handleChange}
                                        name='peso'
                                        value={dataForm.peso}
                                        type="number" min={0}
                                        required />
                                </div>
                            </div>
                        </div>
                        <Button type='submit' variant="primary" className="ml-2"> Enviar </Button>

                    </form>
                </div>
            </section>
            <section className="flex gap-[50px] p-[50px]">
                <div className="w-[30%]">
                    <h3>Resultados</h3>
                    <p>{textResultado}</p>
                </div>
                <div className="w-[70%]">
                    <div className="flex gap-[60px] items-center">
                        <div className="flex flex-col gap-5">
                            <h3>Distribución de macros</h3>
                            <CardMacro color="#51a2ff" content={{ macro: 'Proteina', value: `${nutriMacros.proteinas.toFixed(2)} g`, percent: "50" }} />
                            <CardMacro color="#66be72" content={{ macro: 'Carbohidratos', value: `${nutriMacros.carbohidratos.toFixed(2)} g`, percent: "50" }} />
                            <CardMacro color="#ffc64d" content={{ macro: 'Grasas', value: `${nutriMacros.grasas.toFixed(2)} g`, percent: "50" }} />
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <h3>Calorias totales a consumir por día</h3>
                            <div className="w-[150px] h-[150px] rounded-full bg-linear-to-bl from-[#51a2ff] to-[#66be72] flex items-center justify-center">
                                <div className="w-[85%] h-[85%] bg-white  rounded-full flex justify-center items-center text-4xl flex-col "><p>{nutriMacros.calorias.toFixed(2)}</p><p>kCal</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </SectionMain>

    )
}

export default MainCalculadora;