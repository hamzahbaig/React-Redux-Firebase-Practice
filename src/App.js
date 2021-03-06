import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import CreateProject from "./components/projects/CreateProject";
import Category from "./components/categories/Category";
import UserForm from "./components/auth/UserForm";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import MenuAppBar from "./components/navigationbar/MenuAppBar";
import HomePage from "./components/home/HomePage";
import StartCampaign from "./startcampaign/StartCampaign";
import CampaignPage from "./components/campaigpage/CampaignPage";
import Footer from "./components/navigationbar/Footer";
import Checkout from "./components/checkout/Checkout";
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return null;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <div className="App">
          <MenuAppBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/startcampaign" component={StartCampaign} />
            <Route exact path="/campaigns/:id" component={CampaignPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={UserForm} />
            <Route exact path="/create" component={CreateProject} />
            <Route exact path="/category/:id" component={Category} />
            <Route exact path="/checkout" component={Checkout} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </AuthIsLoaded>
    </BrowserRouter>
  );
}

export default App;
