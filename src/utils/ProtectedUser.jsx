import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedUser = () => {
  const { userInfo } = useSelector((state) => state.user);
  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

export default ProtectedUser;