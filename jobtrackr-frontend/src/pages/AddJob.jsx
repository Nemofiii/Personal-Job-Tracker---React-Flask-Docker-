import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddJob(){
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const [formData, setformData] = useState({
    company_name: "",
    job_title: "",
    description: "",
    job_url: "",
    date_applied: today,  //setting today's date as default and not editable
    follow_up_date: "",
    status: "Applied",
    priority: "Medium",
  })

  const handleChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value});
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    try{
      await api.post('/jobs', formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access_token}`,
        }
      })
      toast.success("Job added Successfully")
      setTimeout(() => navigate("/dashboard"), 1000);
    }catch (error) {
      console.error("Add job error:", error.response?.data || err.message)
      toast.error("Failed to add job")
    }
  }

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <ToastContainer />
      <form
        onSubmit={handlesubmit}
        className="bg-white shadow-md w-full rounded-xl p-8 max-w-lg"
      >
        <h2 className="text-2xl text-center font-bold mb-4 text-blue-700">
          Add a new Job
        </h2>
        <label className="block text-black mb-2">Company Name:</label>
        <input
          name="company_name"
          placeholder="Company Name"
          className="w-full p-3 border rounded-xl"
          onChange={handleChange}
          required
        />
        <label className="block text-black mt-2 mb-2">Job Title:</label>
        <input
          name="job_title"
          placeholder="Job Title"
          className="w-full p-3 border rounded-xl mb-2"
          onChange={handleChange}
          required
        />
        <label className="block text-black mb-2">Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 border rounded-xl mb-2"
          onChange={handleChange}
        />
        <label className="block text-black mb-2">Job URL:</label>
        <input
          name="job_url"
          placeholder="Job URL"
          className="w-full p-3 border rounded-xl mb-2"
          onChange={handleChange}
        />
        <label className="block text-black mb-2">Date Applied:</label>
        <input
          type="date"
          name="date_applied"
          className="w-full p-3 border rounded-xl mb-2 text-gray-500 bg-gray-100"
          value={formData.date_applied}
          readOnly
        />
        <label className="block text-black mb-2">Follow Up Date:</label>
        <input
          type="date"
          name="follow_up_date"
          className="w-full p-3 border rounded-xl mb-2"
          onChange={handleChange}
        />
        <label className="block text-black mb-2">Status:</label>
        <select
          name="status"
          className="w-full p-3 border rounded-xl mb-2 text-gray-500"
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
        <label className="block text-black mb-2">Priority:</label>
        <select
          name="priority"
          className="w-full p-3 border rounded-xl mb-2 text-gray-500"
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Doesn't need resume upload while adding job because it doesnt accept file here due to pydantic and backedn endpoints not supporting it. */}

        {/* <div className="flex items-center justify-between mt-2 mb-2">
          <label className="w-1/3 text-gray-700 font-medium">
            Resume:
          </label>
          <input
            type="file"
            onChange={(e) => onSaveResume(job.job_id, e.target.files[0])}
            className="w-2/3 p-2 border rounded"
          />
        </div> */}

        <button className="w-full bg-blue-700 p-2 text-white rounded-xl hover:bg-blue-900">
          Add Job
        </button>
      </form>
    </div>
  );
}