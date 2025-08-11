import React, { useRef, useEffect, useState } from 'react';
import DateRangeComponent from "./dateRangeComponent";
import SectionMain from "./SectionMain";
import Chart from 'chart.js/auto';
import useCentralContext from '../hooks/useCentralContext';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style';
import { getRegistrosPorRangoFechas } from '../services/registrosService';


function Evolucion() {
    const [ registrosPorPeriodo, setRegistrosPorPeriodo ] = useState([]);
    const { userData } = useCentralContext();

    const chartCaloriasRef = useRef(null);
    const chartMacrosRef = useRef(null);

    const chartCaloriasInstance = useRef(null);
    const chartMacrosInstance = useRef(null);

    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const [resumen, setResumen] = useState({
        totalCalorias: 0,
        totalProteinas: 0,
        totalCarbohidratos: 0,
        totalGrasas: 0,
        caloriasPorDia: [],
        alimentosRecurrentes: []
    });

    // Procesa los datos para las gráficas y resumen
    const procesarInfo = (registros) => {
      

        // Agrupa por fecha
        const porFecha = {};
        const alimentosCount = {};
        const alimentosDesc = {};
        let totalCalorias = 0, totalProteinas = 0, totalCarbohidratos = 0, totalGrasas = 0;

        registros.forEach(item => {
            const fecha = item.fecha;
            const { calorias, proteinas, carbohidratos, grasas, nombre, descripcion, id } = item.alimento_info;
            const cantidad = item.cantidad / 100;

            // Calorías y macros por registro
            const kcal = calorias * cantidad;
            const prot = proteinas * cantidad;
            const carb = carbohidratos * cantidad;
            const fat = grasas * cantidad;

            // Por fecha
            if (!porFecha[fecha]) {
                porFecha[fecha] = { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 };
            }
            porFecha[fecha].calorias += kcal;
            porFecha[fecha].proteinas += prot;
            porFecha[fecha].carbohidratos += carb;
            porFecha[fecha].grasas += fat;

            // Totales
            totalCalorias += kcal;
            totalProteinas += prot;
            totalCarbohidratos += carb;
            totalGrasas += fat;

            // Conteo de alimentos por id
            if (!alimentosCount[id]) alimentosCount[id] = 0;
            alimentosCount[id] += 1;
            alimentosDesc[id] = descripcion || nombre;
        });

        // Datos para gráficas
        const caloriasPorDia = Object.entries(porFecha).map(([dia, val]) => ({
            dia,
            calorias: val.calorias,
            proteinas: val.proteinas,
            carbohidratos: val.carbohidratos,
            grasas: val.grasas
        }));

       
        const alimentosRecurrentes = Object.entries(alimentosCount).map(([id, count]) => ({
                id,
                descripcion: alimentosDesc[id],
                veces: count
            }));

        return {
            caloriasPorDia,
            totalCalorias,
            totalProteinas,
            totalCarbohidratos,
            totalGrasas,
            alimentosRecurrentes
        };
    };

    // Gráfica de calorías y macros por día
    const showCaloriasPorDiaGraph = (data) => {
        if (chartCaloriasRef.current) {
            if (chartCaloriasInstance.current) chartCaloriasInstance.current.destroy();
            const ctx = chartCaloriasRef.current.getContext('2d');
            chartCaloriasInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(row => row.dia),
                    datasets: [
                        {
                            label: 'Calorías',
                            data: data.map(row => row.calorias),
                            backgroundColor: '#60a5fa',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
    };

    // Gráfica de macros totales
    const showMacrosTotalGraph = (data) => {
        if (chartMacrosRef.current) {
            if (chartMacrosInstance.current) chartMacrosInstance.current.destroy();
            const ctx = chartMacrosRef.current.getContext('2d');
            chartMacrosInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Proteínas', 'Carbohidratos', 'Grasas'],
                    datasets: [
                        {
                            label: 'Macros Totales',
                            data: [data.totalProteinas, data.totalCarbohidratos, data.totalGrasas],
                            backgroundColor: ['#51a2ff', '#66be72', '#ffc64d'],
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }
    };

    useEffect(() => {
        return () => {
            if (chartCaloriasInstance.current) chartCaloriasInstance.current.destroy();
            if (chartMacrosInstance.current) chartMacrosInstance.current.destroy();
        };
    }, []);

    useEffect(() => {
        if (registrosPorPeriodo && registrosPorPeriodo.length > 0) {
            const info = procesarInfo(registrosPorPeriodo);
            setResumen(info);

            showCaloriasPorDiaGraph(info.caloriasPorDia); // Solo calorías
            showMacrosTotalGraph(info);

            setShowMessage(false);
        } else {
            if (chartCaloriasInstance.current) chartCaloriasInstance.current.destroy();
            if (chartMacrosInstance.current) chartMacrosInstance.current.destroy();
            setShowMessage(true);
            setResumen({
                totalCalorias: 0,
                totalProteinas: 0,
                totalCarbohidratos: 0,
                totalGrasas: 0,
                caloriasPorDia: [],
                alimentosRecurrentes: []
            });
        }
        setLoading(false);
    }, [registrosPorPeriodo]);

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const paddedMonth = String(month).padStart(2, '0');
        const paddedDay = String(day).padStart(2, '0');
        return `${year}-${paddedMonth}-${paddedDay}`;
    };

    /*NO QUITAR HASTA ENCONTRAR SOLUCION MÁS EFECTIVA Aunque es redundante con el useEffect permite que se obtengan las gráficas sin necesidad de depender del estado, ESTO IMPEDIA QUE SE MOSTRARAN LOS DATOS A LA PRIMERA */
    const showInfo = (registros) => {
        const info = procesarInfo(registros);
        setResumen(info);

        showCaloriasPorDiaGraph(info.caloriasPorDia); // Solo calorías
        showMacrosTotalGraph(info);

        setShowMessage(false);
       
    }

    const changeDateRange = async (range) => {
        setLoading(true);
        const startDate = formatDate(range[0].startDate);
        const endDate = formatDate(range[0].endDate);
        try {
            const registrosDelPeriodo = await getRegistrosPorRangoFechas(startDate, endDate, userData?.usuario?.id);
            setRegistrosPorPeriodo(registrosDelPeriodo);
            showInfo(registrosDelPeriodo);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <SectionMain header='Mi Evolución' className='relative'>
            <div className="w-full h-full flex flex-col md:flex-row flex-wrap mb-[100px] md:mb-0">
                <section className="w-full md:w-fit p-4 md:p-8 h-full flex justify-center items-center">
                    <div className="w-full max-w-xs md:max-w-none">
                        <DateRangeComponent onChange={changeDateRange} />
                    </div>
                </section>
                <section className="flex-1 min-w-[260px] p-4 md:p-8 flex flex-col gap-8">
                    <h2 className="mb-2 text-base md:text-lg">Resultados para el rango de días seleccionado</h2>
                    {showMessage && (
                        <div className='text-gray-600 mt-5'>
                            No hay registros para el rango de días seleccionados.<br />
                            <span className="text-xs text-blue-500">Selecciona un rango de fechas con información para ver tus estadísticas.</span>
                        </div>
                    )}
                    {!showMessage && (
                        <>
                            <div className="flex flex-col md:flex-row gap-8 w-full h-full">
                                <div className="flex-1 flex flex-col items-center min-w-[220px]">
                                    <h3 className="mb-2 text-base md:text-lg">Calorías consumidas por Día</h3>
                                    <div style={{ width: '100%', minHeight: '220px', height: '350px', maxWidth: '100vw' }} className="mt-2">
                                        {loading
                                            ? <div className='w-full h-[70px] flex items-center justify-center'><Spin /></div>
                                            : <canvas ref={chartCaloriasRef}></canvas>
                                        }
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-center min-w-[220px]">
                                    <h3 className="mb-2 text-base md:text-lg">Distribución de Macros Totales</h3>
                                    <div style={{ width: '100%', minHeight: '220px', height: '350px', maxWidth: '100vw' }} className="mt-2">
                                        {(loading)
                                            ? <div className='w-full h-[70px] flex items-center justify-center'><Spin /></div>
                                            :<canvas ref={chartMacrosRef}></canvas>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-8 w-full h-full mt-8">
                                <div className="flex-1 flex flex-col items-center min-w-[220px]">
                                    <h3 className="mb-2 text-base md:text-lg">Resumen de alimentos consumidos </h3>
                                    {resumen.alimentosRecurrentes.length === 0 ? (
                                        <div className="text-gray-500 mt-4">No hay alimentos recurrentes en este período.</div>
                                    ) : (
                                        <ul className="mt-4 w-full max-w-md mx-auto">
                                            {resumen.alimentosRecurrentes.map((a, idx) => (
                                                <li key={a.id} className="flex justify-between py-1 border-b text-sm">
                                                    <span>{idx + 1}. {a.descripcion}</span>
                                                    <span className="font-bold">{a.veces} veces</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center min-w-[220px]">
                                    <h3 className="mb-2 text-base md:text-lg">Resumen del período</h3>
                                    <div className="bg-blue-50 rounded-lg p-4 w-full max-w-md mx-auto shadow text-blue-900">
                                        <div className="mb-2">Total Calorías: <span className="font-bold">{resumen.totalCalorias.toFixed(0)} kcal</span></div>
                                        <div className="mb-2">Total Proteínas: <span className="font-bold">{resumen.totalProteinas.toFixed(0)} g</span></div>
                                        <div className="mb-2">Total Carbohidratos: <span className="font-bold">{resumen.totalCarbohidratos.toFixed(0)} g</span></div>
                                        <div className="mb-2">Total Grasas: <span className="font-bold">{resumen.totalGrasas.toFixed(0)} g</span></div>
                                        <div className="mt-4 text-green-700 font-semibold">
                                            {resumen.totalCalorias > userData?.usuario?.obj_calorias * resumen.caloriasPorDia?.length
                                                ? "¡Has superado tu objetivo calórico en este período!"
                                                : resumen.totalCalorias > userData?.usuario?.obj_calorias * resumen.caloriasPorDia?.length * 0.9
                                                    ? "¡Estás muy cerca de tu objetivo calórico en este período!"
                                                    : "Sigue registrando tus comidas y mantén el ritmo. ¡Tú puedes!"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </SectionMain>
    );
}

export default Evolucion;