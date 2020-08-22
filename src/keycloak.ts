/* keycloak initialisation */

import Keycloak from "keycloak-js";

export  const keycloak =  Keycloak({
    realm: (process.env.REACT_APP_KEYCLOAK_REALM) ? process.env.REACT_APP_KEYCLOAK_REALM.toString() : "",
    url: process.env.REACT_APP_KEYCLOAK_URL?.toString(),
    clientId: (process.env.REACT_APP_KEYCLOAK_CLIENT_ID) ? process.env.REACT_APP_KEYCLOAK_CLIENT_ID.toString(): "",
})
export default keycloak;