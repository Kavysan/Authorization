import './App.css'
import routes from './config/routes'
import { BrowserRouter,Routes, Route, HashRouter } from 'react-router-dom'
import useToken from './components/useToken'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Header from './components/Header'

// 
function App() {

  const { token, removeToken, setToken} = useToken()
  // console.log(token)

  return (

    <div className="vh-100 gradient-custom">
    <div className="container">
      <h1 className="page-header text-center">React-JS and Python Flask Login Token Authentication flask_jwt_extended with Profile | SQLAlchemy.</h1>
         
      <BrowserRouter>
        <Header token={removeToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {!token && token !== "" && token !== undefined ? (
            <Route path="/login" element={<Login setToken={setToken} />} />
          ) : (
            <>
              <Route
                path="/dashboard"
                element={<Dashboard token={token} setToken={setToken} />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>

    </div>
    </div>
)
}
export default App
