export default function UserTable({ currentUsers, handleDelete, handleInviteClick, loadingUserId, indexOfFirstUser }) {
    return (
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
    );
  }
  