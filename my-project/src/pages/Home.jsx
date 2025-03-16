import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "../css/Home.css";
import Footer from "../components/Footer";

const Home = () => {
  const { isAuthenticated, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://reqres.in/api/users?page=${currentPage}`
        );
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
        setFilteredUsers(data.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [currentPage, isAuthenticated]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen bg-black">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      {/* stars */}
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen px-4 text-white bg-black"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="mb-6 text-3xl font-bold text-center">Who's watching?</h1>

        <div className="relative w-full max-w-lg mb-6">
          <input
            type="search"
            className="block w-full p-4 pl-10 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-black rounded-md text-white shadow-blue-500 border-2 border-blue-400 transition-all shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#33CCCC,0_0_15px_#33CCCC,0_0_30px_#33CCCC]"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <div className="py-8 text-center text-white">
                No users found matching your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}

            {!searchTerm && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </motion.div>
      <Footer />
    </Layout>
  );
};

export default Home;
