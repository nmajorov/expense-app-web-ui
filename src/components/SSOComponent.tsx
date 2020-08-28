import React from "react";

// import { store } from "../store/ConfigStore";
import { AlertMessage, MessageType } from "../types/AlertTypes"
import { Alert } from "react-bootstrap";

import { connect } from "react-redux";
import { AppState } from "../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../actions/AppAction";
import { SSO } from "../types/SSO";
import SSOThunkActions from "../actions/SSOThunkActions";
import { store } from "../store/ConfigStore";
interface State { }



interface OwnProps {

    sso: SSO;
}

interface DispatchProps {

    loginSSO: () => any;
    checkLoginDetails: () => any;
    initKeycloak: () => any;
}
type Props = OwnProps & DispatchProps;


class SSOContainer extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("componentDidMount redux state: " 
            + JSON.stringify(store.getState().ssoState.sso.isInitialized));

        if (this.props.sso.isInitialized) {
            this.props.checkLoginDetails()
        } else {
            this.props.initKeycloak()
        }

    }

    render() {
        return (<>
            {this.props.children}
        </>
        )

    }



}


const mapStateToProps = (state: AppState, ownProps: Props) => {

    console.log("mapStateToProps called sso state: " +  JSON.stringify(state.ssoState));
    return {
        sso: state.ssoState.sso
    };
};


const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({


    checkLoginDetails: () => {
        console.info("check login Details  called");

    },

    initKeycloak: () => {
        console.info("run keycloak initialization")
        dispatch(SSOThunkActions.initKeycloak());
    }

})


const decorator = connect(mapStateToProps, mapDispatchToProps);

const SSOComponent = decorator(SSOContainer);


export default SSOComponent;
