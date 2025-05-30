import { Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import useCentralContext from "./hooks/useCentralContext";


function PrivateRoute() {
  const { currentUser, loadingUser } = useCentralContext();


  if (loadingUser) {
    return <div className="h-[100vh] w-[full] flex justify-center items-center"><Spin size="large" /></div>;
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default PrivateRoute;
