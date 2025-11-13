import { useState } from "react";

export default function EditJobModal({ job, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({ ...job });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this job?")) {
        onDelete(job.job_id);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Edit Job — {job.job_title}
        </h2>
        <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Delete
            </button>
        </div>
            

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="company_name"
              className="w-1/3 text-gray-700 font-medium text-sm"
            >
              Company
            </label>
            <input
              id="company_name"
              name="company_name"
              className="w-2/3 p-2 border rounded"
              value={formData.company_name}
              onChange={handleChange}
            />
          </div>

          {/* Job Title */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="job_title"
              className="w-1/3 text-gray-700 font-medium text-sm"
            >
              Title
            </label>
            <input
              id="job_title"
              name="job_title"
              className="w-2/3 p-2 border rounded"
              value={formData.job_title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="flex items-start justify-between">
            <label
              htmlFor="description"
              className="w-1/3 text-gray-700 font-medium text-sm pt-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-2/3 p-2 border rounded resize-none"
              rows={3}
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>

          {/* Job URL */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="job_url"
              className="w-1/3 text-gray-700 font-medium text-sm"
            >
              Job URL
            </label>
            <input
              id="job_url"
              name="job_url"
              className="w-2/3 p-2 border rounded"
              value={formData.job_url}
              onChange={handleChange}
            />
          </div>

          {/* Date Applied */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="date_applied"
              className="w-1/3 text-gray-700 font-medium text-sm"
            >
              Date Applied
            </label>
            <input
              id="date_applied"
              name="date_applied"
              type="date"
              className="w-2/3 p-2 border rounded text-gray-500 bg-gray-100"
              value={formData.date_applied}
              readOnly
            />
          </div>

          {/* Follow Up Date */}
          <div className="flex items-center justify-between">
            <label  
              htmlFor="follow_up_date"
              className="w-1/3 text-gray-700 font-medium text-sm"
            >
              Follow Up Date
            </label>
            <input
              id="follow_up_date"
              name="follow_up_date"
              type="date"
              className="w-2/3 p-2 border rounded"
              value={formData.follow_up_date}
              onChange={handleChange}
            />
          </div>  

          {/* Status */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="status"
              className="w-1/3 text-gray-700 font-medium text-sm"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-2/3 p-2 border rounded"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offered</option>
              <option>Rejected</option>
              <option>Accepted</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="priority"
              className="w-1/3 text-gray-700 font-medium text-sm"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="w-2/3 p-2 border rounded"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Resume File */}
          <div className="flex items-center justify-between">
            <label className="w-1/3 text-gray-700 font-medium text-sm">
              Resume:
            </label>
            <a
              href={`http://127.0.0.1:5000/api/jobs/resume/${job.resume_file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-2/3 text-blue-600 underline border rounded bg-gray-50 hover:bg-gray-100 p-2 text-center"
            >
              {job.resume_file ? "View Resume" : "No Resume Uploaded"}
            </a>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
