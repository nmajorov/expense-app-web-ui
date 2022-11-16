import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/Store';
import { AppAction } from './AppAction';
import { ExchangeActions } from './ExchangeAction';
import * as API from '../services/Api';
import { AlertActions } from './AlertAction';
import { AlertMessage, MessageType } from '../types/AlertTypes';
// import { sendEvent } from '../utils/EventProducer';

const ExchangeThunkAction = {
   

    fetchQuotesData: () => {
        return (dispatch: ThunkDispatch<AppState, undefined, AppAction>) => {
            return API.fetchExchangeQuotes().then(
                (response) => {
                    console.debug("fetched  quotes data: " + JSON.stringify(response.data))
                    dispatch(ExchangeActions.fetchExchangeQuotesSuccess(response.data));
                    
                },
                (error) => {
                    let emsg: string;
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error
                    ) {
                        emsg =
                            'Cannot load the quotes: ' +
                            error.response.data.error;
                    } else {
                        emsg = 'Cannot load the quotes: ' + error.toString();
                    }

                    
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
