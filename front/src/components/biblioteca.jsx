import { useRef, useState } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Space, Table } from 'antd';
import SectionMain from './SectionMain';
import Highlighter from 'react-highlight-words';
import useCentralContext from '../hooks/useCentralContext'
import AddAlimento from './addAlimento';
import Button from './button';
import Modal from './modal';
import EditAlimento from './editAlimento';
import ImportarAlimento from './importarAlimento';
import { toast } from "react-toastify";

function Biblioteca() {
    const { alimentos, eliminarAlimento, simplificarAside, isMobile } = useCentralContext();

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [alimentoToEdit, setAlimentoToEdit] = useState(null);
    const [showModalImportar, setShowModalImportar] = useState(false);


    /*ESTADOS DE ANT DESIGN*/

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const openModalAdd = () => setShowModalAdd(true);
    const closeModalAdd = () => setShowModalAdd(false);

    const openModalEdit = () => setShowModalEdit(true);
    const closeModalEdit = () => setShowModalEdit(false);

    const openModalImportar = () => setShowModalImportar(true);
    const closeModalImportar = () => setShowModalImportar(false);



    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    const handleEdit = (record) => {
        setAlimentoToEdit(record);
        openModalEdit();
    };

    const handleDelete = async (record) => {
        const result = await eliminarAlimento(record)
        if (result.status == 200) {
            toast.success('Alimento eliminado correctamente')
        }

    };



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
                title: 'Acciones',
                dataIndex: 'acciones',
                key: 'acciones',
                width: '20%',
                render: (text, record) => (
                    <Space className="flex justify-around w-[50%]">
                        <EditOutlined onClick={() => handleEdit(record)} />
                        <DeleteOutlined onClick={() => handleDelete(record)} style={{ color: 'red' }} />
                    </Space>
                ),
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
                    <Space className='flex justify-around w-[50%]'>
                        <EditOutlined onClick={() => handleEdit(record)} />
                        <DeleteOutlined onClick={() => handleDelete(record)} style={{ color: 'red' }} />
                    </Space>
                )
            },

        ),
    ];
    return (
        <>
            {showModalAdd && (
                <Modal onClose={closeModalAdd} title='Añadir alimento'>
                    <AddAlimento />
                </Modal>
            )}
            {showModalEdit && (
                <Modal onClose={closeModalEdit} title='Editar Alimento'>
                    <EditAlimento data={alimentoToEdit} onClose={closeModalEdit} />
                </Modal>
            )}
            {showModalImportar && (
                <Modal onClose={closeModalImportar} title='Importar alimento'>
                    <ImportarAlimento data={alimentoToEdit} onClose={closeModalEdit} />
                </Modal>
            )}
            <SectionMain header="Biblioteca de alimentos">
                <div className={`w-[90vw] md:m-0 m-auto ${simplificarAside ? 'md:w-[85vw] lg:w-[90vw]' : 'md:w-[58vw] lg:w-[70vw]'}`}>
                    <div className='w-[100%] '>
                        <div className='flex flex-col md:flex-row md:justify-end gap-[1rem] my-[2rem]'>
                            <Button onClick={openModalAdd}>Añadir personalizado</Button>
                            <Button onClick={openModalImportar}>Importar alimento por código</Button>
                        </div>
                        <div className='w-[100%] overflow-x-auto m-auto'>
                            <Table columns={columns} dataSource={alimentos} pagination={{ pageSize: 8 }} scroll={{ x: 'max-content' }} />
                        </div>
                    </div>
                </div>


            </SectionMain>
        </>);
}

export default Biblioteca