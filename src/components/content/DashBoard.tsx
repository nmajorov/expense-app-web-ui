import React from "react";
import Table from 'react-bootstrap/Table'
import { AppState } from "../../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppAction } from "../../actions/AppAction";
import {TimeInMilliseconds} from "../../types/Common";
import { Expense } from "../../types/Expense";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";
import { store } from "../../store/ConfigStore";
import { Button,  Jumbotron, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalBody from "react-bootstrap/ModalBody";
import Modal from "react-bootstrap/Modal";
import {RouteComponentProps} from "react-router-dom";
import { withRouter } from "react-router-dom";

import { SSO } from "../../types/SSO";
import SSOThunkActions from "../../actions/SSOThunkActions";
import { AlertMessage, MessageType } from "../../types/AlertTypes";
import { AlertActions } from "../../actions/AlertAction";


const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit}/>;

type ProjectsStates = {};

interface OwnProps extends  RouteComponentProps {
  expenses: Array<Expense>;
  showModal: boolean;
  selectedExpenseID: number;
  isAuthenticated?:boolean;
}

interface StateProps {
  sso: SSO
}

interface DispatchProps {
  getExpenses: () => any;
  showLoading:() => any;
  stopShowLoading:()=>any;
  startLoading:() => any;
  isLoading:boolean;
  deleteExpense: (id:number) => any;
  pollInterval: TimeInMilliseconds;
  setLastRefreshAt: (lastRefreshAt: TimeInMilliseconds) => void;
  hideOrShowDeleteModal:(id?:number) => any;
  checkSSO: () => any;
}

type Props = StateProps & OwnProps & DispatchProps;

/**
 * dashboard for projects
 *
 */
