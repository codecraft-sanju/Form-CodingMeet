import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaImage,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function UserInputFields({ formData, handleChange, inputClass }) {
  const [selectedPath, setSelectedPath] = useState(null);

  const learningOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Data Analysis", label: "Data Analysis" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "UI/UX Design", label: "UI/UX Design" },
  ];

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "rgba(255,255,255,0.05)", // bg-white/10
      borderColor: "rgba(255,255,255,0.3)",       // border-white/30
      borderRadius: "0.75rem",                   // rounded-xl
      paddingTop: "1.5rem",
      paddingBottom: "0.5rem",
      paddingLeft: "2.5rem",                     // icon space
      color: "#fff",
      fontSize: "1rem",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(129, 140, 248, 0.5)" : "none",
      outline: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e1e2f",
      color: "white",
      zIndex: 20,
      borderRadius: "0.5rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255,255,255,0.6)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#4f46e5" : "#1e1e2f",
      color: "white",
      padding: 10,
      cursor: "pointer",
    }),
  };

  useEffect(() => {
    if (formData.learningPath) {
      const found = learningOptions.find((opt) => opt.value === formData.learningPath);
      if (found) setSelectedPath(found);
    }
  }, [formData.learningPath]);

  return (
    <>
      {[{ name: "fullName", label: "Full Name", type: "text", icon: <FaUser /> },
        { name: "email", label: "Email Address", type: "email", icon: <FaEnvelope /> },
        { name: "mobile", label: "Mobile Number", type: "text", icon: <FaPhone /> },
        { name: "dob", label: "Date of Birth", type: "date", icon: <FaGraduationCap /> },
      ].map(({ name, label, type, icon }) => (
        <div key={name} className="relative w-full">
          <span className="absolute left-3 top-5 text-white/60">{icon}</span>
          <input
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required
            placeholder=" "
            className={inputClass}
          />
          <label className="absolute left-10 top-2 text-sm text-white font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/80 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-300">
            {label}
          </label>
        </div>
      ))}

      {/* Custom Styled Dropdown with Matching Input UI */}
      <div className="relative w-full z-20">
        <span className="absolute left-3 top-5 text-white/60">
          <FaGraduationCap />
        </span>
        <label className="absolute left-10 top-2 text-sm text-white font-medium z-10">
          Preferred Learning Path
        </label>
        <Select
          options={learningOptions}
          styles={selectStyles}
          placeholder="Select Your Learning Path"
          value={selectedPath}
          onChange={(selected) => {
            setSelectedPath(selected);
            handleChange({
              target: { name: "learningPath", value: selected.value },
            });
          }}
        />
      </div>

      {/* Skill Level */}
      <div className="w-full">
        <label className="block mb-2 text-sm text-white font-medium">Your Current Skill Level</label>
        <div className="flex flex-wrap gap-4">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <label
              key={level}
              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-all ${
                formData.skillLevel === level
                  ? "bg-indigo-600 text-white border-indigo-500"
                  : "text-white/70 border-white/30 hover:border-white/50"
              }`}
            >
              <input
                type="radio"
                name="skillLevel"
                value={level}
                checked={formData.skillLevel === level}
                onChange={handleChange}
                className="hidden"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* Courses Checkboxes */}
      <div className="col-span-1 md:col-span-2">
        <label className="block mb-2 text-sm text-white font-medium">Select Courses You're Interested In</label>
        <div className="flex flex-wrap gap-4">
          {["HTML", "CSS", "JavaScript", "React", "MERN Stack", "Full Stack Development"].map((course) => (
            <label
              key={course}
              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border transition ${
                formData.courses.includes(course)
                  ? "bg-purple-600 text-white border-purple-500"
                  : "text-white/70 border-white/30 hover:border-white/50"
              }`}
            >
              <input
                type="checkbox"
                name="courses"
                value={course}
                onChange={handleChange}
                checked={formData.courses.includes(course)}
                className="hidden"
              />
              {course}
            </label>
          ))}
        </div>
      </div>

      {/* Profile Picture Upload */}
      <div className="col-span-1 md:col-span-2">
        <label className="block mb-2 text-sm text-white font-medium flex items-center gap-2">
          <FaImage />
          Upload Profile Picture
        </label>
        <input
          name="profilePic"
          type="file"
          accept="image/*"
          required
          onChange={handleChange}
          className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/10 text-white file:text-white file:bg-purple-600 file:border-none file:px-4 file:py-1 file:rounded-md"
        />
        {formData.profilePic && (
          <img
            src={URL.createObjectURL(formData.profilePic)}
            alt="Preview"
            className="mt-3 w-20 h-20 object-cover rounded-full border shadow-md"
          />
        )}
      </div>
    </>
  );
}
