import { CalendarDays, Clock, Link2 } from "lucide-react";

export default function MeetingCardsSection({ invitedUsers }) {
  if (!invitedUsers.length) return null;

  return (
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
  );
}
