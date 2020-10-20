import React from "react";
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
                            <Route exact path="/expenses-add" component={ExpensesForm}/>

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
