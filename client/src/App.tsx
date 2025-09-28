import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes as Switch } from 'react-router-dom';
import { Container } from 'npm:react-bootstrap';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { ConnectedRouter } from 'connected-react-router';

import { history, persistor, store } from './store/ConfigStore.ts';
import GlobalAlert from './components/Alert.tsx';
import ProfileView from './components/content/ProfileView.tsx';
import ReportView from './components/content/ReportView.tsx';
import { ReportForm } from './components/content/ReportForm.tsx';
import { LoginForm } from './components/content/LoginForm.tsx';
import { AlertActions } from './actions/AlertAction.ts';
import { AlertMessage, MessageType } from './types/AlertTypes.ts';
import { ExpensesForm } from './components/content/ExpensesForm.tsx';
import Footer from './components/footer/index.tsx';

import DashBoard from './components/content/DashBoard.tsx';
import { NavigationBar as Navigation } from './components/navbar/NavBar.tsx';
import './index.css';
import { SecurityProvider } from './context/SecurityContext.tsx';
import { AddExpense, EditExpense, Expense } from "./components/content/Expenses.tsx";

// intercept all Axios responses and dispatch the DECREMENT_LOADING_COUNTER Action
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        // The response was rejected, turn off the spinning
        if (error.response === undefined || error.response.status === 401) {
            const alertMessage: AlertMessage = {
                content: 'Your session expired',
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
            <SecurityProvider>
                <PersistGate
                   
                    persistor={persistor}
                >
                    <ConnectedRouter history={history}>
                        <Container fluid="md">
                            <GlobalAlert />
                            <Navigation />
                            <main role="main" className="ml-20">
                                <Switch>
                                    <Route
                                        index
                                        path="/"
                                        element={<DashBoard />}
                                    />
                                    <Route
                                        path="/login"
                                        element={<LoginForm />}
                                    />

                                    <Route
                                        path="/report-add"
                                        element={<ReportForm />}
                                    />

                                    <Route
                                        path="/report/edit/:id"
                                        element={<ReportForm />}
                                    />
                                    <Route
                                        path="/report/:id"
                                        element={<ReportView />}
                                    />
                                    <Route
                                        path="/expenses/add/:id"
                                        element={<AddExpense/>}
                                    />

                                    <Route
                                        path="/profile"
                                        element={<ProfileView />}
                                    />

                                    <Route
                                        path="/expenses/edit/:id"
                                        element={<EditExpense />}
                                    />

                                    {/* <Route
                                        path="/logout"
                                        element={<Logout/>}
                                    /> */}
                                </Switch>
                            </main>

                            <Footer />
                        </Container>
                    </ConnectedRouter>
                </PersistGate>
            </SecurityProvider>
        </Provider>
    );
};

export default App;
