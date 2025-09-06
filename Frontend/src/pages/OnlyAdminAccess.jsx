import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OnlyAdminAccess = () => {
  return (
    <div className="min-h-screen bg-[#121316] text-white flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-500">
        Access Denied
      </h1>
      <p className="mb-6 text-gray-300">
        This page is restricted to Admins only. You do not have permission to
        access it.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
      >
        <ArrowLeft size={18} />
        Go back to Home
      </Link>
    </div>
  );
};

export default OnlyAdminAccess;
