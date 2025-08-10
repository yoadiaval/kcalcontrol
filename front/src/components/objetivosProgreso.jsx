import Progress from 'antd/es/progress';
import { obtenerFechaActual } from "../utils/utils";
import useCentralContext from '../hooks/useCentralContext';
import { CheckOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useState } from 'react';

function ObjetivosProgreso(props) {
    const { porcentajeMacros, macrosAcc } = props;
    const { userData, isMobile } = useCentralContext();
    const currentDate = obtenerFechaActual();
    const [showMacros, setShowMacros] = useState(true);

    return (
        <section
            className="flex flex-col w-full h-full gap-[20px] items-center p-[20px] bg-[#DBEAFE]"
        >
            <div className="flex md:flex-col justify-between w-full items-center">
                <h3 className="text-lg font-semibold">
                    Objetivos: <span className="font-bold text-2xl">{currentDate[1]}</span>
                </h3>
                <h3>
                    Calorías: <span className="font-bold text-2xl">{porcentajeMacros.calorias} %</span>
                </h3>
                {/* Minimal toggle button */}
                {isMobile && <span
                    className="ml-2 cursor-pointer px-2 py-1 rounded bg-white shadow hover:bg-gray-100 flex items-center text-xs"
                    onClick={() => setShowMacros(!showMacros)}
                    title={showMacros ? "Ocultar detalles de macros" : "Mostrar detalles de macros"}
                >
                    {showMacros ? <UpOutlined /> : <DownOutlined />}
                </span>}
            </div>

            {showMacros ? (
                <div className="flex flex-wrap justify-around gap-4 w-full">
                    <div className="flex flex-col items-center bg-white shadow-md p-2 rounded flex-1 min-w-[120px] max-w-[180px]">
                        <Progress type="circle" percent={porcentajeMacros.proteinas} strokeColor="#51a2ff" size={isMobile ? 70 : 120} />
                        <div className="font-bold">{macrosAcc.proteinas.toFixed(2)} / {userData?.usuario?.obj_proteinas}</div>
                        <p>Proteinas (g)</p>
                    </div>
                    <div className="flex flex-col items-center bg-white shadow-md p-2 rounded flex-1 min-w-[120px] max-w-[180px]">
                        <Progress type="circle" percent={porcentajeMacros.carbohidratos} strokeColor="#66be72" size={isMobile ? 70 : 120} />
                        <div className="font-bold">{macrosAcc.carbohidratos.toFixed(2)} / {userData?.usuario?.obj_carbohidratos}</div>
                        <p>Carbohidratos (g)</p>
                    </div>
                    <div className="flex flex-col items-center bg-white shadow-md p-2 rounded flex-1 min-w-[120px] max-w-[180px]">
                        <Progress
                            type="circle"
                            percent={porcentajeMacros.grasas}
                            strokeColor="#ffc64d"
                            size={isMobile ? 70 : 120}
                            status='normal'
                        />
                        <div className="font-bold">{macrosAcc.grasas.toFixed(2)} / {userData?.usuario?.obj_grasas}</div>
                        <p>Grasas (g)</p>
                    </div>
                </div>
            ) : (
                <div className="w-full flex items-center gap-2 justify-around text-sm">
                    <div className='bg-white shadow-md p-2 rounded flex-1 text-center border-l-4 border-[#51a2ff]'>
                        <span className="font-bold text-[#51a2ff]">P:</span>
                        <span className="font-bold ml-1">{macrosAcc.proteinas.toFixed(2)} / {userData?.usuario?.obj_proteinas} g</span>
                    </div>
                    <div className='bg-white shadow-md p-2 rounded flex-1 text-center border-l-4 border-[#66be72]'>
                        <span className="font-bold text-[#66be72]">C:</span>
                        <span className="font-bold ml-1">{macrosAcc.carbohidratos.toFixed(2)} / {userData?.usuario?.obj_carbohidratos} g</span>
                    </div>
                    <div className='bg-white shadow-md p-2 rounded flex-1 text-center border-l-4 border-[#ffc64d]'>
                        <span className="font-bold text-[#ffc64d]">G:</span>
                        <span className="font-bold ml-1">{macrosAcc.grasas.toFixed(2)} / {userData?.usuario?.obj_grasas} g</span>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ObjetivosProgreso;