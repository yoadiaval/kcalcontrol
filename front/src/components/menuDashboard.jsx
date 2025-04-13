import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ControlOutlined, UnorderedListOutlined, CalculatorOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';



function MenuDashboard() {
  const navigate = useNavigate();
  const items = [
    {
      key: 'inicio',
      label: 'Inicio',
      icon: <HomeOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'calculadora',
      label: 'Calculadora de Macros',
      icon: <CalculatorOutlined />,
    },
    {
      key: 'dietario',
      label: 'Dietario',
      icon: <ControlOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'alimentos',
      label: 'Biblioteca de alimentos',
      icon: <UnorderedListOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'configuracion',
      label: 'Configuración',
      icon: <SettingOutlined />,
    },
  ];

  const onClick = e => {
    if (e.key !== 'inicio') {
      navigate(`/dashboard/${e.key}`);
    } else {
      navigate('/')
    }


  }

  return (<Menu
    onClick={onClick}
    items={items}
    style={{ width: 256 }}
  />);

}
export default MenuDashboard;