export interface UserProfile {
    email: string;
    username: string;
}

/**
 * define status of user login in sso
 */
export interface SSO {
    // keycloak object
    // keycloak:  Keycloak.KeycloakInstance;
    // check if keycloak object initialized
    // avoid additional initializations and as result not authenticated user
    userProfile: UserProfile;
    isInitialized: boolean;
    authenticated: boolean;
    token: string;
}
