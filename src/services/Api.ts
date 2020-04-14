import axios, { AxiosError } from 'axios';

import { HTTP_VERBS } from '../types/Common';
/** API URLs */
import {backEndUrl as url} from "../utils/backendUrl";
import { Version } from '../types/Version';
import { Project } from '../types/Project';
import {Build} from '../types/Build';

export const ANONYMOUS_USER = 'anonymous';

export interface Response<T> {
  data: T;
}




const newRequest = <P>(method: HTTP_VERBS, url: string, queryParams: any, data: any) =>{


  console.log("method: " + method);
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

**/


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

export const getRhoneVersion = () => {
  return newRequest<Version>(HTTP_VERBS.GET, url + "/version", {}, {});
};

/**
 * fetch all available projects
 * 
 */
export const fetchProjects = () => {
  return newRequest<Array<Project>>(HTTP_VERBS.GET,url + "/projects",{},{})
}

/**
 * fetch all available projects
 * 
 */
export const deleteProject = (projectID:string) => {
  return newRequest<Array<Project>>(HTTP_VERBS.POST,url + "/project/delete",{},{id:projectID})
}


export const getBuildsForProject = (projectID:string) => {
   return newRequest<Array<Build>>(HTTP_VERBS.GET,url+"/project/builds/" + projectID ,{},{})
}

export const fetchProject= (projectID) =>{
  return newRequest<Project>(HTTP_VERBS.GET,url+ "/project/show/"  +projectID,{},{})
}

export const callStartBuild= (projectID) => {
  return newRequest(HTTP_VERBS.POST,url + "/project/run",{id:projectID},{})
}