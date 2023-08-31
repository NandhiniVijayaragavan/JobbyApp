import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Style.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
  AiOutlineCalendar,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showSuccessToast,
  showErrorToast,
} from "../Components/Modals/toastModal";

const cloudName = "drf2skt5s";
const preset = "jobbyregimg";

const Register = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/");
    }
  }, []);

  const [isEmployer, setIsEmployer] = useState(true);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      email: "",
      about: "",
      password: "",
      confirm_password: "",
      dob: "",
      image: "",
      name: "",
      isemployer: isEmployer,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .required("Please enter name!!!")
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must not exceed 3 characters"),
      lastname: Yup.string()
        .required("Please enter name!!!")
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must not exceed 3 characters"),
      email: Yup.string().required().email(),
      phoneno: Yup.number().required(),
      password: Yup.string()
        .required()
        .min(8, "Password should be minimum 8 characters"),
      confirm_password: Yup.string()
        .required("Please confirm your password")
        .min(8, "Password should be minimum 8 characters")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      about: Yup.string().required(),
    }),
    onSubmit: (values) => {
      if (!selectedImage) {
        showErrorToast("Please select an image.");
        return;
      }

      const fullname = `${values.firstname} ${values.lastname}`;
      values.name = fullname;

      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", preset);

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        )
        .then((response) => {
          const imageUrl = response.data.secure_url;
          console.log(response.data);
          // console.log(imageUrl);

          const requestedValues = {
            name: fullname,
            email: values.email,
            phoneno: values.phoneno,
            image: imageUrl,
            password: values.password,
            isemployer: isEmployer ? 1 : 0,
            dob: values.dob,
            about: values.about,
          };
          console.log(requestedValues);
          axios
            .post("api/user/registeruser", requestedValues)
            .then((res) => {
              showSuccessToast(res.data.message);
              navigate("/login", { replace: true });
            })
            .catch((err) => {
              showErrorToast(err.response.data.message);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <div className="register">
      <form onSubmit={formik.handleSubmit}>
        <div className="form">
          <div className="header">
            <h3>Register</h3>
            <span>
              Aleady have an account ? Then <Link to="/login">Login</Link>
            </span>
          </div>
          <div className="form-body">
            <div className="row">
              <div className="col firstname">
                <input
                  className="form__input"
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter Your First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="error">{formik.errors.firstname}</div>
                ) : null}
              </div>
              <div className="col lastname">
                <input
                  className="form__input"
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Enter Your Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="error">{formik.errors.lastname}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col email">
                <input
                  type="email"
                  id="email"
                  className="form__input"
                  name="email"
                  placeholder="Enter your Email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="col phoneno">
                <input
                  type="number"
                  name="phoneno"
                  id="phoneno"
                  className="form__input"
                  placeholder="Enter your Phone number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneno}
                />
                {formik.touched.phoneno && formik.errors.phoneno ? (
                  <div className="error">{formik.errors.phoneno}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col password input-container">
                <input
                  className="form__input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <span
                  className="password-toggle-icon input-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="col confirm_password input-container">
                <input
                  className="form__input"
                  type={showPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                />
                <span
                  className="password-toggle-icon input-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                {formik.touched.confirm_password &&
                formik.errors.confirm_password ? (
                  <div className="error">{formik.errors.confirm_password}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col dob ">
                <DatePicker
                  className="form__input"
                  value={formik.values.dob}
                  onChange={(date) =>
                    formik.setFieldValue(
                      "dob",
                      date.toISOString().split("T")[0]
                    )
                  }
                  format="yyyy-MM-dd"
                  dayPlaceholder="DoB"
                  monthPlaceholder="Select"
                  yearPlaceholder=" Please"
                  placeholder="Please select DoB"
                  calendarIcon={<AiOutlineCalendar className="white-icon" />}
                  clearIcon={<AiOutlineClose className="white-icon" />}
                />
              </div>
              <div className="col role">
                <span className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="employer"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setIsEmployer(true);
                    }}
                    onBlur={formik.handleBlur}
                    checked={isEmployer}
                  />
                  <label className="form-check-label">Employer</label>
                </span>
                <span className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="jobseeker"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setIsEmployer(false);
                    }}
                    onBlur={formik.handleBlur}
                    checked={!isEmployer}
                  />
                  <label className="form-check-label">Job Seeker</label>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col about">
                <textarea
                  className="form__input"
                  type="text"
                  id="about"
                  placeholder="Say something about yourself"
                  name="about"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.about}
                />
                {formik.touched.about && formik.errors.about ? (
                  <div className="error">{formik.errors.about}</div>
                ) : null}
              </div>
              <div className="col file form-group">
                <input
                  type="file"
                  className="form-control-file custom-file-input"
                  id="image"
                  name="image"
                  accept=".jpeg, .jpg, .svg, image/jpeg, image/svg"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="submit" className="btn ">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
