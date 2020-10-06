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
import GlobalAlert from "./components/Alert";
import ProfileView from "./components/content/ProfileView";
import Logout from "./components/content/Logout";



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
           <GlobalAlert />
            <Navigation />
            <main role="main">

              <Row>
                <Col>
                  
                      
                    <Switch>            
                        <Route exact path="/" component={DashBoard} />
                  
                        <Route  path="/add" component={ExpensesForm} />

                        <Route  path="/profile" component={ProfileView} />

                       <Route path="/edit/:id" component={ExpensesForm} />

                        <Route path="/logout" component={Logout} />
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
