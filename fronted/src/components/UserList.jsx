import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users?id=6864ffcebcd1c8c504b36b95`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Axios error:", err));
  }, []);
  return (
    <div className="w-full max-w-6xl space-y-6">
      <h2 className="text-3xl font-bold text-white text-center">Registered Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-4 sm:p-6 gap-4 sm:gap-6 hover:scale-[1.01] transition-all"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/${user.profilePicPath}`}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
            <div className="flex flex-col justify-center min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-indigo-800">{user.fullName}</h3>
              <p
                className="text-sm text-gray-700 truncate max-w-[200px] sm:max-w-[300px]"
                title={user.email}
              >
                {user.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.courses.map((course) => (
                  <span
                    key={course}
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
