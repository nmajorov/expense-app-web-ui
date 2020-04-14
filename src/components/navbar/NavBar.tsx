//import { Link } from 'react-router/match';
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button , NavItem,Nav} from "react-bootstrap";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalBody from "react-bootstrap/ModalBody";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from "redux-thunk";
import { Version } from "../../types/Version";
import { RhoneAppState } from "../../store/Store";
import { store } from "../../store/ConfigStore";
import { RhoneAction } from "../../actions/RhoneAction";
import {GetVersionActions} from "../../actions/GetVersionAction";
import GetVersionThunkActions from "../../actions/GetVersionThunkAction";
import RhoneAlert from "../Alert";
import { AlertMessage } from "../../types/AlertTypes";

//import GetVersionAction from "../../actions/GetVersionAction";

const faQuestionIcon = <FontAwesomeIcon icon={faQuestion} />;

interface State {}

interface OwnProps {
  version: Version;
  showModal: boolean;
}

interface StateProps {
  alertMessage : AlertMessage
}

interface DispatchProps {
  getVersion: () => any;
  hideOrShowVersionModal: (boolean) => any;
  hideOrShowAlertMessage:() => any;
}

type Props = StateProps & OwnProps & DispatchProps;

/**
 *
 * left side navigation
 */
class NavigationBarContainer extends React.Component<Props, State> {
  constructor(prop: Props) {
    super(prop);
    this.state = {};
  }

  open = () => {
    console.log("open called");
    if (store.getState().versionPopUpState.showModal === false) {
      this.props.getVersion();
    }
  };

  close = () => {
    console.log("close called");
    this.props.hideOrShowVersionModal(false);
  };

  render() {
    return (
      <>
        <Modal
          id="versionPopUp"
          show={this.props.showModal}
          onHide={this.close}
        >
          <ModalHeader closeButton>
            <ModalTitle>Rhone Version</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <div className="row">
              <div className="col-sm">
                Version: {this.props.version.version}
              </div>
              <div className="col-sm">Build: {this.props.version.build}</div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" onClick={this.close}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Navbar className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav>
          <NavItem className="mt-3">
            <RhoneAlert/>
          </NavItem>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#info" onClick={this.showModalWindow}>
                {faQuestionIcon}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }

  showModalWindow = e => {
    e.preventDefault();

    this.open();
  };
}

const mapStateToProps = (state: RhoneAppState) => {
  console.log("mapStateToProps called state: ", state);
  return {
    version: state.versionPopUpState.version,
    showModal: state.versionPopUpState.showModal
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RhoneAppState, void, RhoneAction>
) => ({
  getVersion: () => {
    console.log("mapDispatchToProps: getVersion called");
    dispatch(GetVersionThunkActions.fetchExpenseData());
  }
,
hideOrShowVersionModal : bindActionCreators(GetVersionActions.hideVersion,dispatch)
})
const decorator = connect(mapStateToProps, mapDispatchToProps);

const NavigationBar = decorator(NavigationBarContainer);


export default NavigationBar;
