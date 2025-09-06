import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/FormContext"; // backend context
import FormHeader from "./FormHeader";
import ProgressBar from "./ProgressBar";
import InputField from "./InputField";
import SelectField from "./SelectField";
import CourseSelector from "./CourseSelector";
import FileUpload from "./FileUpload";
import SubmitButton from "./SubmitButton";
import group from "../assets/Group 1.png";
import { BookOpen, CheckCircle, Code2Icon, Crown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Form = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    path: "",
    skill: "",
    file: null,
  });
  const [showInstructions, setShowInstructions] = useState(false);
  const navigate = useNavigate();

  const { registerUser, btnLoading } = useUserData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    calculateProgress(updated);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const updated = { ...formData, file: e.target.files[0] };
      setFileName(e.target.files[0].name);
      setFormData(updated);
      calculateProgress(updated);
    }
  };

  const toggleCourse = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const calculateProgress = (data) => {
    let filled = 0;
    if (data.name) filled++;
    if (data.email) filled++;
    if (data.mobile) filled++;
    if (data.dob) filled++;
    if (data.path) filled++;
    if (data.skill) filled++;
    if (data.file) filled++;
    setProgress((filled * 100) / 7);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.path ||
      !formData.skill
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("fullName", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("dob", formData.dob);
    data.append("learningPath", formData.path);
    data.append("skillLevel", formData.skill);
    data.append("profilePic", formData.file);
    data.append("courses", JSON.stringify(selectedCourses));

    await registerUser(data);

    setFormData({
      name: "",
      email: "",
      mobile: "",
      dob: "",
      path: "",
      skill: "",
      file: null,
    });
    setSelectedCourses([]);
    setFileName("No file chosen");
    setProgress(0);
    navigate("/"); // optional
  };

  const token = localStorage.getItem("admintoken");
  const accessKey = import.meta.env.VITE_ADMIN_TOKEN;

  return (
    <div className="min-h-screen bg-[#121316] flex flex-col items-center justify-center px-4 py-10 sm:px-6 md:px-8 space-y-10">
      <FormHeader />

      <div className="w-full p-2 flex flex-col sm:flex-row justify-center md:justify-end gap-3 px-4 mt-4 md:mt-0 md:fixed md:top-4 md:right-4 z-50 lg:justify-end">
        <div className="flex gap-3 flex-col">
          <button
            onClick={() => setShowInstructions(true)}
            className="text-sm sm:text-base bg-[#2a2b2f] hover:bg-[#383a3f] text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            View Instructions
          </button>
          <Link
            to={"/premium"}
            className="text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-4 py-2 rounded-lg font-semibold transition shadow-md flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
          >
            <Crown className="w-5 h-5" />
            Premium Access
          </Link>
          <Link
            to={"/admin"}
            className={`text-sm sm:text-base bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black px-4 py-2 rounded-lg font-semibold transition shadow-md flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer ${
              token === accessKey ? "" : "hidden"
            }`}
          >
            Admin Panel
          </Link>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-[#1D1E21] rounded-xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        <div className="bg-black flex items-center justify-between w-full p-4 rounded-xl">
          <h2 className="text-xl sm:text-2xl font-semibold">Welcome!</h2>
          <img src={group} className="h-14 w-14 object-contain" alt="Logo" />
        </div>
        <ProgressBar progress={progress} />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <InputField
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Full Name"
            type="text"
            placeholder="Enter your name"
          />
          <InputField
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email Address"
            type="email"
            placeholder="Enter your email"
          />
          <InputField
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            label="Mobile Number"
            type="tel"
            placeholder="Enter your mobile"
            maxLength={10}
          />
          <InputField
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            label="Date of Birth"
            type="date"
          />
          <SelectField
            name="path"
            value={formData.path}
            onChange={handleChange}
            label="Preferred Path"
            options={["Web Development", "DSA", "App Development", "Machine Learning"]}
          />
          <SelectField
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            label="Skill Level"
            options={["Beginner", "Intermediate", "Advanced"]}
          />
          <CourseSelector
            selectedCourses={selectedCourses}
            toggleCourse={toggleCourse}
          />
          <FileUpload fileName={fileName} handleFileChange={handleFileChange} />
          <SubmitButton loading={btnLoading} />
        </form>
      </div>

      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1d1e21] text-white p-6 rounded-xl w-full max-w-2xl shadow-xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute top-3 right-3 text-white hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-6 flex gap-3">
                <Code2Icon className="text-[#c165ff] text-bold text-2xl" />
                CodingMeet Class Instructions
              </h2>
              <div className="space-y-4 text-sm sm:text-base">
                {[
                  "Each student will receive a personal one-on-one class — no group sessions.",
                  "Ensure a strong internet connection to avoid disruptions.",
                  "Classes begin once 50+ students are registered — spread the word!",
                  "Share CodingMeet in your groups or with friends to help us grow.",
                  "Watch for class updates via Email or WhatsApp.",
                  "All classes are 100% free and include hands-on projects & mentorship.",
                ].map((inst, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 w-5 h-5" />
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Form;
