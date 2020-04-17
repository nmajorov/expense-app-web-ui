import React from "react";
//import "./App.css";
import DashBoard from "./components/content/DashBoard";
import NavigationBarContainer from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddExpensesForm from "./components/content/AddExpensesForm";
import { Container,Row,Col } from "react-bootstrap";
import Footer from "./components/footer";

const App: React.FC = () => {
  return (
   <>
    <NavigationBarContainer />
      <main role="main">
      <Container className="p-3">
      
        <Row>
          <Col>
          
          </Col>
        </Row>
        <Row>
          <Col>
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
          </Col>
 
        </Row>
     
      </Container>
      </main>
      <Footer/>
    </>
  );
};

export default App;
