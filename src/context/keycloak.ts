
import Keycloak, { KeycloakInstance } from "keycloak-js";

export  const keycloak =  Keycloak({
    realm: (process.env.REACT_APP_KEYCLOAK_REALM) ? process.env.REACT_APP_KEYCLOAK_REALM.toString() : "",
    url: process.env.REACT_APP_KEYCLOAK_URL?.toString(),
    clientId: (process.env.REACT_APP_KEYCLOAK_CLIENT_ID) ? process.env.REACT_APP_KEYCLOAK_CLIENT_ID.toString(): "",
})

export default async function (): Promise<KeycloakInstance> {
    await keycloak.init({ onLoad: "check-sso",  checkLoginIframeInterval: 5 }).catch(() => {
      alert("failed to initialize keycloak");
    });
    return keycloak;
  }
