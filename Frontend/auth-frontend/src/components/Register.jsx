import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  function btnRegister(event) {
    console.log("Register button clicked!");
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/signup", 
      data: {
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name, 
      },
    })
      .then(function (response) {
        if (response.status === 201) {
          console.log(response);
          alert("Registration Successful");
          navigate('/login');
        } else {
          console.error("Unexpected response status:", response.status);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 409) {
            alert("Email already exists. Please use a different email.");
          } else {
            console.log(error);}
        // Handle registration error
      });

    setRegisterForm({
      email: "",
      password: "",
      name: "",
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className="container h-50">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-md-9 col-lg-6 col-xl-5">
              {/* Image or other content for registration */}
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Register Your Account</p>
                </div>

                {/* Email Input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleChange}
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                {/* Password Input */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleChange}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                {/* Name Input */}
                <div className="form-outline mb-3">
                  <input
                    type="text"
                    name="name"
                    value={registerForm.name}
                    onChange={handleChange}
                    id="form3Example5"
                    className="form-control form-control-lg"
                    placeholder="Enter your name"
                  />
                  <label className="form-label" htmlFor="form3Example5">
                    Name
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  {/* Register Button */}
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={btnRegister}
                  >
                    Register
                  </button>
                  {/* Login Link */}
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <Link to={"/login"} className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
