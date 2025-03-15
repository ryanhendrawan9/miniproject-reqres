import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="p-4 text-white bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-xl font-bold">
          SimpleUsers
        </Link>
        <div>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
