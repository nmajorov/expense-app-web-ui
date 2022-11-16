import { ExchangeQuotesState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ExchangeActions } from "../actions/ExchangeAction";
import { getType } from "typesafe-actions";
import { ExchangeQuote } from "../types/ExchangeQuote";

export const EXCHANGE_QUOTES_INITIAL_STATE: ExchangeQuotesState = {
  quotes:[] 
};

const exchangeQuotesReducer = (
  state: ExchangeQuotesState = EXCHANGE_QUOTES_INITIAL_STATE,
  action: AppAction
): ExchangeQuotesState => {
  const newState: ExchangeQuotesState = {
    ...state
  };
  switch (action.type) {
    case getType(ExchangeActions.fetchExchangeQuotesSuccess):
      newState.quotes = action.payload as Array<ExchangeQuote>;
      break;

    default:
      break;
  }

  return newState;
};

export default exchangeQuotesReducer;
