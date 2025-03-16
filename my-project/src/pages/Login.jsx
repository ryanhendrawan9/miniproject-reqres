import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import netflix_spinner from "../assets/netflix_spinner.gif";
import Logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  setTimeout(() => setLoading(false), 1000);

  return loading ? (
    <div className="flex items-center justify-center h-screen bg-black">
      <img src={netflix_spinner} alt="Loading..." className="w-16 h-16" />
    </div>
  ) : (
    <Layout>
      <div className="h-screen bg-[linear-gradient(#0000007e,#0000007e),url('/background_banner.jpg')] bg-cover flex flex-col px-8">
        <img src={Logo} alt="logo" className="w-40 mx-auto mt-20 " />
        <div className="flex items-center justify-center flex-grow">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md p-8 bg-black bg-opacity-75 rounded-md"
          >
            <h1 className="mb-6 text-3xl font-bold text-center text-white">
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-5 mb-4 text-white bg-gray-800 rounded-md focus:outline-none"
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-5 text-white bg-gray-800 rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 mt-4 font-medium text-white transition-all bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-4 text-gray-400">
              <p className="font-medium">Demo credentials:</p>
            </p>
            <p className="text-sm text-gray-300">Email: eve.holt@reqres.in</p>
            <p className="mb-4 text-sm text-gray-300">Password: cityslicka</p>
            <div className="mt-6 text-sm text-center text-gray-400">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-white hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
