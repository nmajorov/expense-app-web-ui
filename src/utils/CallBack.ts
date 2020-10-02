import React from "react";
import { SSO } from "../types/SSO";
import { AppState } from "../store/Store";
import { withRouter } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../actions/AppAction";
import { connect } from "react-redux";
import {RouteComponentProps} from "react-router-dom";


interface State { }

interface OwnProps extends  RouteComponentProps  {

    sso: SSO;

}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps;

class CallBackComponent extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("do redirect")
        this.props.history.push("/");

    }


    render() {
        return "<></>";
    }
}


const mapStateToProps = (state: AppState) => {
    return {
        sso: state.ssoState.sso,
    };
};

const mapDispatchToProps =
    (dispatch: ThunkDispatch<AppState, void, AppAction>) => ({
        
    });



const decorator = connect(mapStateToProps, mapDispatchToProps);

const CallBack = withRouter(decorator(CallBackComponent));

export default CallBack;
