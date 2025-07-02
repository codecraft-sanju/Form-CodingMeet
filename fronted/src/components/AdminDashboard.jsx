import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function AdminDashboard() {
  const { users, fetchUsers } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Admin Dashboard – All Registered Users
        </h1>

        <div className="overflow-x-auto shadow rounded-lg">
          <table className="w-full border-collapse bg-white/10 backdrop-blur-md rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Skill</th>
                <th className="p-3 text-left">Courses</th>
                <th className="p-3 text-left">DOB</th>
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
                      className="w-10 h-10 rounded-full border"
                    />
                  </td>
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{user.skillLevel}</td>
                  <td className="p-3">{user.courses.join(", ")}</td>
                  <td className="p-3">{user.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-lg ${
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
