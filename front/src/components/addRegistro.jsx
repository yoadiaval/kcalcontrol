import useAlimentosContext from "../hooks/useAlimentosContext";
import { useState, useRef } from "react";
import { Input, Space, Table, Button } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import useCentralContext from "../hooks/useCentralContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddRegistro({ tipoComida }) {
    const { alimentos } = useAlimentosContext();
    const { insertarRegistro } = useCentralContext();
    const [codProducto, setCodProducto] = useState('');
    const [imgProducto, setImgProducto] = useState(null);
    const [activo, setActivo] = useState('op1')
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
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
        console.log(2)
        const response = await insertarRegistro(record.id, tipoComida);
        if (response) {
            toast.success('Ha insertado un registro exitosamente')
        } else {
            toast.error('Alimento repetido')
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
            { title: 'Base', dataIndex: 'base', key: 'base', width: '20%' },

        ),
        Object.assign(
            Object.assign(
                { title: 'Calorias', dataIndex: 'calorias', key: 'calorias' },

            ),
            {
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                { title: 'Proteinas', dataIndex: 'proteinas', key: 'proteinas' },

            ),
            {
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                { title: 'Grasas', dataIndex: 'grasas', key: 'grasas' },

            ),
            {
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                { title: 'Carbohidratos', dataIndex: 'carbohidratos', key: 'carbohidratos' },

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
        if (codProducto !== '') {
            try {
                const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codProducto}.json`);

                console.log(response.data.product.product_name_es);
                console.log('Proteinas: ' + response.data.product.nutriments.proteins_100g);
                console.log('Carbohidratos:' + response.data.product.nutriments.carbohydrates_100g);
                console.log('grasas: ' + response.data.product.nutriments.fat_100g);
                console.log('Calorias: ' + response.data.product.nutriments["energy-kcal_100g"]);
                console.log(response.data.product.image_url)

                console.log(response.data.product)
                setImgProducto(response.data.product.image_url
                )
            } catch (error) {
                console.error('Error al buscar el producto:', error);
            }
        } else {
            toast.error('Inserte un código válido');
        }

    };

    return (
        <div className="w-[860px] h-[500px]">
            <ul className="flex gap-[1rem]">
                <li onClick={() => { setActivo('op1') }} className={`cursor-pointer ${activo == 'op1' ? 'border-b-4 border-b-blue-300 ' : ''}`}>Mis alimentos</li>
                <li onClick={() => { setActivo('op2') }} className={`cursor-pointer ${activo == 'op2' ? 'border-b-4 border-b-blue-300 ' : ''}`}>Alimentos por Código de Barras</li>
            </ul>

            <hr className="w-[100%] border-gray-200 mb-[20px]" />
            {activo == 'op1' && <Table columns={columns} dataSource={alimentos} pagination={{ pageSize: 5 }} />}
            {activo === 'op2' && <div>
                <div className="flex gap-[6rem] mt-[2rem]">
                    <p className="w-[30%]">Desde esta vista podrás escribir el código de barras del alimento que deseas añadir</p>
                    <form className=' flex flex-col gap-2' onSubmit={searchAlimentoApi}>
                        <label>Inserte el código de barras del producto deseado</label>
                        <input className="bg-[#F9FAFB] px-4 py-2 rounded-md border border-neutral-200 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-[100%]" value={codProducto} onChange={(e) => { setCodProducto(e.target.value) }} />
                        <button type="submit" className="bg-blue-400 text-white hover:bg-blue-500 py-[0.5rem] rounded cursor-pointer">Enviar</button>
                    </form>
                    <img src={imgProducto || "/img/default.jpg"} alt="" />
                </div>


            </div>}

        </div>)
}

export default AddRegistro;