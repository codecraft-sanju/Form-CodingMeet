import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { users, fetchUsers } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
      toast.success("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete user.");
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-400">
          Admin Dashboard
        </h1>

        {/* Table View for Desktop */}
        <div className="w-full overflow-x-auto hidden sm:block rounded-lg shadow">
          <table className="min-w-[900px] w-full border-collapse bg-white/10 backdrop-blur-md rounded-lg text-sm sm:text-base">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Skill</th>
                <th className="p-3 text-left">Learning</th>
                <th className="p-3 text-left">Courses</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, i) => (
                <tr key={user._id} className="hover:bg-white/5 transition">
                  <td className="p-3">{indexOfFirstUser + i + 1}</td>
                  <td className="p-3">
                    <img
                      src={user.profilePicPath}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border object-cover"
                    />
                  </td>
                  <td className="p-3 break-words">{user.fullName}</td>
                  <td className="p-3 break-words">{user.email}</td>
                  <td className="p-3 break-words">{user.mobile}</td>
                  <td className="p-3 break-words">{user.skillLevel}</td>
                  <td className="p-3 break-words">{user.learningPath || "—"}</td>
                  <td className="p-3 break-words">{user.courses?.join(", ") || "—"}</td>
                  <td className="p-3 break-words">{user.dob}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user._id, user.fullName)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View for Mobile */}
        <div className="space-y-4 sm:hidden">
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow text-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={user.profilePicPath}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border object-cover"
                />
                <div>
                  <p className="font-bold">{user.fullName}</p>
                  <p className="text-gray-300 text-xs">{user.email}</p>
                </div>
              </div>
              <p><span className="font-semibold">Mobile:</span> {user.mobile}</p>
              <p><span className="font-semibold">Skill:</span> {user.skillLevel}</p>
              <p><span className="font-semibold">Learning:</span> {user.learningPath || "—"}</p>
              <p><span className="font-semibold">Courses:</span> {user.courses?.join(", ") || "—"}</p>
              <p><span className="font-semibold">DOB:</span> {user.dob}</p>
              <button
                onClick={() => handleDelete(user._id, user.fullName)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-wrap justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 text-white hover:bg-indigo-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
