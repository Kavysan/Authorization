import './App.css'
import Login from './components/Login'
import {HashRouter} from 'react-router-dom'


function App() {

  return (
    <>
      <div className="vh-100 gradient-custom">
        <div className="container">
          <h1 className="page-header text-center">Authentication</h1>

            <HashRouter>
              <Login />
            </HashRouter>


        </div>
      </div>
    </>
  )
}

export default App
