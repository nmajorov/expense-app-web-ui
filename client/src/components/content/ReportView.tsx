import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { AppState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialogModal } from "./ConfirmDialog";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";
import { AlertMessage, MessageType } from "../../types/AlertTypes";
import { AlertActions } from "../../actions/AlertAction";
import { useContext, useEffect, useState } from "react";
import { Expense } from "../../types/Expense";
import { useHistory } from "react-router";
import { SecurityContext } from "../../context/SecurityContext";



const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit} />;
const arrovUpIcon = <FontAwesomeIcon icon={faArrowUp} />;
const arrovDownIcon = <FontAwesomeIcon icon={faArrowDown} />;

// 




const ReportView = () => {
  const keycloak = useContext(SecurityContext);
  const { authenticated, expenses, sso, reportID , expensesChanged} = useSelector(
    (state: AppState) => {
     // console.log("use selector expenses: " +
     //   JSON.stringify(state.expensesState.expenses));

      return {
        authenticated: state.ssoState.sso.authenticated,
        sso: state.ssoState.sso,
        expenses: state.expensesState.expenses,
        expensesChanged: state.expensesState.changed,
        reportID: state.router.location.pathname.replace('/report/', '')
      };
    }
  );

  const dispatch = useDispatch();
  const history = useHistory();


  const [deleteExpenseDialogOpen, setDeleteExpenseDialogOpen] = useState(false);

  const [toDeleteId,setToDeleteId]= useState(Number.NaN);



  const startLoading = () => {
    const loadMessage: AlertMessage = {
      content: 'loading data ',
      show_notification: true,
      type: MessageType.INFO,
    };

    dispatch(AlertActions.addMessage(loadMessage));

  }

  const openDeleteModalWindow = () => {
    setDeleteExpenseDialogOpen(!deleteExpenseDialogOpen);
  };



  function callEdit(id: Number): void {
    history.push(`/expenses/edit/${id}`);
  }


  /**
     * trigger delete of expense by id
     *
     */
  const deleteExpense = () => {
    console.log("delete expense: " + toDeleteId);
    if (!Number.isNaN(toDeleteId)){
      dispatch(ExpensesThunkActions.deleteExpense(sso.token,toDeleteId));
    }

    history.push("/report/"+ reportID)

  };


  /**
   * load expenses to report
   */
  const loadExpenses =() =>{
    startLoading()
    dispatch(ExpensesThunkActions.fetchExpensesData(sso.token, reportID));

  } 

  /**
   * sort expenses by id
   */
  const sortBy = (sort: string) => {
    startLoading()
    dispatch(ExpensesThunkActions.fetchExpensesData(sso.token, reportID, sort));
  }

  const calculateTotalAmount = (expenses: Expense[]) => {
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
      keycloak.updateToken(30).then(function () {
        loadExpenses();
      }).catch(function () {
        console.error('Failed to refresh token');
      });

      
    }

  // use sso if client reload the page manually from browser
  }, [authenticated,expensesChanged,dispatch,keycloak]);



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
      <>
        <ConfirmDialogModal
          continueButtonLabel="yes"
          titleKey={"Delete this item ?"}
          open={deleteExpenseDialogOpen}
          continueButtonVariant={'danger'}
          toggleDialog={openDeleteModalWindow}
          onConfirm={deleteExpense}
        >
        </ConfirmDialogModal>
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
                      onClick={() => {
                                      setToDeleteId(pr.id.valueOf());
                                      openDeleteModalWindow()
                                    }}
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
                <b>{calculateTotalAmount(expenses)} </b>
              </td>
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



};
export default ReportView;


