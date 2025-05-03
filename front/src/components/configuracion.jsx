import SectionMain from "./SectionMain";
import { Input, Select } from "./formComp";
import Button from "./button";


function Configuracion() {
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
    return (
        <SectionMain header="Configuración">
            <section className="flex gap-[50px] p-[50px]">
                <div className="w-[30%]">
                    <h3>Datos Personales</h3>
                    <p>Desde aquí podrás modificar tus datos personales</p>
                </div>
                <div className="w-[70%] flex flex-col gap-[60px]">
                    <form className="w-[700px] flex flex-col gap-[30px] ">
                        <div className="flex gap-[20px]">
                            <div className="w-[50%]">
                                <label className="block" >Inserte su nombre</label>
                                <Input type="text" />
                            </div>
                            <div className="w-[50%]">
                                <label className="block">Inserte sus apellidos</label>
                                <Input type="text" />
                            </div>
                        </div>
                        <div>
                            <label className="block">Inserte su email</label>
                            <Input type="email" />
                        </div>
                        <div>
                            <label className="block" >Inserte sexo</label>
                            <Select type="text" options={optionsGender} />
                        </div>
                        <div className="flex gap-[20px]">
                            <div className="w-[50%]">
                                <label className="block">Altura(cm)</label>
                                <Input type="number" min={0} />
                            </div>
                            <div className="w-[50%]">
                                <label className="block">Peso Actual(Kg)</label>
                                <Input type="number" min={0} />
                            </div>
                        </div>

                        <Button variant="primary"> Guardar </Button>

                    </form>
                    <div className="flex gap-5 items-center">
                        <h3>Restablecer Contraseña</h3> <Button variant="primary">Restablecer</Button>
                    </div>
                </div>
            </section>
        </SectionMain>)
}

export default Configuracion;