import React from "react";



import { connect } from "react-redux";
import { AppState } from "../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../actions/AppAction";
import { SSO } from "../types/SSO";
import SSOThunkActions from "../actions/SSOThunkActions";
import { store } from "../store/ConfigStore";



interface OwnProps {

    sso: SSO;
}

interface DispatchProps {

    loginSSO: () => any;
    checkLoginDetails: () => any;
    initKeycloak: () => any;
    loadProfile :() => any;
}
type Props = OwnProps & DispatchProps;


class SSOContainer extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        console.log("componentWillMount redux state: "
            + JSON.stringify(store.getState().ssoState.sso));
        if (this.props.sso.isInitialized) {
            if (this.props.sso.authenticated && this.props.sso.userProfile.username !== "unknown") {
                this.props.checkLoginDetails()
            } else {
                this.props.loadProfile()
            }

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

    //  console.log("mapStateToProps called sso state: " +  JSON.stringify(state.ssoState));
    return {
        sso: state.ssoState.sso
    };
};


const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({

    loadProfile:() => {
        dispatch(SSOThunkActions.loadUserProfile());
    },
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
