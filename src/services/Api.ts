import axios from 'axios';

import { HTTP_VERBS } from '../types/Common';
/** API URLs */
import { backEndUrl as url } from '../utils/backendUrl';
import { Expense } from '../types/Expense';
import { Report } from '../types/Report';

const newRequest = <P>(
    method: HTTP_VERBS,
    headers: any,
    url: string,
    queryParams: any,
    data: any
) => {
    return axios.request<P>({
        method: method,
        url: url,
        headers: headers,
        data: data,
        params: queryParams,
    });
};

/**
 * fetch all available expenses
 */
export const fetchExpenses = (token: string, reportID: string,sortBy?:string) => {
    let params = () =>{
      if(sortBy){
        return {reportid:reportID,sort_by:sortBy}
      }else{
        return {reportid:reportID}
      }
    }


    return newRequest<Array<Expense>>(
        HTTP_VERBS.GET,
        {
            Authorization: 'Bearer ' + token,
        },
        `${url}/expenses`,
        params(),
        {}
    );
};

export const deleteExpense = (token: string, ID: string) => {
    return newRequest<Array<any>>(
        HTTP_VERBS.DELETE,
        {
            Authorization: 'Bearer ' + token,
        },
        `${url}/expenses/${ID}`,
        {},
        {}
    );
};

/**
 * add new expense to the system
 *  * @param expense an expense by id
 */
export const addNewExpense = (
    token: string,
    reportID: string,
    expense: Expense
) => {
    return newRequest<Expense>(
        HTTP_VERBS.POST,
        {
            Authorization: 'Bearer ' + token,
        },
        `${url}/expenses`,
        { reportid: reportID },
        expense
    );
};

/**
 * fetch an expense by id
 * @param expenseID an expense by id
 */
export const fetchExpense = (token: string, expenseID) => {
    return newRequest<Expense>(
        HTTP_VERBS.GET,
        {
            Authorization: 'Bearer ' + token,
        },
        `${url}/expenses/${expenseID}`,
        {},
        {}
    );
};

/**
 * add new expense to the system
 *  * @param expense an expense by id
 */
export const updateExpense = (token: string, expense: Expense) => {
    return newRequest<Expense>(
        HTTP_VERBS.PUT,
        {
            Authorization: 'Bearer ' + token,
        },
        `${url}/expenses`,
        {},
        expense
    );
};

/**
 * fetch Reports
 * @param token an OIDC token from a current keycloak session
 */
export const fetchReports = (token: String) => {
    return newRequest<Array<Report>>(
        HTTP_VERBS.GET,
        {
            Authorization: 'Bearer ' + token,
        },
        url + '/reports',
        {},
        {}
    );
};

/**
 * fetch report by id
 * @param token an OIDC token from a current keycloak session
 * @param id the report id
 */
export const fetchOneReport = (token: String, id: String) => {
    return newRequest<Report>(
        HTTP_VERBS.GET,
        {
            Authorization: 'Bearer ' + token,
        },
        url + '/reports/' + id,
        {},
        {}
    );
};

/**
 * update report
 * @param token an OIDC token from a current keycloak session
 * @param report the report to update
 *
 */
export const updateReport = (token: String, report: Report) => {
    return newRequest<Report>(
        HTTP_VERBS.PUT,
        {
            Authorization: 'Bearer ' + token,
        },
        `${url}/reports/`,
        {},
        report
    );
};

/**
 * delete report by id
 * @param token an OIDC token from a current keycloak session
 * @param id the report id
 */
export const deleteReport = (token: String, id: String) => {
    return newRequest<Report>(
        HTTP_VERBS.DELETE,
        {
            Authorization: 'Bearer ' + token,
        },
        url + '/reports/' + id,
        {},
        {}
    );
};

/**
 * fetch Reports
 * @param token an OIDC token from a current keycloak session
 * @param name the name of report
 */
export const addReport = (token: String, name: String) => {
    return newRequest<any>(
        HTTP_VERBS.POST,
        {
            Authorization: 'Bearer ' + token,
        },
        url + '/reports',
        {},
        name
    );
};
