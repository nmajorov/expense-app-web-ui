import { ActionType, createAction } from 'typesafe-actions';
import {ActionKeys as C} from "../utils"
import { ExchangeQuote } from '../types/ExchangeQuote';


export const ExchangeActions = {
 
    fetchExchangeQuotesSuccess:createAction(C.GET_EXCHANGE_RATES_SUCCESS)<Array<ExchangeQuote>>()
}

export type ExchangeAction = ActionType<typeof ExchangeActions>;