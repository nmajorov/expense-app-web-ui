import axios from 'axios';

import { HTTP_VERBS } from '../types/Common';
/** API URLs */
import {backEndUrl as url} from "../utils/backendUrl";
import { Expense } from '../types/Expense';

//export const ANONYMOUS_USER = 'anonymous';

export interface Response<T> {
  data: T;
}




const newRequest = <P>(method: HTTP_VERBS, url: string, queryParams: any, data: any) =>{

 return axios.request<P>({
    method: method,
    url: url,
    data: data,
  //  headers: getHeaders(),
    params: queryParams
  });

}

/** 
export const getAppHealth = (
  namespace: string,
  app: string,
  durationSec: number,
  hasSidecar: boolean
): Promise<AppHealth> => {
  const params = durationSec ? { rateInterval: String(durationSec) + 's' } : {};
  return newRequest(HTTP_VERBS.GET, urls.appHealth(namespace, app), params, {}).then(response =>
    AppHealth.fromJson(response.data, { rateInterval: durationSec, hasSidecar: hasSidecar })
  );
};



export const getErrorMsg = (msg: string, error: AxiosError) => {
  let errorMessage = msg;
  if (error && error.response) {
    if (error.response.data && error.response.data.error) {
      errorMessage = `${msg}, Error: [ ${error.response.data.error} ]`;
    } else if (error.response.statusText) {
      errorMessage = `${msg}, Error: [ ${error.response.statusText} ]`;
      if (error.response.status === 401) {
        errorMessage += ' Has your session expired? Try logging in again.';
      }
    }
  }
  return errorMessage;
};
**/



/**
 * fetch all available expenses  
 */
export const fetchExpenses = () => {
  return newRequest<Array<Expense>>(HTTP_VERBS.GET,url,{},{})
}


export const deleteExpense = (ID:string) => {
  return newRequest<Array<any>>(HTTP_VERBS.DELETE,url + "/" + ID ,{},{})
}



/**
 * add new expense to the system  
 *  * @param expenseID an expense by id
 */
export const addNewExpense= (expense:Expense) =>{
  return newRequest<Expense>(HTTP_VERBS.POST,url,{},expense)
}


/**
 * fetch an expense by id
 * @param expenseID an expense by id
 */
export const fetchExpense= (expenseID) =>{
  return newRequest<Expense>(HTTP_VERBS.GET,url+ "/"  +expenseID,{},{})
}


