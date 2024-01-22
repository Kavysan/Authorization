import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
      })

    const navigate = useNavigate();
    function btnlogin(event) {
        console.log("Button clicked!");
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/logintoken",
            data:{
                email: loginForm.email,
                password: loginForm.password
            }
          })
          .then(function (response) {
            if (response.status === 201) {
                console.log(response)
                alert("Successful Login");
                localStorage.setItem('email', loginForm.email)
                // localStorage.setItem('token', response.data.access_token)
                console.log(response.data.access_token)
                props.setToken(response.data.access_token)
                console.log(setToken)
                navigate('/dashboard');
            } else {
                console.error("Unexpected response status:", response.status);
            }
          })
          .catch(function (error) {
            if (error.response){
                console.log(error.response)
                if(error.response.status === 401){
                    alert("Invalid Credentials")
                }
            }
          });
          setloginForm(({
            email: "",
            password: ""}))
 
        event.preventDefault()
    }
 

    function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}





    return (
    <div>
        <div className="container h-50">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-50">
              <div className="col-md-9 col-lg-6 col-xl-5">
                Image
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                  </div>
  
                  <div className="form-outline mb-4">
                    <input type="email" name="email" value={loginForm.email} onChange={handleChange} text={loginForm.email} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                  </div>
  
              
                  <div className="form-outline mb-3">
                    <input type="password" name="password" value={loginForm.password} onChange={handleChange} text={loginForm.password} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                  </div>
  
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                  </div>
  
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <Link to={'/login'} className="btn btn-primary btn-lg" onClick={btnlogin} >Login</Link>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to={'/register'} className="link-danger">Register</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
