import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import InviteModal from "../components/InviteModal";
import MeetingCardsSection from "../components/MeetingCardsSection";
import UserTable from "../components/UserTable";
import UserMobileCard from "../components/UserMobileCard";
import Pagination from "../components/Pagination";

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

  const invitedUsers = users.filter((user) => {
    if (!user.invitation?.invited || !user.invitation.date) return false;

    const meetingDate = new Date(user.invitation.date);
    const today = new Date();
    meetingDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return meetingDate >= today;
  });

  if (!users.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-semibold">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-indigo-400 uppercase tracking-wider">
          Admin Dashboard
        </h1>

        <MeetingCardsSection invitedUsers={invitedUsers} />

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

        <UserTable
          currentUsers={currentUsers}
          handleDelete={handleDelete}
          handleInviteClick={handleInviteClick}
          loadingUserId={loadingUserId}
          indexOfFirstUser={indexOfFirstUser}
        />

        <UserMobileCard
          currentUsers={currentUsers}
          handleDelete={handleDelete}
          handleInviteClick={handleInviteClick}
          loadingUserId={loadingUserId}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {selectedUser && (
        <InviteModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
