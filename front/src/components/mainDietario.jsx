import SectionMain from "./SectionMain";
import { Progress } from "antd";
import CardFood from "./cardFood";
import Button from "./button";

function MainDietario() {
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    return <SectionMain header="Dietario">
        <section className="flex flex-col gap-[50px] items-center p-[30px]">
            <div className="text-center">
                <h3>Objetivos</h3>
                <p>Este es tu progreso en el día de hoy</p>
            </div>
            <div className="flex justify-around gap-[30px]">
                <div className="flex flex-col items-center gap-2">
                    <Progress type="circle" percent={90} strokeColor={twoColors} />
                    <p>Proteinas</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Progress type="circle" percent={50} strokeColor={twoColors} />
                    <p>Carbohidratos</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Progress type="circle" percent={100} strokeColor={twoColors} />
                    <p>Grasas</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Progress type="circle" percent={100} strokeColor={twoColors} />
                    <p>Calorias</p>
                </div>
            </div>
        </section>
        <section>
            <div className="p-[20px]">
                <ul className="flex ">
                    <li className="border-b-4 border-b-blue-300 cursor-pointer hover:bg-neutral-200 w-[80px] p-[5px]">Desayuno</li>
                    <li className="cursor-pointer hover:bg-neutral-200 w-[80px] text-center p-[5px]">Almuerzo</li>
                    <li className="cursor-pointer hover:bg-neutral-100 w-[80px] text-center p-[5px]">Cena</li>
                </ul>

                <hr className="w-[100%] border-gray-200 mb-[20px]" />
                <div className="w-[100%] text-end pr-[31px]"><Button>Agregar Comida</Button></div>
                
                <div className="flex flex-wrap justify-between gap-[30px] p-[30px]">
                    <CardFood />
                    <CardFood />
                    <CardFood />
                    <CardFood />
                    <CardFood />
                    <CardFood />
                    <CardFood />
                    <CardFood />
                    <CardFood />
                    <CardFood />

                </div>

            </div>
        </section>
    </SectionMain>

}

export default MainDietario;