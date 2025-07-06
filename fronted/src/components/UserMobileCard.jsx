export default function UserMobileCard({ currentUsers, handleDelete, handleInviteClick, loadingUserId }) {
    return (
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
    );
  }
  