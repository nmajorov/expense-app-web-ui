import React from "react";
//import "./App.css";
import DashBoard from "./components/content/DashBoard";
import Navigation from "./components/navbar/NavBar";
import { Switch, Route } from "react-router-dom";
import { ExpensesForm } from "./components/content/ExpensesForm";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/footer";
//import CallBack from "./utils/CallBack";
import { Provider } from 'react-redux';
import { store, persistor ,history} from './store/ConfigStore';
import { PersistGate } from 'redux-persist/lib/integration/react';
import InitializingScreen from "./InitializingScreen";
import SSOComponent from "./components/SSOComponent";
import { ConnectedRouter } from 'connected-react-router'



interface AppProps {
  history: History;
}

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={<InitializingScreen />} persistor ={persistor}>

      <ConnectedRouter history={history}>

      
        <SSOComponent/>
          <Container fluid="md">
            <Navigation />
            <main role="main">

              <Row>
                <Col>
                  
                      
                    <Switch>            
                        <Route exact path="/" component={DashBoard} />
                  
                        <Route  path="/add" component={ExpensesForm} />

                       <Route path="/edit/:id" component={ExpensesForm} />
                      </Switch>         
                 

                </Col>
              </Row>

            </main>

            <Footer />

          </Container>
         
          
        </ConnectedRouter>
      </PersistGate>

    </Provider>
  );
};

export default App;
