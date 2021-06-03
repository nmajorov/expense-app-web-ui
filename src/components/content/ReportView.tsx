import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Button, Container, Row, Col } from 'react-bootstrap';
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
import { useEffect, useState } from "react";
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


  const [deleteExpenseDialogOpen, setDeleteExpenseDialogOpen] = useState(false);

  const startLoading = () => {
    const loadMessage: AlertMessage = {
      content: 'loading data ',
      show_notification: true,
      type: MessageType.INFO,
    };

    dispatch(AlertActions.addMessage(loadMessage));

  }

  const openDeleteModalWindow = (id) => {
    setDeleteExpenseDialogOpen(!deleteExpenseDialogOpen);
  };



  function callEdit(id: Number): void {
    throw new Error("Function not implemented.");
  }


    /**
     * sort expenses by id
     */
  const sortBy =(sort:string) => {
    startLoading()
    dispatch(ExpensesThunkActions.fetchExpensesData(token, reportID, sort));
  }

  const  calculateTotalAmount =(expenses: Expense[]) => {
    const amountArray = expenses.map((pr) => {
        return pr.amount;
    });

    const numOr0 = (n) => (isNaN(n) ? 0 : n);

    return amountArray
        .reduce(function (acc, val) {
            return numOr0(acc) + numOr0(val);
        }, 0)
        .toFixed(2);
}



  // very important statements for use effect hook
  // https://stackoverflow.com/questions/56410369/can-i-call-separate-function-in-useeffect
  useEffect(() => {

    if (authenticated) {
      console.log("viewing report id: " + reportID);

      startLoading()
      dispatch(ExpensesThunkActions.fetchExpensesData(token, reportID));

    }


  }, [dispatch]);



 /**
  * render view 
  */
 return (
  <Container fluid="md" className="mt-3">
  <Row>
  <Col>
      {
        expenses.length > 0 ? renderTable(expenses) : emptyPlaceHolder()
      }
      </Col>
     </Row>
    </Container>

  );





/**
 * Render  empty placeholder if no expenses assigned to report
 * 
 * @returns JSX empty placeholder
 */
function emptyPlaceHolder() {
  return (<p>There is no expenses in this report.</p>);
}


/**
 * 
 * Render all expenses of report
 * 
 * @param expenses expense of report
 * @returns JSX element table with expenses
 */
function renderTable(expenses: Expense[]) {
  return (

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
              <b>{ calculateTotalAmount(expenses)} </b>
            </td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
            <td>&#8203;</td>
          </tr>
        </tbody>
      </Table>
 );
}



};
export default ReportView;


