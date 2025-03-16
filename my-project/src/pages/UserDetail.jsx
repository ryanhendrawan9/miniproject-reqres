import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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

  // Generate a unique pattern for user based on ID
  const generatePatternColor = (userId) => {
    const colors = [
      "from-purple-600 to-blue-500",
      "from-blue-600 to-cyan-500",
      "from-emerald-600 to-green-500",
      "from-rose-600 to-pink-500",
      "from-amber-600 to-yellow-500",
      "from-indigo-600 to-violet-500",
    ];

    return colors[userId % colors.length];
  };

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-5 text-white bg-black pb-"
      >
        <div className="max-w-4xl px-4 mx-auto">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/"
              className="flex items-center mb-8 text-blue-400 transition-colors hover:text-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
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
          </motion.div>

          {loading ? (
            <motion.div
              className="flex items-center justify-center h-64"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-16 h-16 border-t-4 border-b-4 border-blue-400 rounded-full"></div>
            </motion.div>
          ) : user ? (
            <motion.div
              className="overflow-hidden bg-gray-900 shadow-xl rounded-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Header Banner with dynamic pattern cover */}
              <motion.div
                className={`h-48 relative bg-gradient-to-r ${generatePatternColor(
                  user.id
                )}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Abstract pattern overlay */}
                <div className="absolute inset-0 opacity-30">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 10 0 L 0 0 0 10"
                          fill="none"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="0.5"
                        />
                      </pattern>
                      <pattern
                        id="circles"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="2"
                          fill="none"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="0.5"
                        />
                      </pattern>
                      <pattern
                        id="dots"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="1"
                          fill="rgba(255,255,255,0.3)"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <rect width="100%" height="100%" fill="url(#circles)" />
                    <rect width="100%" height="100%" fill="url(#dots)" />
                  </svg>
                </div>

                {/* Dynamic decorative elements */}
                <motion.div
                  className="absolute right-8 bottom-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>

                {/* User initials as watermark */}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 opacity-10">
                  <p className="font-bold text-white text-8xl">
                    {user.first_name?.[0]}
                    {user.last_name?.[0]}
                  </p>
                </div>
              </motion.div>

              <div className="px-8 pb-8">
                <div className="relative flex flex-col md:flex-row">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="relative mb-4 -mt-16 md:-mt-20 md:mb-0 md:mr-8"
                  >
                    <div className="w-32 h-32 overflow-hidden border-4 border-gray-900 rounded-full shadow-lg md:w-40 md:h-40">
                      <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/20"
                      animate={{
                        boxShadow: [
                          "0 0 0 0px rgba(59, 130, 246, 0.5)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        repeatType: "loop",
                      }}
                    ></motion.div>
                  </motion.div>

                  {/* User Info */}
                  <motion.div
                    className="pt-4 md:pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.h1
                      className="mb-1 text-3xl font-bold md:text-4xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {user.first_name} {user.last_name}
                    </motion.h1>
                    <motion.p
                      className="mb-6 text-blue-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {user.email}
                    </motion.p>

                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.div
                        className="p-6 mt-4 bg-gray-800 bg-opacity-50 rounded-lg shadow-inner backdrop-blur-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <h2 className="mb-4 text-xl font-bold text-blue-300">
                          User Details
                        </h2>
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <p className="w-24 font-medium text-gray-400">
                              ID:
                            </p>
                            <p>{user.id}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <p className="w-24 font-medium text-gray-400">
                              Full Name:
                            </p>
                            <p>
                              {user.first_name} {user.last_name}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <p className="w-24 font-medium text-gray-400">
                              Email:
                            </p>
                            <p>{user.email}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <motion.button
                          className={`px-6 py-2 rounded-full font-medium transition-colors bg-gradient-to-r ${generatePatternColor(
                            user.id
                          )}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Connect
                        </motion.button>
                        <motion.button
                          className="px-6 py-2 font-medium transition-colors bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Message
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="p-8 text-center bg-gray-900 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xl text-gray-300">User not found</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default UserDetail;
