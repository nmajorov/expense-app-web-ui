
import Keycloak from "keycloak-js";
console.info(`REACT_APP_KEYCLOAK_UR: ${process.env.REACT_APP_KEYCLOAK_URL}`)
export  const keycloak = new Keycloak({
    realm: `${process.env.REACT_APP_KEYCLOAK_REALM}`,
    url: `${process.env.REACT_APP_KEYCLOAK_URL}`,
    clientId: `${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`,
})

export default async function (): Promise<Keycloak> {
    await keycloak.init({ onLoad: "check-sso",  checkLoginIframeInterval: 5 }).catch(() => {
      alert("failed to initialize keycloak");
    });
    return keycloak;
  }
