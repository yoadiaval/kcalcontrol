import useCentralContext from "../hooks/useCentralContext";
import Aside from "../components/aside";
import { useEffect, useState } from "react";
import { Spin } from 'antd';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const { getPersonalInfo, getAlimentos, getRegistros } = useCentralContext();


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      /*Resto de elementos que necesito cargar*/
      const resultPersonalInfo = await getPersonalInfo();
      const resultAlimentos = await getAlimentos();
      const resultRegistros = await getRegistros();

      if (resultPersonalInfo || resultAlimentos || resultRegistros) {
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

  return (
    <div className="flex gap-[30px] relative w-[100vw] overflow-x-hidden">
      <Aside></Aside>
      <main className="flex-1 p-[10px]">
        <Outlet />
      </main>
    </div>
  );
}
export default Dashboard;
