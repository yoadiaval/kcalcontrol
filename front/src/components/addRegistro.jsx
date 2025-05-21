import useAlimentosContext from "../hooks/useAlimentosContext";
import { useState, useRef, useEffect } from "react";
import { Input, Space, Table, Button, Spin } from 'antd';
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import useCentralContext from "../hooks/useCentralContext";
import { toast } from "react-toastify";
import axios from "axios";
import ImportarAlimento from "./importarAlimento";

function AddRegistro({ tipoComida }) {

    /*CONTEXT*/

    const { getAlimentos, alimentos, insertarRegistro, isMobile } = useCentralContext();

    /*ESTADOS*/

    const [loading, setLoading] = useState(true);
    const [activo, setActivo] = useState('op1')
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    /*VARIABLES GLOBALES*/
    const searchInput = useRef(null);

    /*ACTUALIZACIONES*/

    useEffect(() => {
        const fetchData = async () => {
            /*Resto de elementos que necesito cargar*/
            const resultGetAlimentos = await getAlimentos();

            if (resultGetAlimentos) {
                setLoading(false);
            }
        };

        fetchData();


    }, []);


    /*FUNCIONES*/
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
        ...(isMobile ? [
            {
                title: 'Acciones', dataIndex: 'acciones', key: 'acciones', width: '20%', render: (text, record) => (
                    <Space>
                        <PlusOutlined onClick={() => handleAdd(record)} />

                    </Space>
                )
            }
        ] : []),
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
                        <PlusOutlined onClick={() => handleAdd(record)} />

                    </Space>
                )
            },

        ),
    ];



    return (
        <div className="w-[100%] min-h-[500px]">
            <ul className="flex gap-[1rem]">
                <li onClick={() => { setActivo('op1') }} className={`cursor-pointer ${activo == 'op1' ? 'border-b-4 border-b-blue-300 ' : ''}`}>Mis alimentos</li>
                <li onClick={() => { setActivo('op2') }} className={`cursor-pointer ${activo == 'op2' ? 'border-b-4 border-b-blue-300 ' : ''}`}>Alimentos por Código de Barras</li>
            </ul>

            <hr className="w-[100%] border-gray-200 mb-[20px]" />
            {loading ? <div className="min-h-[453px] w-[100%] flex items-center justify-center"><Spin /></div> : <div>{activo == 'op1' && <Table columns={columns} dataSource={alimentos} pagination={{ pageSize: 5 }} className="w-[100%] overflow-x-scroll" />}
                {activo === 'op2' && <ImportarAlimento data={tipoComida} />}</div>}


        </div>)
}

export default AddRegistro;