class DashBoardContainer extends React.Component<Props, ProjectsStates> {
  private pollTimeoutRef?: number;

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    console.log("dashboard did mount called")
    if (this.props.sso.authenticated){
      //run only if authenticated !!
        this.scheduleNextPollingInterval(0);
     
    }else{
      console.log("user is not authenticated")
    }
  }

  componentWillUnmount() {
    this.removePollingIntervalTimer();
  }

  componentDidUpdate(prev: Props) {
    console.log("update dashboard loading in progress: "+  this.props.isLoading )
   
    // schedule an immediate  fetch if needed
    if (this.props.sso.authenticated) {
     

       const curr = this.props;
       console.log("curr.pollInterval: " + curr.pollInterval + "  prevPoolInt: " + prev.pollInterval )
     
      this.scheduleNextPollingInterval(curr.pollInterval);
     
    }
  }

  private scheduleNextPollingInterval(pollInterval: number) {
  
    if (pollInterval === 0 || pollInterval === undefined) {
      this.loadExpensesFromBackend();
    } else {

    
      // Remove any pending timeout to avoid having multiple requests at once
      this.removePollingIntervalTimer();
      // We are using setTimeout instead of setInterval because we have more control over it
      // e.g. If a request takes much time, the next interval will fire up anyway and is
      // possible that it will take much time as well. Instead wait for it to timeout/error to
      // try again.
      this.pollTimeoutRef = window.setTimeout(
        this.loadExpensesFromBackend,
        pollInterval
      );
    }
  }

  private removePollingIntervalTimer() {
    if (this.pollTimeoutRef) {
      ///console.log("clear previous timeout:" + this.pollTimeoutRef)
      clearTimeout(this.pollTimeoutRef);
      this.pollTimeoutRef = undefined;
    }
  }

  /**
   * trigger load of expenses from backend
   */
  private loadExpensesFromBackend = () => {
      
    this.props.startLoading();
    this.props.getExpenses();
  
  };

  private closeDeleteModalWindow = () => {
    //console.log("closeDeleteModalWindow called");
    this.props.hideOrShowDeleteModal();
  };

  private openDeleteModalWindow = (id) => {
    //console.log("openDeleteModalWindow called " + this.props.showModal);
    if (!store.getState().expensesState.showModal) {
      this.props.hideOrShowDeleteModal(id);
    }
  };
  

  private callEdit = (id) => {
    //console.log("call Edit " + id);
    this.props.history.push(`/edit/${id}`)
  };




  private renderDeleteDialog() {
    return (
      <Modal
        id="versionPopUp"
        show={this.props.showModal}
        onHide={this.closeDeleteModalWindow}
      >
        <ModalHeader closeButton>
          <ModalTitle>Delete Expense {this.props.selectedExpenseID}</ModalTitle>
        </ModalHeader>

        <ModalBody>Are you sure ?</ModalBody>

          <ModalFooter>
          <Button variant="secondary" onClick={this.closeDeleteModalWindow}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => this.deleteExpense(this.props.selectedExpenseID)}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  /**
   * trigger delete of expense by id
   *
   */
  private deleteExpense = (id) => {
    this.closeDeleteModalWindow();
    this.props.deleteExpense(id);
  };

  private calculateTotalAmount (){
 
    let amountArray=  this.props.expenses.map((pr) => {
       return pr.amount;
    });

    let numOr0 = n => isNaN(n) ? 0 : n


    return (amountArray.reduce(function(acc, val) { return  (numOr0(acc) + numOr0(val)) }, 0)).toFixed(2);

  }


  private renderExpenses() {
  
    return (this.props.expenses.length > 0 ? (
      this.renderExpensesTable()
    ) : (
        <p>There is no expenses found</p>
      )
    )

  }

  /**
   * render table with expenses
   */
  private renderExpensesTable() {
    return (
      <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Created</th>
            <th>Last Modified</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
      
          {this.props.expenses.map((pr) => 
              {
                  return (
                    
                    <tr key={pr.id.toString()}>
                      <td>{pr.id}</td>
                      <td>{pr.description}</td>
                      <td>{pr.amount}</td>
                      <td>{pr.createdAT}</td>
                      <td>{pr.tstamp}</td>
                      <td>
                      <Button onClick={() => this.callEdit(pr.id)}>{editIcon}</Button>
                      </td>
                    <td>
                        <Button
                          onClick={() => this.openDeleteModalWindow(pr.id)}
                          variant="danger"
                        >
                          {trashIcon}
                        </Button>
                        {this.renderDeleteDialog()}
                      </td>
                      </tr>
                  );
              } 
            )
          }
          <tr>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td>&#8203;</td>
            <td><b>{ this.calculateTotalAmount()} </b></td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
          </tr>
        </tbody>
      </Table>
      </>
    );
  }

  /**
   * render element on the page
   */
  render() {
    return (
      
      
          this.props.sso.authenticated ? (
            this.renderExpenses()
          ) : (
            <Jumbotron>
            <Container>
              <h3>Better travel and expense management.</h3>
              <h3>On OpenShift 4!</h3>
              <p>
                This is an example of application running on OpenShift.
              </p>
            </Container>
          </Jumbotron>
            )
      
     
    );
  } //end of render
}

const mapStateToProps = (state: AppState) => {
  console.log("state.expensesState.isLoading: "+ state.expensesState.isLoading)
  return {

    expenses: state.expensesState.expenses,
    pollInterval: state.expensesState.pollInterval,
    showModal: state.expensesState.showModal,
    selectedExpenseID: state.expensesState.selectedID,
    sso: state.ssoState.sso,
    isLoading: state.expensesState.isLoading
    };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({
  
  startLoading: () =>{
    let loadMessage: AlertMessage = {
      content: "loading data ",
      show_notification: true,
      type: MessageType.INFO
    }
  
    dispatch(AlertActions.addMessage(loadMessage))
    dispatch(ExpensesThunkActions.startFetching())
  },
 
  getExpenses: () => {
    dispatch(ExpensesThunkActions.fetchExpensesData());
  },
  deleteExpense: (id:number) => {
    dispatch(ExpensesThunkActions.deleteExpense(id))
    dispatch(ExpensesThunkActions.fetchExpensesData());
  },

  hideOrShowDeleteModal: (id:number) =>{ 
    dispatch(ExpensesThunkActions.showDeleteDialog(id));
  },

  checkSSO: () =>{
    dispatch(SSOThunkActions.initKeycloak()) ;
  }
  });



const decorator = connect(mapStateToProps, mapDispatchToProps);

const DashBoard = withRouter(decorator(DashBoardContainer));

export default DashBoard;
