import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { AppState } from "./store/Store";
import { ALERT_MESSAGE_INITIAL_STATE } from './reducers/AlertMessagesReducer';
import { EXPENSES_INITIAL_STATE } from './reducers/ExpensesReducer';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initialStore: AppState = {
  alertState: ALERT_MESSAGE_INITIAL_STATE,
  expensesState: EXPENSES_INITIAL_STATE
  
}

const store = mockStore(initialStore)


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});



