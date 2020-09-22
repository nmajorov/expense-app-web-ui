import React from "react";
import { AppState } from "../store/Store";
import { connect } from "react-redux";
// import { store } from "../store/ConfigStore";
import {AlertMessage,MessageType} from "../types/AlertTypes"
import { Alert, Spinner } from "react-bootstrap";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../actions/AppAction";
import { AlertActions } from "../actions/AlertAction";
import { TimeInMilliseconds } from "../types/Common";

interface State {showAlert: boolean}


interface StateProps {
  message:AlertMessage
}

interface DispatchProps {
  closeAlert:() => any;
  pollInterval: TimeInMilliseconds;
}

type Props = StateProps & DispatchProps;


const typeVariant = (type: MessageType) => {
  switch (type) {
    case MessageType.ERROR:
      return 'danger';
    case MessageType.INFO:
      return 'info';
    case MessageType.SUCCESS:
      return 'success';
    case MessageType.WARNING:
      return 'warning';
    default:
      throw Error('Unexpected type');
  }
};



/**
 * define global alert
 */
class AlertContainer extends React.PureComponent<Props, State> {
  private showTimeoutRef?: number;
  constructor(props:Props) {
    super(props);
    this.state = {
      showAlert:false
    };
  }


   
  componentDidMount() {
   
  }
 
  componentDidUpdate(prev: Props) {
   // const curr = this.props;
    if (this.props.message.show_notification){
        this.scheduleHideInterval(2000)
    }
    
  }

  componentWillUnmount() {
    this.removeAutoHideTimer();
  }


    /**
   * trigger load of expenses from backend
   */
  private hideAlert = () => {
    console.log("hideAlert called !")
    this.props.closeAlert()
  };

  /**
   * schedule hide interval for the alert
   * alert doesn't have a auto hide interval
   */
  private scheduleHideInterval(hideInterval: number){

      // Remove any pending timeout to avoid having multiple requests at once
      this.removeAutoHideTimer();
      if (typeVariant(this.props.message.type) === "danger"){
        //don't set hide interval for error
        return;
      }
      // We are using setTimeout instead of setInterval because we have more control over it
      // e.g. If a request takes much time, the next interval will fire up anyway and is
      // possible that it will take much time as well. Instead wait for it to timeout/error to
      // try again.
      console.log("alert set hide alert timeout: " + hideInterval)
      this.showTimeoutRef = window.setTimeout(
        this.hideAlert,
        hideInterval
      );
  }


  private removeAutoHideTimer() {
    if (this.showTimeoutRef) {
      clearTimeout(this.showTimeoutRef);
      this.showTimeoutRef = undefined;
    }
  }

  private renderSpinner() {
    
      if (this.props.message.content.startsWith("loading data")){

        return( <Spinner
               as="span"
               animation="border"
               size="sm"
               role="status"
               aria-hidden="true"
             />
           )
        }else{
         return( <></>)
        }
    
}


  render() {
   

    console.log("alert render  this.props.message.show_notification " + this.props.message.show_notification)
    return (
      <>
            <Alert key="e" show={this.props.message.show_notification} variant={typeVariant(this.props.message.type)}
               onClose={() => this.props.closeAlert()} dismissible>
                 <p>
                   
                   {this.props.message.content}
                   {this.renderSpinner()}
                   </p>
            </Alert>
    </>
    
    )
  }

}


const mapStateToProps  = (state: AppState) => {
  console.log("alert mapStateToProps called state" + JSON.stringify(state))
  return {
    message : state.alertState.alertMessage,
    pollInterval: state.expensesState.pollInterval
  }
}


const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, void, AppAction>
 
) => ({
  closeAlert: ()=> {
    dispatch(AlertActions.removeMessage())

  }
});



const decorator = connect(mapStateToProps, mapDispatchToProps);

const GlobalAlert = decorator(AlertContainer);

export default GlobalAlert;