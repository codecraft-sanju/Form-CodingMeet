import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import InviteModal from "./InviteModal";
import { CalendarDays, Clock, Link2 } from "lucide-react";

export default function AdminDashboard() {
  const { users, fetchUsers } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [sendingAnnouncement, setSendingAnnouncement] = useState(false);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    setLoadingUserId(userId);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
      toast.success("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete user.");
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleInviteClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendAnnouncement = async () => {
    const confirm = window.confirm("Are you sure you want to send hackathon announcement emails to all users?");
    if (!confirm) return;

    setSendingAnnouncement(true);
    try {
      toast.info("Sending emails...");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/send-announcement`);
      toast.success("Hackathon announcement sent to all users.");
    } catch (err) {
      console.error("Send announcement error:", err);
      toast.error("Failed to send announcement emails.");
    } finally {
      setSendingAnnouncement(false);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const invitedUsers = users.filter((user) => user.invitation?.invited);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-indigo-400 uppercase tracking-wider">
          Admin Dashboard
        </h1>

        {/* Meeting Cards Section */}
        {invitedUsers.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4 border-b border-indigo-500 pb-2">
              Your Scheduled Meetings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitedUsers.map((user) => (
                <div key={user._id} className="bg-white/10 backdrop-blur-md text-white p-5 rounded-xl shadow-lg flex flex-col gap-3 border border-gray-700">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.profilePicPath}
                      alt={user.fullName}
                      className="w-14 h-14 rounded-full border border-white object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">{user.fullName}</p>
                      <p className="text-sm text-indigo-200">{user.email}</p>
                    </div>
                  </div>
                  <p className="flex items-center gap-2"><CalendarDays size={18} className="text-indigo-300" /><span className="font-semibold">Date:</span> {user.invitation.date}</p>
                  <p className="flex items-center gap-2"><Clock size={18} className="text-indigo-300" /><span className="font-semibold">Time:</span> {user.invitation.time}</p>
                  <a
                    href={user.invitation.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium text-center"
                  >
                    <Link2 size={16} /> Join Meeting
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Announcement Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSendAnnouncement}
            disabled={sendingAnnouncement}
            className={`${
              sendingAnnouncement ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            } text-white px-6 py-2 rounded-lg shadow-lg font-semibold transition`}
          >
            {sendingAnnouncement ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </div>
            ) : (
              <>Send Hackathon Announcement</>
            )}
          </button>
        </div>

        {/* Table View */}
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
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{user.skillLevel}</td>
                  <td className="p-3">{user.learningPath || "—"}</td>
                  <td className="p-3">{user.courses?.join(", ") || "—"}</td>
                  <td className="p-3">{user.dob}</td>
                  <td className="p-3 flex flex-col gap-2">
                    <button
                      onClick={() => handleDelete(user._id, user.fullName)}
                      className={`${
                        loadingUserId === user._id
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white px-3 py-1 rounded text-xs flex items-center justify-center gap-1`}
                      disabled={loadingUserId === user._id}
                    >
                      {loadingUserId === user._id ? (
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                    <button
                      onClick={() => handleInviteClick(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Invite
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="space-y-4 sm:hidden">
          {currentUsers.map((user) => (
            <div key={user._id} className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow text-sm">
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
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleDelete(user._id, user.fullName)}
                  className={`${
                    loadingUserId === user._id
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white px-3 py-1 rounded text-xs flex items-center justify-center gap-1`}
                  disabled={loadingUserId === user._id}
                >
                  {loadingUserId === user._id ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  onClick={() => handleInviteClick(user)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  Invite
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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

      {/* Invite Modal */}
      {selectedUser && (
        <InviteModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
