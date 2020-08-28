import React from "react";
//import "./App.css";
import DashBoard from "./components/content/DashBoard";
import Navigation from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  {ExpensesForm} from "./components/content/ExpensesForm";
import { Container,Row,Col } from "react-bootstrap";
import Footer from "./components/footer";
import CallBack from "./utils/CallBack";
import { Provider } from 'react-redux';
import {store, persistor} from './store/ConfigStore';
import { PersistGate } from 'redux-persist/lib/integration/react';
import InitializingScreen from "./InitializingScreen";






const App: React.FC = () => {

  return (
    <Provider store={store}>
    <PersistGate loading={<InitializingScreen />} persistor={persistor}>
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
                    <Route exact path="/callback">
                      <CallBack />
                    </Route>
                    
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
    </PersistGate>
    </Provider>
  );
};

export default App;
