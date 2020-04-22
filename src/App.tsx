import React from "react";
//import "./App.css";
import DashBoard from "./components/content/DashBoard";
import NavigationBarContainer from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  ExpensesForm from "./components/content/ExpensesForm";
import { Container,Row,Col } from "react-bootstrap";
import Footer from "./components/footer";


const App: React.FC = () => {
  return (
    <>
      <NavigationBarContainer />
      <main role="main">
        <Container className="p-3">
          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <DashBoard />
                  </Route>
                  <Route path="/add">
                    <ExpensesForm />
                  </Route>
                  <Route path="/edit/:id" render={(props) =>{
                    return(<ExpensesForm  editExpenseId = {props.match.params.id}/>)
                    }} />
                 </Switch>
              </Router>
            </Col>
          </Row>
          <Footer />
        </Container>
      </main>
     
     
    </>
  );
};

export default App;
