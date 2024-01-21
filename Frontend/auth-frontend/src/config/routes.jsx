import Home from "../components/Home"
import Login from "../components/Login"
import Dashboard from "../components/Dashboard"

const routes = [
    {
      path: "/",
      component: Home,
      name: "Home Screen",
    //   protected: false
    },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "Dashboard",
    //   protected: false,
    },
    {
        path: "/login",
        component: Login,
        name: "Login",
        // protected: false,
    }
  ];

export default routes