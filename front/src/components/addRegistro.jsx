import useAlimentosContext from "../hooks/useAlimentosContext";
import { useState, useRef } from "react";
import { Input, Space, Table, Button, Spin } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import useCentralContext from "../hooks/useCentralContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddRegistro({ tipoComida }) {
    const { alimentos } = useAlimentosContext();
    const { insertarRegistro, transaccionCrearRegistrarComida } = useCentralContext();
    const [codProducto, setCodProducto] = useState('');
    const [productoApi, setProductoApi] = useState({
        descripcion: '',
        proteinas: '',
        carbohidratos: '',
        grasas: '',
        calorias: ''
    });
    const [busquedaActiva, setBusquedaActiva] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgProducto, setImgProducto] = useState(null);
    const [activo, setActivo] = useState('op1')
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [ampliada, setAmpliada] = useState(false);
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const handleAdd = async (record) => {

        const response = await insertarRegistro(record.id, tipoComida);
        if (response) {
            toast.success('Ha insertado un registro exitosamente')
        } else {
            toast.error('Alimento repetido')
        }
    }
    const handleImport = async () => {
        const result = await transaccionCrearRegistrarComida(productoApi, tipoComida);
        if (result) {
            toast.success('Alimento agregado exitosamente')
            setBusquedaActiva(false);
        } else {
            toast.error('Ha ocurrido un error. Posible alimento repetido')
        }
    }
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => {
                        var _a;
                        return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
                    }, 100);
                }
            },
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        Object.assign(
            { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion', width: '30%' },
            getColumnSearchProps('descripcion'),
        ),
        Object.assign(
            { title: 'Base (g)', dataIndex: 'base', key: 'base', width: '10%' },

        ),
        Object.assign(
            Object.assign(
                { title: 'Calorias (kcal)', dataIndex: 'calorias', key: 'calorias' },

            ),
            {
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                { title: 'Proteinas  (g)', dataIndex: 'proteinas', key: 'proteinas' },

            ),
            {
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                { title: 'Grasas  (g)', dataIndex: 'grasas', key: 'grasas' },

            ),
            {
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                { title: 'Carbohidratos  (g)', dataIndex: 'carbohidratos', key: 'carbohidratos' },

            ),
            {
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            {
                title: 'Acciones', dataIndex: 'acciones', key: 'acciones', width: '20%', render: (text, record) => (
                    <Space>
                        <Button onClick={() => handleAdd(record)}>Agregar</Button>

                    </Space>
                )
            },

        ),
    ];

    const searchAlimentoApi = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (codProducto !== '') {
            try {
                const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codProducto}.json`);
                const datosProducto = response.data.product
                setProductoApi({
                    descripcion: datosProducto.product_name_es,
                    proteinas: datosProducto.nutriments.proteins_100g ?? '-',
                    carbohidratos: datosProducto.nutriments.carbohydrates_100g ?? '-',
                    grasas: datosProducto.nutriments.fat_100g ?? '-',
                    calorias: datosProducto.nutriments["energy-kcal_100g"] ?? '-'
                });
                setBusquedaActiva(true);
                setLoading(false);

                console.log(response.data.product)
                setImgProducto(response.data.product.image_url)
                setCodProducto('');

            } catch (error) {
                console.error('Error al buscar el producto:', error);
            }
        } else {
            toast.error('No existe un producto asociado a ese código');
        }

    };


    return (
        <div className="w-[860px] min-h-[500px]">
            <ul className="flex gap-[1rem]">
                <li onClick={() => { setActivo('op1') }} className={`cursor-pointer ${activo == 'op1' ? 'border-b-4 border-b-blue-300 ' : ''}`}>Mis alimentos</li>
                <li onClick={() => { setActivo('op2') }} className={`cursor-pointer ${activo == 'op2' ? 'border-b-4 border-b-blue-300 ' : ''}`}>Alimentos por Código de Barras</li>
            </ul>

            <hr className="w-[100%] border-gray-200 mb-[20px]" />
            {activo == 'op1' && <Table columns={columns} dataSource={alimentos} pagination={{ pageSize: 5 }} />}
            {activo === 'op2' && <div>
                <div className="flex gap-[6rem] mt-[2rem] ">
                    <div className="w-[30%]">
                        <p>Desde esta vista podrás escribir el código de barras del alimento que deseas añadir</p>
                        <br />
                        <p >Realice esta acción una única vez por alimento</p>
                        <br />
                        <p>Cada alimento añadido pasa a formar parte de su biblioteca de alimentos</p>
                    </div>
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
                            busquedaActiva && (
                                <div>
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
                                </div>
                            )
                        )}

                    </div>


                </div>



            </div>}

        </div>)
}

export default AddRegistro;