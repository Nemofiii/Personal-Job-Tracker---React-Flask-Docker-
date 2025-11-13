import { useState } from "react";

export default function ResumeUploadModal({ job, onClose, onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");
    onUpload(job.job_id, file);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">
          Upload Resume — {job.job_title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
