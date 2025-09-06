import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Rocket, Target, User2Icon } from "lucide-react";
import CountUp from "react-countup";
import { useUserData } from "../context/FormContext";

const titles = [
  "Web Development",
  "UI/UX Design",
  "React Native",
  "Blockchain",
  "AI/ML",
  "DSA & Java",
];

const FormHeader = () => {
  const [index, setIndex] = useState(0);
  const { users, loading } = useUserData(); // backend se users aa rahe hain

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles?.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl text-center text-white space-y-4 mb-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 min-h-[3rem]">
        Learn
        <AnimatePresence mode="wait">
          <motion.span
            key={titles[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="inline-block ml-2 text-purple-400"
          >
            {titles[index]}
          </motion.span>
        </AnimatePresence>
      </h1>
      <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
        Build real-world skills in HTML, CSS, JavaScript, and React. Perfect for
        beginners — 100% free courses, projects & community support.
      </p>

      <div className="bg-[#1e1f25] border border-gray-700 rounded-xl p-4 flex flex-col gap-4 shadow-md">
        <div className="text-yellow-400 gap-2 text-base sm:text-lg font-semibold text-center flex justify-center items-center flex-wrap">
          <User2Icon className="text-purple-500 w-5 h-5" />
          {loading ? (
            <span className="text-gray-400 text-lg">Loading...</span>
          ) : (
            <>
              <CountUp
                className="text-2xl"
                start={0}
                end={users?.length || 0}
                duration={2}
              />{" "}
              learners already joined{" "}
              <span className="text-pink-400">CodingMeet</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Rocket className="text-green-500 w-4 h-4" />
            <span>Hackathon launching soon</span>
          </div>
          <div className="hidden sm:block">|</div>
          <div className="flex items-center gap-2">
            <Target className="text-blue-500 w-4 h-4" />
            <span>Free Internship after</span>
          </div>
          <div className="hidden sm:block">|</div>
          <div className="text-yellow-500 font-semibold">
            100+ registrations
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
