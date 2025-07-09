import { motion } from "framer-motion";
import { Lock, ShieldCheck, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function HackathonPage() {
  const { users, fetchUsers } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await fetchUsers();
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <div className="h-auto w-full px-4 py-10 flex flex-col items-center justify-center relative text-white z-10">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="absolute top-1 left-6 bg-white/10 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 text-sm backdrop-blur"
        whileHover={{ scale: 1.05 }}
      >
        ← Back
      </motion.button>

      {isLoading ? (
        <p className="text-xl font-semibold animate-pulse">Loading Premium Area...</p>
      ) : (
        <>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:mb-14 md:mb-4 mt-8 max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-indigo-300 drop-shadow-xl">
              Premium Learning Access
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              Unlock advanced content and coding challenges after
              <span className="text-yellow-400 font-bold"> 150+ learners</span> join.
            </p>
            <p className="mt-3 text-sm mb-5 text-white/60">
              Current Registered Learners:
              <span className="text-green-400 font-semibold ml-1">{users.length}</span>
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1  sm:grid-cols-2 gap-8 w-full max-w-6xl">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-purple-400/30 rounded-3xl p-8 shadow-2xl backdrop-blur-lg flex flex-col items-center text-center hover:shadow-purple-500/30"
            >
              <ShieldCheck size={48} className="text-purple-300 mb-4" />
              <h2 className="text-2xl font-semibold text-purple-200 mb-2">DSA Mastery Course</h2>
              <p className="text-sm text-white/80">
                Learn DSA through structured challenges and guided projects. Ideal for cracking interviews.
              </p>
              <p className="mt-4 text-red-400 font-medium text-sm flex items-center gap-1">
                <Lock size={16} /> Locked until 150+ registrations
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-yellow-400/30 rounded-3xl p-8 shadow-2xl backdrop-blur-lg flex flex-col items-center text-center hover:shadow-yellow-500/30"
            >
              <Trophy size={48} className="text-yellow-300 mb-4" />
              <h2 className="text-2xl font-semibold text-yellow-200 mb-2">Hackathon Challenge</h2>
              <p className="text-sm text-white/80">
                Compete, collaborate, and build under pressure. A real-world coding showdown — coming soon!
              </p>
              <p className="mt-4 text-red-400 font-medium text-sm flex items-center gap-1">
                <Lock size={16} /> Locked until 150+ registrations
              </p>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}