import React from "react";
import axios from 'axios';

import DashBoard from "./components/content/DashBoard";
import {NavigationBar as Navigation} from "./components/navbar/NavBar";
import {Route, Switch} from "react-router-dom";
import {ExpensesForm} from "./components/content/ExpensesForm";
import {Container} from "react-bootstrap";
import Footer from "./components/footer";
import {Provider} from 'react-redux';
import {history, persistor, store} from './store/ConfigStore';
import {PersistGate} from 'redux-persist/lib/integration/react';
import InitializingScreen from "./InitializingScreen";
import {ConnectedRouter} from 'connected-react-router'
import GlobalAlert from "./components/Alert";
import ProfileView from "./components/content/ProfileView";
import Logout from "./components/content/Logout";
import ReportView from "./components/content/ReportView";
import {ReportForm} from "./components/content/ReportForm";
import {AlertActions} from "./actions/AlertAction";
import { AlertMessage, MessageType } from "./types/AlertTypes";


// intercept all Axios responses and dispatch the DECREMENT_LOADING_COUNTER Action
axios.interceptors.response.use(
  response => {
   
    return response;
  },
  error => {
    // The response was rejected, turn off the spinning
   
    if (error.response.status === 401) {

      const alertMessage: AlertMessage = {
        content: "Your session expired",
        show_notification: true,
        type: MessageType.ERROR,
    };
    
    store.dispatch(AlertActions.addMessage(alertMessage));
    
    
    }

    return Promise.reject(error);
  }
);

const App: React.FC = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={<InitializingScreen />} persistor ={persistor}>

      <ConnectedRouter history={history}>



          <Container fluid="md">
           <GlobalAlert />
            <Navigation />
            <main role="main">


                        <Switch>
                            <Route exact path="/" component={DashBoard}/>
                            <Route exact path="/report-add" component={ReportForm}/>
                            <Route exact path="/report/edit/:id"  component={ReportForm}/>
                            <Route exact path="/report/:id" component={ReportView}/>
                            <Route exact path="/expenses-add/:id" component={ExpensesForm}/>

                            <Route exact path="/profile" component={ProfileView}/>

                            <Route exact path="/expenses/edit/:id" component={ExpensesForm}/>

                            <Route  exact path="/logout" component={Logout}/>
                        </Switch>

            </main>

            <Footer />

          </Container>

        </ConnectedRouter>
      </PersistGate>

    </Provider>
  );
};

export default App;
