import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditJobModal from "../components/EditJobModal";
import ResumeUploadModal from "../components/ResumeUploadModal";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);   
    const [editingJob, setEditingJob] = useState(null);
    const [resumeUploadJob, setResumeUploadJob] = useState(null);
    const navigate = useNavigate();

    // Fetch jobs from the backend
    const fetchJobs = async () => {
        try{
            const res = await api.get('/jobs', {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                }
            })
            console.log("Response data:", res.data);
            setJobs(res.data.jobs); // access the jobs key
        }catch (error) {
            toast.error("Failed to fetch jobs.");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    // Save editted job
    const saveEditedJob = async (updatedJob) => {
        try{
            await api.put(`/jobs/${updatedJob.job_id}`, updatedJob, {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                }
            })
            toast.success("Job updated successfully!");
            setJobs((prev) => 
                prev.map((job) => (job.job_id === updatedJob.job_id ? updatedJob : job))
            );
            setEditingJob(null);
        }catch (error) {
            toast.error("Failed to update job.");
            console.error(error);
        }
    }

    // Delete job
    const deleteJob = async (jobId) => {
    //   if (!window.confirm("Are you sure you want to delete this job?")) return;
      try {
        await api.delete(`/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${user?.access_token}` },
        });
        toast.success("Job deleted!");
        setJobs((prev) => prev.filter((j) => j.job_id !== jobId));
        setEditingJob(null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job");
      }
    };

    // Upload resume
    const onSaveResume = async (jobId, file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post(`/jobs/${jobId}/upload_resume`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        toast.success("Resume uploaded successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload resume.");
      }
    };


    return (
      <div className="p-10 text-center min-h-screen bg-gray-100">
        <ToastContainer />
        <div>
          <h1 className="text-3xl font-bold mb-4">My Job Applications</h1>
          <div>
            <button
              onClick={() => navigate("/add-job")}
              className="bg-green-600 text-white px-4 py-2 rounded mr-3"
            >
              + Add Job
            </button>
            <button
              onClick={logout}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {jobs.length === 0 ? (
          <p className="mt-10 text-gray-600">
            No job applications tracked yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className="bg-white p-4 rounded border-gray-100 shadow-md"
              >
                <h3 className="text-lg font-semibold text-blue-800">
                  {job.job_title}
                </h3>
                <p className="text-gray-700">{job.company_name}</p>
                <p className="text-sm text-gray-700">
                  Status: {job.status} | Priority: {job.priority}
                </p>
                <button
                  onClick={() => setEditingJob(job)}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
                >
                  Edit Job
                </button>

                {/* Resume upload button show only if no resume uploaded */}
                {!job.resume_file && (
                  <button
                    onClick={() => setResumeUploadJob(job)}
                    className="flex justify-end bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                  >
                    Add Resume
                  </button>
                )}

                {/* {job.resume_file && (
                  <a
                    href={`http://127.0.0.1:5000/api/jobs/resume/${job.resume_file}`}
                    target="_blank"
                    className="text-blue-600 underline text-sm mt-2 block"
                  >
                    📄 View Resume
                  </a>
                )} */}

                {editingJob && (
                  <EditJobModal
                    job={editingJob}
                    onClose={() => setEditingJob(null)}
                    onSave={saveEditedJob}
                    onDelete={deleteJob}
                  />
                )}

                {resumeUploadJob && (
                  <ResumeUploadModal
                    job={resumeUploadJob}
                    onClose={() => setResumeUploadJob(null)}
                    onUpload={onSaveResume}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
}