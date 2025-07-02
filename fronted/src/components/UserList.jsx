import { useUserContext } from "../context/UserContext";

export default function UserList() {
  const { users } = useUserContext();

  return (
    <div className="w-full max-w-6xl space-y-6 z-10">
      <h2 className="text-3xl font-bold text-white text-center">Registered Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 gap-4 sm:gap-6 hover:scale-[1.01] transition-transform"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/${user.profilePicPath || "./profile.jpg"}`}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-purple-400 shadow-md"
            />
            <div className="flex flex-col justify-center min-w-0 text-white">
              <h3 className="text-base sm:text-lg font-semibold">{user.fullName}</h3>
              <p className="text-sm text-white/80 truncate max-w-[200px] sm:max-w-[300px]" title={user.email}>
                {user.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.courses.map((course) => (
                  <span
                    key={course}
                    className="text-xs bg-indigo-500/20 text-indigo-200 px-2 py-1 rounded-full border border-indigo-300/30"
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
