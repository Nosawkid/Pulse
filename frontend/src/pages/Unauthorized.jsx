import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-green-100 text-gray-800 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <ShieldAlert className="w-20 h-20 text-red-500 drop-shadow-lg" />
        </div>

        <h1 className="text-6xl font-extrabold text-red-600 mb-2">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          You don’t have permission to view this page. Please contact an
          administrator if you think this is a mistake.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-5 py-2 rounded-lg shadow-sm transition duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            Go Home
          </button>
        </div>
      </motion.div>

      <p className="absolute bottom-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Pulse. All rights reserved.
      </p>
    </div>
  );
};

export default Unauthorized;
