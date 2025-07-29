import Progress from 'antd/es/progress';
import { obtenerFechaActual } from "../utils/utils";
import useCentralContext from '../hooks/useCentralContext';


function ObjetivosProgreso(props) {
    const { porcentajeMacros, macrosAcc} = props;
    const { userData, isMobile } = useCentralContext();
    const currentDate = obtenerFechaActual();
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };
    
    
  return (
      <><section className={`flex flex-col gap-[20px] items-center p-[10px] bg-[#DBEAFE] rounded-2xl ${isMobile ? 'order-1 mt-[20px] w-[90%] m-auto' : ''}`}>
          <div className="text-center">
              <h3>Objetivos</h3>
              <p>Este es tu progreso en el día de hoy</p>
              <p className="font-bold text-3xl">{currentDate[1]}</p>
          </div>
          <div className={`flex flex-col justify-around gap-[10px] ${isMobile ? 'flex-row flex-wrap' : ''} `}>
              <div className="flex flex-col items-center ">
                  <Progress type="circle" percent={porcentajeMacros.proteinas} strokeColor={twoColors} />
                  <div className="font-bold">{macrosAcc.proteinas.toFixed(2)} / {userData?.usuario?.obj_proteinas}</div>
                  <p>Proteinas (g)</p>
              </div>
              <div className="flex flex-col items-center ">
                  <Progress type="circle" percent={porcentajeMacros.carbohidratos} strokeColor={twoColors} />
                  <div className="font-bold">{macrosAcc.carbohidratos.toFixed(2)} / {userData?.usuario?.obj_carbohidratos}</div>
                  <p>Carbohidratos (g)</p>
              </div>
              <div className="flex flex-col items-center ">
                  <Progress type="circle" percent={porcentajeMacros.grasas} strokeColor={twoColors} />
                  <div className="font-bold">{macrosAcc.grasas.toFixed(2)} / {userData?.usuario?.obj_grasas}</div>
                  <p>Grasas (g)</p>
              </div>
              <div className="flex flex-col items-center ">
                  <Progress type="circle" percent={porcentajeMacros.calorias} strokeColor={twoColors} />
                  <div className="font-bold">{macrosAcc.calorias.toFixed(2)} / {userData?.usuario?.obj_calorias}</div>
                  <p>Calorias  </p>
              </div>
          </div>
      </section></>
  );
}

export default ObjetivosProgreso;