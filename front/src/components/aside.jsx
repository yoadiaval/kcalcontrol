import { useState, useEffect } from 'react';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style';
import {
    ControlOutlined,
    UnorderedListOutlined,
    CalculatorOutlined,
    HomeOutlined,
    SettingOutlined,
    LineChartOutlined,
    LogoutOutlined,
    UserOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
} from '@ant-design/icons';
import useCentralContext from '../hooks/useCentralContext';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Aside() {

    /*CONTEXT*/

    const { userData, getPersonalInfo, isMobile, setIsMobile, simplificarAside, setSimplificarAside } = useCentralContext();
    const { logout } = useAuthContext();

    /*VARIABLES GLOBALES*/

    const navigate = useNavigate();


    const items = [
        { key: 'inicio', label: 'Inicio', icon: <HomeOutlined className='icono-aside' /> },
        { key: 'calculadora', label: 'Calculadora de Macros', icon: <CalculatorOutlined className='icono-aside' /> },
        { key: 'dietario', label: 'Dietario', icon: <ControlOutlined className='icono-aside' /> },
        { key: 'alimentos', label: 'Biblioteca de alimentos', icon: <UnorderedListOutlined className='icono-aside' /> },
        { key: 'evolucion', label: 'Evolución', icon: <LineChartOutlined className='icono-aside' /> },

    ];

    /*ESTADOS*/

    const [activo, setActivo] = useState('calculadora');
    const [loading, setLoading] = useState(true);

    /*ACTUALIZACIONES*/

    useEffect(() => {
        const fetchData = async () => {
            /*Resto de elementos que necesito cargar*/
            const resultPersonalInfo = await getPersonalInfo();

            if (resultPersonalInfo) {
                setLoading(false);
            }
        };
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true)
            }
            if (window.innerWidth > 768) {
                setIsMobile(false)
            }
            if (window.innerWidth <= 1024) {
                setSimplificarAside(true);

            }
            if (window.innerWidth > 1024) {
                setSimplificarAside(false);
            }

        };
        fetchData();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /*FUNCIONES*/
    const handleClick = (path) => {
        setActivo(path)
        navigate(path === 'inicio' ? '/' : `/dashboard/${path}`);
    };

    const handleAside = () => setSimplificarAside(!simplificarAside);

    const exit = async () => {
        await logout();
    };

    return (
        < div className={`${isMobile ? 'fixed bottom-[-20px] left-[50%] translate-[-50%] rounded-full z-50' : ''} `}>
            {isMobile
                ? (<aside className=' w-[85vw] rounded-full bg-[#1E1E2F] px-2'>
                    <ul className={`flex gap-4 justify-around py-[1.5rem] `}>
                        {items.map((item) => (
                            <li
                                key={item.key}
                                onClick={() => handleClick(item.key)}
                                className={`groupflex items-center gap-2 text-sm  ${activo === item.key ? 'text-[#00CFFF]' : 'text-white'}`}
                            >
                                {React.cloneElement(item.icon, {
                                    className: ' transition-colors duration-200 text-[20px] group-hover:text-[#00CFFF] ',
                                })}

                            </li>
                        ))}
                    </ul>
                </aside>)
                : (<aside className={`${simplificarAside ? 'w-fit' : 'w-[280px]'} sticky flex flex-col gap-16 top-0 left-0 h-[100dvh]  p-4 bg-[#1E1E2F] text-white shadow `}>

                    <div className="cursor-pointer absolute right-[-25px] top-0 bg-gray-100 p-1 text-black" onClick={handleAside}>
                        {simplificarAside ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
                    </div>
                    {/* Header */}
                    <div className="flex items-center justify-between relative">
                        <div className={`flex items-center ${simplificarAside ? 'flex-col gap-1' : 'gap-2'}`}>
                            <Avatar icon={<UserOutlined />} />
                            {!simplificarAside && (
                                <span className="whitespace-nowrap text-sm font-medium">
                                    Hola {loading ? 'Cargando...' : userData?.usuario?.nombre}
                                </span>
                            )}
                        </div>

                    </div>

                    {/* Menu */}
                    <div className="flex-1 flex flex-col justify-between">
                        <ul className={`flex flex-col gap-[1.3rem] ${simplificarAside ? 'items-center' : ''}`}>
                            {items.map((item) => (
                                <li
                                    key={item.key}
                                    onClick={() => handleClick(item.key)}
                                    className={`group flex items-center gap-2 text-sm cursor-pointer p-2 rounded hover:bg-[#00d0ff71] transition-colors duration-200  ${activo === item.key ? 'text-[#00CFFF]' : 'text-white'}`}
                                >
                                    {React.cloneElement(item.icon, {
                                        className: ' transition-colors duration-200 text-[20px] group-hover:text-[#00CFFF] ',
                                    })}
                                    {!simplificarAside && item.label}
                                </li>
                            ))}
                        </ul>

                        {/* Logout */}
                        <div
                            onClick={exit}
                            className={`text-[20px] flex items-center gap-2 text-sm cursor-pointer hover:text-[#ff8080] transition-colors duration-200 ${simplificarAside ? 'justify-center' : ''} `}
                        >
                            <LogoutOutlined className='group-hover:text-[#ff8080] text-[20px]' />
                            {!simplificarAside && <div className='text-[14px]'>Salir</div>}
                        </div>
                    </div>
                </aside>
                )
            }
        </div>
    )
}

export default Aside;
