import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaGraduationCap,
    FaImage,
  } from "react-icons/fa";
  import { FiChevronDown } from "react-icons/fi";
  
  export default function UserInputFields({ formData, handleChange, inputClass }) {
    return (
      <>
        {[{ name: "fullName", label: "Full Name", type: "text", icon: <FaUser /> },
          { name: "email", label: "Email", type: "email", icon: <FaEnvelope /> },
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
  
        <div className="relative w-full">
          <select
            name="learningPath"
            value={formData.learningPath}
            onChange={handleChange}
            required
            className="peer w-full appearance-none bg-white/10 text-white border border-white/30 rounded-xl px-4 pt-6 pb-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-transparent"
          >
            <option value="" disabled hidden>Select Learning Path</option>
            {["Web Development", "Machine Learning", "Data Analysis", "Cybersecurity", "UI/UX Design"].map((opt) => (
              <option key={opt} className="text-black" value={opt}>{opt}</option>
            ))}
          </select>
          <label className="absolute left-4 top-2 text-sm text-white font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/80 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-300">
            What do you want to learn?
          </label>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/80 text-lg">
            <FiChevronDown />
          </div>
        </div>
  
        <div className="w-full">
          <label className="block mb-1 text-sm text-white font-medium">Skill Level</label>
          <div className="flex gap-4">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label key={level} className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="radio"
                  name="skillLevel"
                  value={level}
                  checked={formData.skillLevel === level}
                  onChange={handleChange}
                  className="accent-indigo-400"
                />
                {level}
              </label>
            ))}
          </div>
        </div>
  
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-sm text-white font-medium">Select Courses</label>
          <div className="flex flex-wrap gap-4">
            {["HTML", "CSS", "JS", "React", "MERN Stack", "Full Stack Development"].map((course) => (
              <label key={course} className="inline-flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  name="courses"
                  value={course}
                  onChange={handleChange}
                  checked={formData.courses.includes(course)}
                  className="accent-purple-400"
                />
                {course}
              </label>
            ))}
          </div>
        </div>
  
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 text-sm text-white font-medium flex items-center gap-2">
            <FaImage />
            Upload Profile Picture
          </label>
          <input
            name="profilePic"
            type="file"
            accept="image/*"
            required
            onChange={handleChange}
            className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/10 text-white file:text-white"
          />
          {formData.profilePic && (
            <img
              src={URL.createObjectURL(formData.profilePic)}
              alt="Preview"
              className="mt-3 w-20 h-20 object-cover rounded-full border shadow"
            />
          )}
        </div>
      </>
    );
  }
  