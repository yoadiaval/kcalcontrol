import React, { useRef, useEffect, useState } from 'react';
import DateRangeComponent from "./dateRangeComponent";
import SectionMain from "./SectionMain";
import Chart from 'chart.js/auto';
import useCentralContext from '../hooks/useCentralContext';
import { Spin } from 'antd';


function Evolucion() {
    const { getRegistrosPorRangoFechas, registrosPorPeriodo } = useCentralContext();
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []); // Este useEffect solo se encarga de la limpieza inicial/final


    useEffect(() => {
        // Procesa los datos SOLO cuando registrosPorPeriodo cambie
        if (registrosPorPeriodo && registrosPorPeriodo.length > 0) {
            const dataGraph = procesarInfo(registrosPorPeriodo)
            showDataInGraph(dataGraph);
        } else {

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        }

    }, [registrosPorPeriodo]);

    const procesarInfo = (registrosPorPeriodo) => {

        const calorias = registrosPorPeriodo.map((item) => {
            return item.alimento_info.calorias * (item.cantidad) / 100;
        })



        const obj = registrosPorPeriodo.reduce((obj, item, index) => {
            if (!obj[item.fecha]) {
                obj[item.fecha] = 0;
            }
            obj[item.fecha] += calorias[index];
            return obj;
        }, {});
        const data = Object.entries(obj).map(([key, value]) => ({ dia: key, count: value }));
        console.log(data)
        return data;
    };


    const showDataInGraph = (chartData) => {
        if (chartRef.current) {
            // Destruye la instancia anterior si existe antes de crear una nueva
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');

            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData?.map(row => row.dia),
                    datasets: [
                        {
                            label: 'Cantidad de calorías por Día', // Etiqueta más descriptiva
                            data: chartData?.map(row => row.count),
                            backgroundColor: '#bfdbfe',
                            borderColor: '#bfdbfe',
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const paddedMonth = String(month).padStart(2, '0');
        const paddedDay = String(day).padStart(2, '0');
        const fullDate = `${year}-${paddedMonth}-${paddedDay}`
        return fullDate;
    }

    const changeDateRange = async (range) => {
        setLoading(true);
        const startDate = formatDate(range[0].startDate);
        const endDate = formatDate(range[0].endDate);
        try {

            await getRegistrosPorRangoFechas(startDate, endDate);

        } catch (error) {
            console.error(error.message);
            setLoading(false); // Asegúrate de detener el loading en caso de error
        }

        setLoading(false);
    }

    return (<>
        <SectionMain header='Mi Evolución' className='relative'>
            <div className="w-[100%] h-[100%] flex">
                <section className="w-[30%] p-[3rem] h-[100%] ">
                    <DateRangeComponent onChange={changeDateRange} />
                </section>
                <section className="w-[60%] h-[500px]">
                    <p>Resultados para el rango de dias seleccionados </p>

                    <div style={{ width: '100%', height: '100%' }}>
                        {loading ? <div className='w-[100%] h-[70px] flex items-center justify-center'><Spin /></div> : <canvas ref={chartRef}></canvas>}
                    </div>
                </section>

            </div>
        </SectionMain>

    </>)
}

export default Evolucion;
