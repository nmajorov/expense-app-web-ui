import keycloak from "../keycloak";

/**
 * define status of user login in sso
 */
export interface SSO  {
   
    //keycloak object 
    keycloak: typeof keycloak;
    //check if keycloak object initialized
    // avoid additional initializations and as result not authenticated user
    isInitialized : boolean;
}