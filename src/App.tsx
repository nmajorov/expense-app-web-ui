import React from "react";
//import "./App.css";
import DashBoard from "./components/content/DashBoard";
import NavigationBarContainer from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  {ExpensesForm} from "./components/content/ExpensesForm";
import { Container,Row,Col } from "react-bootstrap";
import Footer from "./components/footer";
import keycloak from "./keycloak";
import { KeycloakProvider } from '@react-keycloak/web'
import LoginPage from "./components/Login";


const App: React.FC = () => {

  return (
    <>
      <NavigationBarContainer />
      <main role="main">
        <Container className="p-3">
          <Row>
            <Col/>
          </Row>
          <Row>
            <Col>
              <KeycloakProvider
                  keycloak={keycloak}>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <DashBoard />
                  </Route>
                  <Route path="/login" component={LoginPage} />
                  <Route  exact path="/add">
                    <ExpensesForm />
                  </Route>
                   <Route path="/edit/:id"  component={ExpensesForm}/>
                 </Switch>
              </Router>
              </KeycloakProvider>
            </Col>
          </Row>
          <Footer />
        </Container>
      </main>
     
     
    </>
  );
};

export default App;
