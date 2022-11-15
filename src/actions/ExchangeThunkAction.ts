import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/Store';
import { Expense } from '../types/Expense';
import { AppAction } from './AppAction';
import { ExpensesActions } from './ExpensesAction';
import * as API from '../services/Api';
import { AlertActions } from './AlertAction';
import { AlertMessage, MessageType } from '../types/AlertTypes';
import { SSO } from '../types/SSO';
import { sendEvent } from '../utils/EventProducer';

const ExchangeThunkAction = {
   

    fetchQuotesData: () => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.fetchExchangeQuotes().then(
                (response) => {
                    const objArray = response.data;
                    
                    // console.log("fetched data: " + JSON.stringify(data))
                    dispatch(ExpensesActions.fetchActionSuccess(objArray));
                    
                },
                (error) => {
                    let emsg: string;
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error
                    ) {
                        emsg =
                            'Cannot load the expenses: ' +
                            error.response.data.error;
                    } else {
                        emsg = 'Cannot load the expenses: ' + error.toString();
                    }

                    dispatch(ExpensesActions.fetchError(emsg));
                    const alertMessage: AlertMessage = {
                        content: emsg,
                        show_notification: true,
                        type: MessageType.ERROR,
                    };
                    // remove if any
                    dispatch(AlertActions.addMessage(alertMessage));
                }
            );
        };
    },


    
};

export default ExchangeThunkAction;
