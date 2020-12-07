
import Keycloak, { KeycloakInstance } from "keycloak-js";

export  const keycloak =  Keycloak({
    realm: `${process.env.REACT_APP_KEYCLOAK_REALM}`,
    url: `${process.env.REACT_APP_KEYCLOAK_URL}`,
    clientId: `${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`,
})

export default async function (): Promise<KeycloakInstance> {
    await keycloak.init({ onLoad: "check-sso",  checkLoginIframeInterval: 5 }).catch(() => {
      alert("failed to initialize keycloak");
    });
    return keycloak;
  }
