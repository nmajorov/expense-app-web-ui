import React from "react";
import { AppState } from "../store/Store";
import { connect } from "react-redux";
// import { store } from "../store/ConfigStore";
import {AlertMessage,MessageType} from "../types/AlertTypes"
import { Alert, Toast } from "react-bootstrap";

interface State {showAlert: boolean}


interface StateProps {
  message:AlertMessage
}

interface DispatchProps {
 
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

  constructor(props:Props) {
    super(props);
    this.state = {
      showAlert:false
    };
  }


   
  componentDidMount() {
   
  }
 
  componentDidUpdate() {
    console.log("Alert componentDidUpdate this.props.message.show_notification " + this.props.message.show_notification)
    if (this.props.message.show_notification){
      this.setState({
        showAlert: true
      })
    }else{
      this.setState({
        showAlert: false
      })
    }
  }


  render() {
   

    const toggleShowA = () => this.setState({showAlert:false});
    return (
      <>
      <Toast onClose={toggleShowA} show={this.state.showAlert}>
      <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            <Alert key="e" variant={typeVariant(this.props.message.type)}>
                 <p>{this.props.message.content}</p>
            </Alert>
          </Toast.Body>
        </Toast>
    </>
    
    )
  }

}


const mapStateToProps  = (state: AppState) => {
  console.log("alert mapStateToProps called")
  return {
    message : state.alertState.alertMessage
  }
}


const mapDispatchToProps = (
 
) => ({
 
});



const decorator = connect(mapStateToProps, mapDispatchToProps);

const GlobalAlert = decorator(AlertContainer);

export default GlobalAlert;