import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table } from 'antd';
import SectionMain from './SectionMain';
import Highlighter from 'react-highlight-words';
import useCentralContext from '../hooks/useCentralContext'
import AddAlimento from './addAlimento';
import Button from './button';
import Modal from './modal';
import EditAlimento from './editAlimento';
import { toast } from "react-toastify";

function Biblioteca() {
    const { alimentos, eliminarAlimento } = useCentralContext();
    
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [alimentoToEdit, setAlimentoToEdit] = useState(null);


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);




    const openModalAdd = () => setShowModalAdd(true);
    const closeModalAdd = () => setShowModalAdd(false);

    const openModalEdit = () => setShowModalEdit(true);
    const closeModalEdit = () => setShowModalEdit(false);



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
                        <Button onClick={() => handleEdit(record)}>Actualizar</Button>
                        <Button variant='danger' onClick={() => handleDelete(record)}>Eliminar</Button>
                    </Space>
                )
            },

        ),
    ];
    return (
        <>{showModalAdd && (
            <Modal onClose={closeModalAdd} title='Añadir alimento'>
                <AddAlimento />
            </Modal>
        )}
            {showModalEdit && (
                <Modal onClose={closeModalEdit} title='Editar Alimento'>
                    <EditAlimento data={alimentoToEdit} onClose={closeModalEdit} />
                </Modal>
            )}
            <SectionMain header="Biblioteca de alimentos">
                <div className='w-[100%] flex justify-end py-[2rem]'>
                    <Button onClick={openModalAdd}>Añadir alimento</Button>
                </div>
                <Table columns={columns} dataSource={alimentos} pagination={{ pageSize: 7 }} />

            </SectionMain>
        </>);
}

export default Biblioteca