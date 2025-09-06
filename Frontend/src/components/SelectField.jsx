const SelectField = ({ name, value, onChange, label, options = [] }) => (
  <div>
    <label className="block mb-1 text-sm text-gray-400">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full bg-[#1D1E21] border border-gray-600 p-2 rounded text-white"
    >
      <option value="">Select {label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default SelectField;