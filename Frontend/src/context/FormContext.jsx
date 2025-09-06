import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const API_URL = "http://localhost:5000/api"; // backend base URL

  // register new user
  const registerUser = async (userData) => {
    setBtnLoading(true);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`${API_URL}/register`, userData, config);
      toast.success("User registered successfully!");
      getAllUsers();
      return data.user;
    } catch (error) {
      console.error("Register user error:", error);
      toast.error(error.response?.data?.error || "Registration failed.");
    } finally {
      setBtnLoading(false);
    }
  };

  // get all users
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/users`);
      setUsers(data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Could not load users.");
    } finally {
      setLoading(false);
    }
  };

  // delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      toast.success("User deleted successfully!");
      getAllUsers();
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  // send personal invite
  const sendInvite = async (inviteData) => {
    try {
      const { data } = await axios.post(`${API_URL}/send-invite`, inviteData);
      toast.success(data.message || "Invite sent!");
    } catch (error) {
      console.error("Send invite error:", error);
      toast.error(error.response?.data?.message || "Failed to send invite.");
    }
  };

  // send announcement email
  const sendAnnouncement = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/send-announcement`);
      toast.success(data.message || "Announcement sent!");
    } catch (error) {
      console.error("Announcement error:", error);
      toast.error("Failed to send announcement.");
    }
  };

  // send class announcement email
  const sendClassAnnouncement = async (classData) => {
    try {
      const { data } = await axios.post(`${API_URL}/send-class-announcement`, classData);
      toast.success(data.message || "Class details sent!");
    } catch (error) {
      console.error("Class announcement error:", error);
      toast.error("Failed to send class details.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        btnLoading,
        registerUser,
        getAllUsers,
        deleteUser,
        sendInvite,
        sendAnnouncement,
        sendClassAnnouncement,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
