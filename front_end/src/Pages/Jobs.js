import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./Style.css";
import {
  showSuccessToast,
  showErrorToast,
} from "../Components/Modals/toastModal";

function Jobs() {
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);

  const handleReadMoreClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const getJobs = () => {
    if (role === "0") {
      axios
        .get("/api/jobs/getAllJob")
        .then((response) => {
          setJobList(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching job list:", error);
        });
    } else {
      const userId = localStorage.getItem("userID");
      axios
        .get(`/api/jobs/getUserjobList/${userId}`)
        .then((response) => {
          setJobList(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user job list:", error);
        });
    }
  };
  useEffect(() => {
    getJobs();
  }, [role]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Jobs List</h1>
      <div className="row">
        {jobList.map((job) => (
          <div key={job.jobId} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <div className="d-flex align-items-center justify-content-between  p-3">
                <div>
                  <h5 className="card-title">{job.company_name}</h5>
                </div>
                <div>
                  <img
                    src={job.company_logo}
                    alt="logo"
                    className="company-logo"
                  />
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">Job Role: {job.job_role}</p>
                <p className="card-text">Location: {job.location}</p>
                <p className="card-text">Salary: {job.salary} </p>
                <p className="card-text">
                  Experience Required: {job.experience} Years
                </p>
                <button
                  className="btn btn-dark"
                  onClick={() => handleReadMoreClick(job)}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <JobDetailsModal
        job={selectedJob}
        companyName={selectedJob?.company_name} // Pass the company name here
        companyLogo={selectedJob?.company_logo}
        showModal={showModal}
        setShowModal={setShowModal}
        getJobs={getJobs}
      />
    </div>
  );
}

function JobDetailsModal({
  job,
  companyName,
  companyLogo,
  showModal,
  setShowModal,
  getJobs,
}) {
  const userRole = localStorage.getItem("role");
  const isJobSeeker = userRole === "0";

  const handleApplyClick = () => {
    if (isJobSeeker) {
      showSuccessToast("Successfully Applied");
      setShowModal(false);
    }
  };

  const handleDeleteClick = () => {
    // Call the delete API here
    axios
      .delete(`/api/jobs/deleteJob/${job.jobId}`)
      .then((response) => {
        showSuccessToast("Job successfully deleted");
        getJobs(); // Refresh the job list after deletion
        setShowModal(false); // Close the modal
      })
      .catch((error) => {
        showErrorToast("Error deleting job");
      });
  };

  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState({}); // Clone initial job data

  useEffect(() => {
    setEditedJob(job);
  }, [job]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Call the update API with editedJob data
    axios
      .put(`/api/jobs/updateJobPost/${job.jobId}`, editedJob)
      .then((response) => {
        showSuccessToast("Job successfully updated");
        getJobs(); // Refresh the job list after update
        setEditMode(false); // Exit edit mode
        setShowModal(false); // Close the modal
      })
      .catch((error) => {
        showErrorToast("Error updating job");
      });
  };

  const handleCancelClick = () => {
    // Exit edit mode and reset editedJob to original values
    setEditMode(false);
    setEditedJob({ ...job });
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
        <div className="d-flex align-items-center">
          <div>
            <img
              src={companyLogo}
              alt="logo"
              className="company-logo"
              style={{ marginRight: "10px" }}
            />
          </div>
          <div>
            <Modal.Title>{companyName}</Modal.Title>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="p-4">
        {job && (
          <div>
            <div className="row mb-3">
              <div className="col-4">
                <strong>Job Role:</strong>
              </div>
              <div className="col-8">
                {editMode ? (
                  <input
                    type="text"
                    value={editedJob.job_role}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, job_role: e.target.value })
                    }
                    className={editMode ? "editable-input full-width" : ""}
                  />
                ) : (
                  job.job_role
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <strong>Job Location:</strong>{" "}
              </div>
              <div className="col-8">
                {editMode ? (
                  <input
                    type="text"
                    value={editedJob.location}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, location: e.target.value })
                    }
                    className={editMode ? "editable-input full-width" : ""}
                  />
                ) : (
                  job.location
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4">
                <strong>Experience Required:</strong>{" "}
              </div>
              <div className="col-8">
                {editMode ? (
                  <input
                    type="number"
                    value={editedJob.experience}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, experience: e.target.value })
                    }
                    className={editMode ? "editable-input full-width" : ""}
                  />
                ) : (
                  job.experience + " years"
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <strong>Salary:</strong>{" "}
              </div>
              <div className="col-8">
                {editMode ? (
                  <input
                    type="number"
                    value={editedJob.salary}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, salary: e.target.value })
                    }
                    className={editMode ? "editable-input full-width" : ""}
                  />
                ) : (
                  job.salary
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <strong>Responsibilities:</strong>{" "}
              </div>
              <div className="col-8">
                {editMode ? (
                  <textarea
                    type="text"
                    value={editedJob.responsibilities}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        responsibilities: e.target.value,
                      })
                    }
                    className={
                      editMode ? "editable-input full-width half-height" : ""
                    }
                  />
                ) : (
                  job.responsibilities
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                {" "}
                <strong>Skill Required:</strong>{" "}
              </div>
              <div className="col-8">
                {editMode ? (
                  <textarea
                    type="text"
                    value={editedJob.skills}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, skills: e.target.value })
                    }
                    className={
                      editMode ? "editable-input full-width half-height" : ""
                    }
                  />
                ) : (
                  job.skills
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <strong>About Job:</strong>{" "}
              </div>
              <div className="col-8">
                {editMode ? (
                  <textarea
                    value={editedJob.about_job}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, about_job: e.target.value })
                    }
                    className={
                      editMode ? "editable-input full-width half-height" : ""
                    }
                  />
                ) : (
                  job.about_job
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <strong>About Company:</strong>{" "}
              </div>
              <div className="col-8">
                {editMode ? (
                  <textarea
                    value={editedJob.about_company}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        about_company: e.target.value,
                      })
                    }
                    className={
                      editMode ? "editable-input full-width half-height" : ""
                    }
                  />
                ) : (
                  job.about_company
                )}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!isJobSeeker && !editMode && (
          <>
            <Button
              className="btn btn-dark"
              variant="secondary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              className="btn btn-dark"
              variant="secondary"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </>
        )}

        {!isJobSeeker && editMode && (
          <>
            <Button
              className="btn btn-dark"
              variant="secondary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              className="btn btn-dark"
              variant="secondary"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </>
        )}

        {isJobSeeker && (
          <Button
            className="btn btn-dark"
            variant="secondary"
            onClick={handleApplyClick}
          >
            Apply
          </Button>
        )}
        <Button
          className="btn btn-dark"
          variant="secondary"
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Jobs;
