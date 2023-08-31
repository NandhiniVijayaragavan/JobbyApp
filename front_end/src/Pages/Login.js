import React, { useEffect, useContext, useState }  from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Style.css";
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios";
import setAuthToken from "../Helpers/setAuthToken";
import jwt_decode from "jwt-decode";
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { showSuccessToast, showErrorToast } from '../Components/Modals/toastModal';
 
const Login = ()=> {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    let currentTime;
    let decoded;

    if(localStorage.authtoken){
      const token = localStorage.getItem("authtoken");
      
      decoded = jwt_decode(token);

      currentTime = Date.now() / 1000;
      if (decoded?.exp >= currentTime) {
        console.log("Token present - navigating to home page");
        navigate("/",{replace:true});

      } else {
        console.log("Token expried - navigating to login page");
        navigate("/login");
      }
    } else {
      console.log("No token found - navigating to login page");
      navigate("/login");
    }
},[]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .min(8, "Password should be minimum 8 characters"),
    }),

    onSubmit: (values) => {
    console.log(values);
    axios
        .post("api/user/loginuser", values)
        .then( (res) => {
          showSuccessToast(res.data.message);
          const token =res?.data?.token;
          const userFullName = res?.data?.userFullName; 
          const userProfilePic = res?.data?.userProfilePic;
          const role = res?.data?.role;
          const userID =res?.data?.userId;
          setAuthToken(token);
          localStorage.setItem("authtoken", token);
          localStorage.setItem("userFullName", userFullName);
          localStorage.setItem("userProfilePic", userProfilePic);
          localStorage.setItem("role",role);
          localStorage.setItem("userID",userID);
          navigate("/");
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        })
    }
    });

    useEffect(() => {
      console.log(formik.errors);
    }, [formik.errors]);

    return(
        <div className='login'>
      <form onSubmit={formik.handleSubmit}>
      <div className="form1">
        <div className='header'>
            <h3>Login</h3>
            <span>
              Don't have account ? Then <Link to="/register">Register</Link>
            </span>
         </div>   
      <div className="form-body">

          <div className="email">
            <label className="form__label labelwi" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              name="email"
              placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            />
           {formik.touched.email && formik.errors.email ? (
           <div className='error1'>{formik.errors.email}</div>
           ) : null}
          </div>

          <div className="password input-container">
            <label className="form__label labelwi" htmlFor="password">
              Password
            </label>
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
                  className="password-toggle-icon input-icon1"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                </span>
           {formik.touched.password && formik.errors.password ? (
           <div className='error1'>{formik.errors.password}</div>
           )    : null}
         </div>

        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Login
          </button>
      </div>
      </div>
    </form>
        </div>
    )
}; 
export default Login;
