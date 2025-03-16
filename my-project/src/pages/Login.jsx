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

      {/* Features Section */}
      <section className="text-white bg-black border-t-8 border-gray-800">
        <div className="container px-4 py-20 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-8 md:w-1/2 md:mb-0">
              <h2 className="mb-4 text-4xl font-bold">Enjoy on your TV</h2>
              <p className="text-xl">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </p>
            </div>
            <div className="relative md:w-1/2">
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                className="relative z-10"
                alt="TV"
              />
              <div className="absolute top-[20%] left-[13%] w-[73%] h-[55%]">
                <video autoplay loop muted className="w-full h-full">
                  <source
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Feature */}
      <section className="text-white bg-black border-t-8 border-gray-800">
        <div className="container px-4 py-20 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row-reverse">
            <div className="mb-8 md:w-1/2 md:mb-0">
              <h2 className="mb-4 text-4xl font-bold">
                Download your shows to watch offline
              </h2>
              <p className="text-xl">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                alt="Mobile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Watch Everywhere Feature */}
      <section className="text-white bg-black border-t-8 border-gray-800">
        <div className="container px-4 py-20 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-8 md:w-1/2 md:mb-0">
              <h2 className="mb-4 text-4xl font-bold">Watch everywhere</h2>
              <p className="text-xl">
                Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                alt="Devices"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kids Feature */}
      <section className="text-white bg-black border-t-8 border-gray-800">
        <div className="container px-4 py-20 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row-reverse">
            <div className="mb-8 md:w-1/2 md:mb-0">
              <h2 className="mb-4 text-4xl font-bold">
                Create profiles for kids
              </h2>
              <p className="text-xl">
                Send kids on adventures with their favorite characters in a
                space made just for them—free with your membership.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://occ-0-1723-1722.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABfpnX3dbgjZ-Je8Ax3xn0kXehZm_5L6-xe6YSTq_ucht9TI5jwDMqusWZKNYT8DfGudD0_wWVVTFLiN2_kaQJumz2iivUWbIbAtF.png?r=11f"
                alt="Kids"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="text-white bg-black border-t-8 border-gray-800">
        <div className="container px-4 py-20 mx-auto">
          <h2 className="mb-8 text-4xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto mb-8 text-white bg-black">
            <div className="mb-2">
              <button className="w-full p-6 text-xl text-left transition bg-gray-800 hover:bg-gray-700">
                What is Netflix?
                <p className="float-right">+</p>
              </button>
            </div>
            <div className="mb-2">
              <button className="w-full p-6 text-xl text-left transition bg-gray-800 hover:bg-gray-700">
                How much does Netflix cost?
                <p className="float-right">+</p>
              </button>
            </div>
            <div className="mb-2">
              <button className="w-full p-6 text-xl text-left transition bg-gray-800 hover:bg-gray-700">
                Where can I watch?
                <p className="float-right">+</p>
              </button>
            </div>
            <div className="mb-2">
              <button className="w-full p-6 text-xl text-left transition bg-gray-800 hover:bg-gray-700">
                How do I cancel?
                <p className="float-right">+</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-white bg-black border-t-8 border-gray-800">
        <div className="container px-4 mx-auto">
          <p className="mb-8 text-gray-500">Questions? Call 1-844-505-2993</p>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Speed Test
                </a>
              </li>
            </ul>

            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Legal Notices
                </a>
              </li>
            </ul>

            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:underline">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ways to Watch
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Corporate Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Netflix Originals
                </a>
              </li>
            </ul>

            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:underline">
                  Media Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <select class="bg-transparent border px-4 py-1 rounded text-white mt-8">
            <option value="en">English</option>
            <option value="id">Indonesia</option>
          </select>

          <p class="text-gray-500 mt-8">Netflix Indonesia</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Login;
