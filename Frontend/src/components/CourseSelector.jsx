const allCourses = ["Full Stack MERN", "Java + DSA", "AI/ML", "React Native", "UI/UX", "Blockchain"];

const CourseSelector = ({ selectedCourses, toggleCourse }) => (
  <div className="col-span-1 sm:col-span-2">
    <label className="block mb-1 text-sm text-gray-400">Choose Courses</label>
    <div className="flex flex-wrap gap-3">
      {allCourses.map((course, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() => toggleCourse(course)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition duration-200 ${
            selectedCourses.includes(course)
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
          }`}
        >
          {course}
        </button>
      ))}
    </div>
  </div>
);

export default CourseSelector;