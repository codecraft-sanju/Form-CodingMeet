import React, { useState } from "react";
import { Link } from "react-router-dom";
import { House } from "lucide-react";
import OnlyAdminAccess from "./OnlyAdminAccess";
import { useUserData } from "../context/FormContext";

const Admin = () => {
  const { users, loading } = useUserData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const usersPerPage = 10;

  const filteredUsers = users.filter((user) =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const token = localStorage.getItem("admintoken");
  const accessKey = import.meta.env.VITE_ADMIN_TOKEN;

  return (
    <>
      {token === accessKey ? (
        <div className="p-6 bg-[#121316] min-h-screen text-white">
          <div className="max-w-7xl mx-auto bg-[#1D1E21] p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <Link
                to={"/"}
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-4 py-2 rounded-md flex gap-2"
              >
                <House /> Home
              </Link>
            </div>

            <div className="flex items-center mb-4 gap-4">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full bg-[#2a2b2f] text-white border border-gray-600 px-4 py-2 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto rounded-md border border-gray-700">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#2a2b2f] text-gray-300 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Profile</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">DOB</th>
                    <th className="px-4 py-3">Path</th>
                    <th className="px-4 py-3">Skill</th>
                    <th className="px-4 py-3">Courses</th>
                  </tr>
                </thead>
                <tbody className="bg-[#1D1E21]">
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-8">
                        Loading...
                      </td>
                    </tr>
                  ) : currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-8">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr
                        key={user._id || index}
                        className="border-t border-gray-700 hover:bg-[#2a2b2f]"
                      >
                        <td className="px-4 py-3">
                          {(currentPage - 1) * usersPerPage + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <img
                            src={
                              user.profilePicPath ||
                              "https://via.placeholder.com/40"
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-3">{user.fullName}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.mobile}</td>
                        <td className="px-4 py-3">
                          {user.dob
                            ? new Date(user.dob).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-4 py-3">{user.learningPath}</td>
                        <td className="px-4 py-3">{user.skillLevel}</td>
                        <td className="px-4 py-3">
                          {Array.isArray(user.courses)
                            ? user.courses.join(", ")
                            : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 text-gray-300">
              <span className="text-sm">
                Showing {(currentPage - 1) * usersPerPage + 1}-
                {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-600 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-600 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <OnlyAdminAccess />
        </div>
      )}
    </>
  );
};

export default Admin;
