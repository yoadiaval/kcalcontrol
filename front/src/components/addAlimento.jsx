import { Input, Select } from "./formComp";
import Button from "./button";
import { useState } from "react";
import { toast } from "react-toastify";

import useCentralContext from "../hooks/useCentralContext";

function AddAlimento() {

    const { insertarAlimento } = useCentralContext()
    const [dataForm, setDataForm] = useState({
        descripcion: '',
        base: '',
        calorias: '',
        proteinas: '',
        grasas: '',
        carbohidratos: '',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataForm((prev) => {
            return { ...prev, [name]: value };
        });
    }
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const result = await insertarAlimento(dataForm);
        if (result) {
            toast.success('Alimento agregado exitosamente')
        } else {
            toast.error('Ha ocurrido un error. Posible alimento repetido')
        }
        setDataForm({
            descripcion: '',
            base: '',
            calorias: '',
            proteinas: '',
            grasas: '',
            carbohidratos: '',

        })
setLoading(false);
    }

    return <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <Input
                name="descripcion"
                type="text"
                value={dataForm.descripcion}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Base (g)</label>
            <Input
                name="base"
                type="number"
                min='0'
                value={dataForm.base}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
            />
        </div>


        <div>
            <label className="block text-sm font-medium mb-1">Calorías (g)</label>
            <Input
                name="calorias"
                type="number"
                step="any"
                min='0'
                value={dataForm.calorias}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
            />
        </div>


        <div>
            <label className="block text-sm font-medium mb-1">Proteínas (g)</label>
            <Input
                name="proteinas"
                type="number"
                step="any"
                min='0'
                value={dataForm.proteinas}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
            />
        </div>


        <div>
            <label className="block text-sm font-medium mb-1">Grasas (g)</label>
            <Input
                name="grasas"
                type="number"
                step="any"
                min='0'
                value={dataForm.grasas}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
            />
        </div>


        <div>
            <label className="block text-sm font-medium mb-1">Carbohidratos (g)</label>
            <Input
                name="carbohidratos"
                type="number"
                step="any"
                min='0'
                value={dataForm.carbohidratos}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
            />
        </div>

        <div className="flex justify-end md:col-span-2">
            <Button type="submit">{loading ? 'Añadiendo...':'Guardar'}</Button>
        </div>
    </form>

}

export default AddAlimento;