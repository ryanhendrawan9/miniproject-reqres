import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
