import React from "react";
import "./App.css";
import DashBoard from "./components/content/DashBoard";
import ContentWrapper from "./components/content/DashBoard";
import SideBar from "./components/sidebar";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddExpensesForm from "./components/content/AddExpensesForm";

const App: React.FC = () => {
  return (
    <div id="wrapper">
      <SideBar />
      <ContentWrapper>
        <NavBar />
        <div className="container-fluid">
          <Router>
            <Switch>
              <Route path="/add-expenses">
                <AddExpensesForm />
              </Route>
              <Route path="/">
                <DashBoard />
              </Route>
            </Switch>
          </Router>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default App;
