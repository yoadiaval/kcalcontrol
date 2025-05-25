import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spin } from 'antd';
import useCentralContext from "../hooks/useCentralContext";

function ImportarAlimento(props) {
    const { data: tipoComida } = props;

    const { insertarAlimento, transaccionCrearRegistrarComida, isMobile } = useCentralContext();

    const [ampliada, setAmpliada] = useState(false);
    const [codProducto, setCodProducto] = useState('');
    const [productoApi, setProductoApi] = useState({
        descripcion: '',
        base: '',
        proteinas: '',
        carbohidratos: '',
        grasas: '',
        calorias: ''
    });
    const [resultSearch, setResultSearch] = useState(0)


    const [busquedaActiva, setBusquedaActiva] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgProducto, setImgProducto] = useState(null);

    const searchAlimentoApi = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (codProducto !== '') {
            try {
                const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codProducto}.json`);

                const result = response.data.status;

                setResultSearch(result)


                if (result === 1) {
                    const datosProducto = response.data.product

                    setProductoApi({
                        descripcion: datosProducto.product_name_es,
                        base: '100',
                        proteinas: datosProducto.nutriments.proteins_100g ?? '-',
                        carbohidratos: datosProducto.nutriments.carbohydrates_100g ?? '-',
                        grasas: datosProducto.nutriments.fat_100g ?? '-',
                        calorias: datosProducto.nutriments["energy-kcal_100g"] ?? '-'
                    });
                    setImgProducto(response.data.product.image_url)
                    setBusquedaActiva(true);
                    
                } else if (result === 0) {
                    setProductoApi({
                        descripcion: '',
                        base: '',
                        proteinas: '',
                        carbohidratos: '',
                        grasas: '',
                        calorias: ''
                    })
                    setBusquedaActiva(false);
                    toast.error('No existe un producto asociado a ese código');
                }
                setLoading(false)
                setCodProducto('');

            } catch (error) {
                console.error('Error al buscar el producto:', error);
            }
        }

    };

    const handleImport = async () => {

        if (tipoComida === undefined) {

            const result = await insertarAlimento(productoApi);
            if (result) {
                toast.success('Alimento agregado exitosamente')
                setBusquedaActiva(false);
            } else {
                toast.error('Ha ocurrido un error. Posible alimento repetido')
            }
        } else {

            const result = await transaccionCrearRegistrarComida(productoApi, tipoComida);
            if (result) {
                toast.success('Alimento agregado exitosamente')
                setBusquedaActiva(false);
            } else {
                toast.error('Ha ocurrido un error. Posible alimento repetido')
            }
        }


    }
    return (<><div>
        <div className={`flex gap-[6rem] mt-[2rem] ${isMobile ? 'justify-center' : ''}`}>
            {!isMobile && <div className="w-[30%]">
                <p>Desde esta vista podrás escribir el código de barras del alimento que deseas añadir</p>
                <br />
                <p >Realice esta acción una única vez por alimento</p>
                <br />
                <p>Cada alimento añadido pasa a formar parte de su biblioteca de alimentos</p>
            </div>}
            <div className="flex flex-col gap-[2rem] w-[400px]">
                <form className=' flex flex-col gap-2 w-[100%]' onSubmit={searchAlimentoApi}>
                    <label>Inserte el código de barras del producto deseado</label>
                    <input className="bg-[#F9FAFB] px-4 py-2 rounded-md border border-neutral-200 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-[100%]" value={codProducto} onChange={(e) => { setCodProducto(e.target.value) }} />
                    <button type="submit" disabled={busquedaActiva} className={`py-[0.5rem] rounded cursor-pointer text-white
    ${loading || busquedaActiva ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-500'}`}>Enviar</button>
                </form>
                {loading ? (
                    <Spin />
                ) : (
                    (busquedaActiva && resultSearch === 1) && (
                        <div>
                            {<>
                                <h3>¿Es este el producto que buscas?</h3>

                                <div className="flex gap-[1rem]">
                                    <figure className="w-[100px] h-[fit-content] shadow-md cursor-zoom-in">
                                        <img onClick={() => setAmpliada(true)} src={imgProducto || "/img/default.jpg"} alt="" className="w-[100%] rounded" />
                                    </figure>
                                    {ampliada && (
                                        <div
                                            className="fixed inset-0 bg-white rounded-2xl bg-opacity-80 flex items-center justify-center z-50 "
                                            onClick={() => setAmpliada(false)}
                                        >
                                            <div className="absolute top-2.5 right-2.5 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-gray-500 hover:text-gray-700">
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg></div>
                                            <img
                                                src={imgProducto}
                                                alt=''
                                                className="max-w-full max-h-full rounded shadow-lg cursor-zoom-out"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="border border-gray-200 rounded  text-center">{productoApi.descripcion}</h3>
                                        <p className="underline" >Propiedades Macros (por cada 100g de producto)</p>
                                        <div><span>Proteinas: </span>{productoApi.proteinas} g</div>
                                        <div><span>Carbohidratos: </span>{productoApi.carbohidratos} g</div>
                                        <div><span>Grasas: </span>{productoApi.grasas} g</div>
                                        <div><span>Calorias: </span>{productoApi.calorias} kcal</div>
                                        <div className="flex gap-[0.5rem] my-2">
                                            <button
                                                onClick={handleImport}
                                                className="block w-[100%] bg-blue-400 text-white px-[0.5rem] hover:bg-blue-500 py-[0.5rem] rounded cursor-pointer"
                                            >
                                                Añadir
                                            </button>
                                            <button
                                                onClick={() => setBusquedaActiva(false)}
                                                className="block w-[100%] bg-blue-400 text-white px-[0.5rem] hover:bg-blue-500 py-[0.5rem] rounded cursor-pointer"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </div>
                    )
                )}

            </div>


        </div>



    </div></>)
}

export default ImportarAlimento;