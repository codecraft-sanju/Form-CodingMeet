import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function InviteModal({ user, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!date || !time || !meetLink) return toast.error("Fill all fields");

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/send-invite`, {
        to: user.email,
        name: user.fullName,
        date,
        time,
        meetLink,
      });
      toast.success("Invite sent!");
      onClose();
    } catch (err) {
      console.error("Invite send error:", err);
      toast.error("Failed to send invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#1f2937] text-white w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-5 text-indigo-400 text-center">
          Send Invite to {user.fullName}
        </h2>

        <label className="block mb-2 text-sm text-gray-300">Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block mb-2 text-sm text-gray-300">Select Time</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Time</option>
          {Array.from({ length: 12 }, (_, h) => h + 1).flatMap((hour) =>
            ["00", "15", "30", "45"].flatMap((min) =>
              ["AM", "PM"].map((period) => {
                const hh = hour.toString().padStart(2, "0");
                const formattedTime = `${hh}:${min} ${period}`;
                return (
                  <option key={formattedTime} value={formattedTime}>
                    {formattedTime}
                  </option>
                );
              })
            )
          )}
        </select>

        <label className="block mb-2 text-sm text-gray-300">Google Meet Link</label>
        <input
          type="text"
          placeholder="https://meet.google.com/..."
          value={meetLink}
          onChange={(e) => setMeetLink(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
