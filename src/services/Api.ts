import axios from 'axios';

import { HTTP_VERBS } from '../types/Common';
/** API URLs */
import {backEndUrl as url} from "../utils/backendUrl";
import { Expense } from '../types/Expense';



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
 *  * @param expense an expense by id
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

/**
 * add new expense to the system  
 *  * @param expense an expense by id
 */
export const updateExpense= (expense:Expense) =>{
  return newRequest<Expense>(HTTP_VERBS.PUT,url,{},expense)
}




