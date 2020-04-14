import React from "react";
import { RhoneAppState } from "../store/Store";
import { connect } from "react-redux";
import { store } from "../store/ConfigStore";
import {AlertMessage,MessageType} from "../types/AlertTypes"
import { Alert } from "react-bootstrap";

interface State {}

interface OwnProps {
  showAlert: boolean;
}

interface StateProps {
  message:AlertMessage
}

interface DispatchProps {
 
}

type Props = StateProps & OwnProps & DispatchProps;


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
    this.state = {};
  }


   
  componentDidMount() {
    
  }


  render() {
    return (
    <Alert key="e" variant={typeVariant(this.props.message.type)}  show={this.props.message.show_notification}>
           <p>{this.props.message.content}</p>
     </Alert>
    )
  }

}


const mapStateToProps  = (state: RhoneAppState) => {
  return {
    message : state.alertState.alertMessage
  }
}


const mapDispatchToProps = (
 
) => ({
 
});



const decorator = connect(mapStateToProps, mapDispatchToProps);

const RhoneAlert = decorator(AlertContainer);

export default RhoneAlert;