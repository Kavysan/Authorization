import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    function navigateToLoginPage(){
        navigate('/login')
    }
    function logMeOut(){
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/logout",
        })
        .then((response) => {
            if(response.status === 201){
                console.log("logout buttom clicked")
                localStorage.removeItem('email')
                localStorage.removeItem('token')
                alert("Logout successful")
                // props.token()
                navigate("/login");
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    const logged = localStorage.getItem('email')
    console.log(logged)

  return (
    <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Authpage</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">

                  <Link to={'/'}>Home</Link>
                </li>
              </ul>
                {!logged?
                     <button className="btn btn-outline-success" type="submit" onClick={navigateToLoginPage}>Login</button> 
                :
                <button className="btn btn-outline-danger" type="submit" onClick={logMeOut}>Logout</button>
                 } 
            </div>
          </div>
        </nav>
    )
}

export default Header
