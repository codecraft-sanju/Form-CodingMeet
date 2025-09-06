const InputField = ({ name, value, onChange, label, type = "text", placeholder = "", maxLength }) => (
  <div>
    <label className="block mb-1 text-sm text-gray-400">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      maxLength={maxLength}
      required
      placeholder={placeholder}
      autoComplete={name}
      className="w-full bg-transparent border-b border-gray-600 focus:outline-none text-white placeholder-gray-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
    />
  </div>
);

export default InputField;