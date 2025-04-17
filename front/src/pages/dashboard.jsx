import useCentralContext from "../hooks/useCentralContext";
import useAuthContext from "../hooks/useAuthContex";
import { useEffect, useState } from "react";
import MenuDashboard from "../components/MenudashBoard";
import { Avatar, Skeleton, Spin, ConfigProvider } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const { logout } = useAuthContext();
  const { userData, getPersonalInfo } = useCentralContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPersonalInfo();
      if (result) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Spin tip="Loading" size="large">
         
      </Spin>;
    </div>

  }

  const exit = async () => {
    await logout();
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Alegreya Sans, sans-serif', // Cambiar la fuente aquí

          },
        }}
      >
        <div className="flex gap-[100px] p-[20px]">
          <aside className=" w-[15%] flex flex-col gap-[60px] fixed top-[20px] left-[20px] h-full  bg-white " >
            <div className="flex items-center px-3 py-2! border border-gray-200 justify-between rounded w-[250px]">
              <div className="flex items-center gap-3 ">
                <Avatar size={50} icon={<UserOutlined />} />
                <p>{userData.usuario.nombre}</p>
              </div>
              <DownOutlined />
            </div>
            <MenuDashboard></MenuDashboard>
          </aside>
          <main className="ml-[300px] w-[100%] ">
            <div className="sticky top-0 bg-white z-10 ">
              <h1>Dashboard</h1>
              <button onClick={exit}>Salir</button>
            </div>
            <Outlet />
          </main>
        </div>
      </ConfigProvider>
    </>
  );
}
export default Dashboard;
