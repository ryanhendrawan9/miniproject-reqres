import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

const UserDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [id, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className=" mb-6 text-blue-500 hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Users
        </Link>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : user ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {user.first_name} {user.last_name}
                </h1>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h2 className="font-bold text-lg mb-2">User Details</h2>
                  <p>
                    <span className="font-medium">ID:</span> {user.id}
                  </p>
                  <p>
                    <span className="font-medium">Full Name:</span>{" "}
                    {user.first_name} {user.last_name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-700">User not found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDetail;
