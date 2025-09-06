const FileUpload = ({ fileName, handleFileChange }) => (
  <div className="col-span-1 sm:col-span-2">
    <label className="block mb-1 text-sm text-gray-400">Upload Profile</label>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <input
        type="file"
        accept="image/*"
        id="profile-upload"
        onChange={handleFileChange}
        className="hidden"
        required
      />
      <label
        htmlFor="profile-upload"
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded cursor-pointer"
      >
        Choose File
      </label>
      <span className="text-sm text-gray-400">{fileName}</span>
    </div>
  </div>
);

export default FileUpload;