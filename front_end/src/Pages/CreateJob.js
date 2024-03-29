import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  showSuccessToast,
  showErrorToast,
} from "../Components/Modals/toastModal";
import setAuthToken from "../Helpers/setAuthToken";

const cloudName = "drf2skt5s";
const preset = "companylogo";

const CreateJob = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");
  const storedUserId = localStorage.getItem("userID");
  const [logoUrl, setLogoUrl] = useState("");
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    //  Cloudinary
    if (file) {
      setAuthToken(null);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        const uploadedUrl = response?.data.url;
        console.log("Uploaded Logo URL:", uploadedUrl);

        setLogoUrl(uploadedUrl); 

      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        showErrorToast("Error uploading image. Please try again.");
      }
    }
  };


  const formik = useFormik({
    initialValues: {
      company_logo: "",
      company_name: "",
      job_role: "",
      location: "",
      skills: "",
      salary: 0,
      responsibilities: "",
      experience: 0,
      about_job: "",
      about_company: "",
      userId: storedUserId || 0,
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required("Required"),
      job_role: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      skills: Yup.string().required("Required"),
      salary: Yup.number()
        .required("Required")
        .positive("Salary must be positive"),
      responsibilities: Yup.string().required("Required"),
      experience: Yup.number()
        .required("Required")
        .positive("Experience must be positive"),
      about_job: Yup.string().required("Required"),
      about_company: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting form...");
      console.log(values);
      setAuthToken(token);

      const requestedValues = {
        company_logo: logoUrl,
        company_name: values.company_name,
        job_role: values.job_role,
        location: values.location,
        skills: values.skills,
        salary: values.salary,
        responsibilities: values.responsibilities,
        experience: values.experience,
        about_job: values.about_job,
        about_company: values.about_company,
        userId: storedUserId || 0,
      };
      console.log(requestedValues);

      try {
        const apiResponse = await axios.post("/api/jobs/addJobPost", requestedValues);
        console.log("API Response:", apiResponse.data);
        showSuccessToast(apiResponse.data.message);
        navigate("/jobs", { replace: true });
      } catch (error) {
        console.error("API Error:", error);
        showErrorToast(error.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Create Job</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="company_name" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="company_name"
              name="company_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company_name}
            />
            {formik.touched.company_name && formik.errors.company_name ? (
              <div className="text-danger">{formik.errors.company_name}</div>
            ) : null}
          </div>

          <div className="col">
            <label htmlFor="job_role" className="form-label">
              Job Role
            </label>
            <input
              type="text"
              className="form-control"
              id="job_role"
              name="job_role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job_role}
            />
            {formik.touched.job_role && formik.errors.job_role ? (
              <div className="text-danger">{formik.errors.job_role}</div>
            ) : null}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="company_logo" className="form-label">
              Company Logo
            </label>
            <input
              type="file"
              className="form-control"
              id="company_logo"
              name="company_logo"
              accept=".jpeg, .jpg, .svg, image/jpeg, image/svg"
                  onChange={handleImageChange}
            />
          </div>
          <div className="col">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-danger">{formik.errors.location}</div>
            ) : null}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control"
              id="salary"
              name="salary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salary}
            />
            {formik.touched.salary && formik.errors.salary ? (
              <div className="text-danger">{formik.errors.salary}</div>
            ) : null}
          </div>

          <div className="col">
            <label htmlFor="experience" className="form-label">
              Experience
            </label>
            <input
              type="number"
              className="form-control"
              id="experience"
              name="experience"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.experience}
            />
            {formik.touched.experience && formik.errors.experience ? (
              <div className="text-danger">{formik.errors.experience}</div>
            ) : null}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="skills" className="form-label">
              Skills
            </label>
            <textarea
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.skills}
            />
            {formik.touched.skills && formik.errors.skills ? (
              <div className="text-danger">{formik.errors.skills}</div>
            ) : null}
          </div>
          <div className="col">
            <label htmlFor="responsibilities" className="form-label">
              Responsibilities
            </label>
            <textarea
              type="text"
              className="form-control"
              id="responsibilities"
              name="responsibilities"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.responsibilities}
            />
            {formik.touched.responsibilities &&
            formik.errors.responsibilities ? (
              <div className="text-danger">
                {formik.errors.responsibilities}
              </div>
            ) : null}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="about_company" className="form-label">
              About Company
            </label>
            <textarea
              type="text"
              className="form-control"
              id="about_company"
              name="about_company"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.about_company}
            />
            {formik.touched.about_company && formik.errors.about_company ? (
              <div className="text-danger">{formik.errors.about_company}</div>
            ) : null}
          </div>
          <div className="col">
            <label htmlFor="about_job" className="form-label">
              About Job
            </label>
            <textarea
              type="text"
              className="form-control"
              id="about_job"
              name="about_job"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.about_job}
            />
            {formik.touched.about_job && formik.errors.about_job ? (
              <div className="text-danger">{formik.errors.about_job}</div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="create_btn btn btn-primary "
          style={{ backgroundColor: "#333" }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
