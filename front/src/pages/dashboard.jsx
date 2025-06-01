
import Aside from "../components/aside";
import { Outlet } from 'react-router-dom';

function Dashboard() {

  return (
    <div className="flex gap-[30px] relative w-[100vw] overflow-x-hidden">
      <Aside />
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}
export default Dashboard;
