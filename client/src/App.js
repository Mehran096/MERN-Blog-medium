 import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
 import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
 import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./main.scss";
import store from "./store";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import RouteLinks from "./private/RouteLinks";
import  Notfound  from "./components/NotFound";
import Create from "./components/Create";
import Edit from "./components/Edit";
import EditImage from "./components/EditImage";
import UpdateName from "./components/UpdateName";
import ChangePassword from "./components/ChangePassword";
import Details from "./components/Details";
 
 
function App() {
  return (
    <Provider store={store}>
    <Router>
    <Navbar/>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home/:page?" exact component={Home} />
        <Route path="/details/:id" exact component={Details} />
        <RouteLinks path="/register" exact component= {Register} />
        <RouteLinks path="/login" exact component={Login} />
        <PrivateRoute path="/dashboard/:page?" exact component={Dashboard} />
        <PrivateRoute path="/create" exact component={Create} />
        <PrivateRoute path="/edit/:id" exact component={Edit} />
        <PrivateRoute path="/editImage/:id" exact component={EditImage} />
        <PrivateRoute path="/updateName" exact component={UpdateName} />
        <PrivateRoute path="/changePassword" exact component={ChangePassword} />
        <Route  component={Notfound} />
      
         
    </Switch>
       
    </Router>
    </Provider>
  );
}

export default App;
