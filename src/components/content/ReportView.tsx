import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Button, Container , Row,Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalBody from 'react-bootstrap/ModalBody';
import { AppState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";

import ReportThunkActions from "../../actions/ReportThunkActions";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";
import { AlertMessage, MessageType } from "../../types/AlertTypes";
import { AlertActions } from "../../actions/AlertAction";
import { useEffect } from "react";
import { Expense } from "../../types/Expense";

const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit} />;
const arrovUpIcon = <FontAwesomeIcon icon={faArrowUp} />;
const arrovDownIcon = <FontAwesomeIcon icon={faArrowDown} />;

// 




const ReportView = () => {

  const { authenticated, expenses, token, reportID } = useSelector(
    (state: AppState) => {
      console.log("use selector expenses: " +
        JSON.stringify(state.expensesState.expenses));

      return {
        authenticated: state.ssoState.sso.authenticated,
        token: state.ssoState.sso.token,
        expenses: state.expensesState.expenses,
        reportID: state.router.location.pathname.replace('/report/', '')
      };
    }
  );

  const dispatch = useDispatch();




  // very important statements for use effect hook
  // https://stackoverflow.com/questions/56410369/can-i-call-separate-function-in-useeffect
  useEffect(() => {

    if (authenticated) {
      console.log("viewing report id: " + reportID);

      const loadMessage: AlertMessage = {
        content: 'loading data ',
        show_notification: true,
        type: MessageType.INFO,
      };

      dispatch(AlertActions.addMessage(loadMessage));
      dispatch(ExpensesThunkActions.fetchExpensesData(token, reportID));

    }


  }, [dispatch]);


  return (
    <>

      {
        expenses.length > 0 ? renderTable(expenses) : emptyPlaceHolder()
      }

    </>

    //    renderTable(expenses)
  );

};


/**
 * Render  empty placeholder if no expenses assigned to report
 * 
 * @returns JSX empty placeholder
 */
function emptyPlaceHolder() {
  return (
    <Container fluid="md" className="mt-3">
  <Row>
    <Col>    <p>There is no expenses in this report.</p> </Col>
  </Row>
</Container>


  );
}

function renderTable(expenses: Expense[]) {
  return (
    /**
    * render table with expenses
    */


    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#   <button onClick={() => sortBy("id_asc")}>{arrovUpIcon}</button>
                            &nbsp;  &nbsp;
                    <button onClick={() => sortBy("id_desc")}>{arrovDownIcon}</button></th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date  <button onClick={() => sortBy("created_asc")}>{arrovUpIcon}</button>
                              &nbsp;  &nbsp;
                      <button onClick={() => sortBy("created_desc")}>{arrovDownIcon}</button>
            </th>
            <th>Last Modified</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((pr) => {
            return (
              <tr key={pr.id.toString()}>
                <td>{pr.id}</td>
                <td>{pr.description}</td>
                <td>{pr.amount}</td>
                <td>{pr.createdAT}</td>
                <td>{pr.tstamp}</td>
                <td>
                  <Button
                    onClick={() => callEdit(pr.id)}
                  >
                    {editIcon}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => { openDeleteModalWindow(pr.id) }}
                    variant="danger">
                    {trashIcon}
                  </Button>
                  {renderDeleteDialog()}
                </td>
              </tr>
            );
          })}
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
            <td>
              <b>Total:</b>
            </td>
            <td>&#8203;</td>
            <td>
              <b>{calculateTotalAmount} </b>
            </td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
          </tr>
        </tbody>
      </Table>
    </>);
}

/**
   * trigger load of expenses from backend
   */
// const loadExpensesFromBackend = () => {


// dispatch(AlertActions.addMessage(loadMessage));
//  dispatch(ExpensesThunkActions.startFetching());


// dispatch(ReportThunkActions.fetchOneReport(sso,reportID))
//  dispatch(ExpensesThunkActions.stopFetching());
//}


const closeDeleteModalWindow = () => {
  // console.log("closeDeleteModalWindow called");
  // this.props.hideOrShowDeleteModal();
};

const openDeleteModalWindow = (id) => {
  //     if (!store.getState().expensesState.showModal) {
  //       this.props.hideOrShowDeleteModal(id);
  //   }
};

function callEdit(id: Number): void {
  throw new Error("Function not implemented.");
}

// const [id, setId] = React.useState<String | null>(null);

/**
    * sort expenses by id
    */
const sortBy = (sort: string) => {
  // this.props.startLoading();
  // this.props.getExpenses(this.props.sso, this.props.reportid,sort);
}


const renderDeleteDialog = () => {
  return (

    <Modal
      id="versionPopUp"
      show={() => {
        return false;
        // showModal
      }
      }
      onHide={() => {

        console.info("close modal");
        //  closeDeleteModalWindow
      }}
    >
      <ModalHeader translate closeButton>
        <ModalTitle>
          Delete Expense {
            // selectedExpenseID
          }
        </ModalTitle>
      </ModalHeader>

      <ModalBody>Are you sure ?</ModalBody>

      <ModalFooter>
        <Button
          variant="secondary"
          onClick={
            () => { }// closeDeleteModalWindow
          }
        >
          Close
              </Button>
        <Button
          variant="danger"
          onClick={() => { }
            //  deleteExpense(/**selectedExpenseID**/)
          }
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
const deleteExpense = (id) => {
  // this.closeDeleteModalWindow();
  // this.props.deleteExpense(this.props.sso, id);
};

const calculateTotalAmount = () => {
  /**
    const amountArray = this.props.expenses.map((pr) => {
        return pr.amount;
    });
  
    const numOr0 = (n) => (isNaN(n) ? 0 : n);
  
    return amountArray
        .reduce(function (acc, val) {
            return numOr0(acc) + numOr0(val);
        }, 0)
        .toFixed(2);
  
   **/
}

export default ReportView;


