import React from "react";
//import "./App.css";
import DashBoard from "./components/content/DashBoard";
import Navigation from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  {ExpensesForm} from "./components/content/ExpensesForm";
import { Container,Row,Col } from "react-bootstrap";
import Footer from "./components/footer";



const App: React.FC = () => {

  return (
    <>
      <Container  fluid="md">

      <Navigation />
      <main role="main">
     
          <Row>
            <Col>
              
              <Router>
                <Switch>
                  <Route exact path="/">
                    <DashBoard />
                  </Route>
                  {/* 
                  <Route exact path="/callback">
                    <CallBack />
                  </Route>
                  */}
                  <Route  exact path="/add">
                    <ExpensesForm />
                  </Route>
                   <Route path="/edit/:id"  component={ExpensesForm}/>
                 </Switch>
              </Router>
             
            </Col>
          </Row>
      
      </main>
   
      <Footer />
      
      </Container>
     
    </>
  );
};

export default App;
