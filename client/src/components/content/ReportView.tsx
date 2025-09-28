import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faEdit,
    faArrowUp,
    faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { AppState } from '../../store/Store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmDialogModal } from './ConfirmDialog.tsx';
import ExpensesThunkActions from '../../actions/ExpensesThunkActions.ts';
import { AlertMessage, MessageType } from '../../types/AlertTypes.ts';
import { AlertActions } from '../../actions/AlertAction.ts';
import { useContext, useEffect, useState } from 'react';
import { Expense } from '../../types/Expense.ts';
import { useNavigate as useHistory } from 'react-router-dom';

import { useSecurity } from '../../context/SecurityContext.tsx';
import { expensesSelector } from "../../selectors/ExpensesSelector.ts";
import { reportIDSelector, routerSelector } from "../../selectors/RouterSelector.ts";

const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit} />;
const arrovUpIcon = <FontAwesomeIcon icon={faArrowUp} />;
const arrovDownIcon = <FontAwesomeIcon icon={faArrowDown} />;

//

const ReportView = () => {

         const { isAuthenticated, user } = useSecurity();
         const expenses = useSelector(expensesSelector);
        const reportID = useSelector(reportIDSelector);


    
    // const { authenticated, expenses, sso, reportID, expensesChanged } =
    //     useSelector((state: AppState) => {
    //         // console.log("use selector expenses: " +
    //         //   JSON.stringify(state.expensesState.expenses));

    //         return {
    //             expenses: state.expensesState.expenses,
    //             expensesChanged: state.expensesState.changed,
    //             reportID: state.router.location.pathname.replace(
    //                 '/report/',
    //                 ''
    //             ),
    //         };
    //     });

    const dispatch = useDispatch();
    const history = useHistory();

    const [deleteExpenseDialogOpen, setDeleteExpenseDialogOpen] =
        useState(false);

    const [toDeleteId, setToDeleteId] = useState(Number.NaN);

    const startLoading = () => {
        const loadMessage: AlertMessage = {
            content: 'loading data ',
            show_notification: true,
            type: MessageType.INFO,
        };

        dispatch(AlertActions.addMessage(loadMessage));
    };

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
        console.log('delete expense: ' + toDeleteId);
        if (!Number.isNaN(toDeleteId)) {
            dispatch(ExpensesThunkActions.deleteExpense(user?.token, toDeleteId));
        }

        history('/report/' + reportID);
    };

    /**
     * load expenses to report
     */
    const loadExpenses = () => {
        startLoading();
        dispatch(ExpensesThunkActions.fetchExpensesData(user?.token, reportID));
    };

    
    /**
     * sort expenses by id
     */
    const sortBy = (sort: string) => {
        startLoading();
        dispatch(
            ExpensesThunkActions.fetchExpensesData(user?.token, reportID, sort)
        );
    };

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
    };

   

      if (!isAuthenticated) {
          history('/');
      } else {
         // loadExpenses();

          /**
           * render view
           */
          return (
              <Container fluid="md" className="mt-3">
                  <Row>
                      <Col>
                          {expenses.length > 0
                              ? renderTable(expenses)
                              : emptyPlaceHolder()}
                      </Col>
                  </Row>
              </Container>
          );
      }


    /**
     * Render  empty placeholder if no expenses assigned to report
     *
     * @returns JSX empty placeholder
     */
    function emptyPlaceHolder() {
        return <p>There is no expenses in this report.</p>;
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
                    titleKey="Delete this item ?"
                    open={deleteExpenseDialogOpen}
                    continueButtonVariant="danger"
                    messageKey="Are you sure you want to delete this item ?"
                    toggleDialog={openDeleteModalWindow}
                    onConfirm={deleteExpense}
                ></ConfirmDialogModal>
                
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                #{' '}
                                <Button onClick={() => sortBy('id_asc')}>
                                    {arrovUpIcon}
                                </Button>
                                &nbsp; &nbsp;
                                <Button onClick={() => sortBy('id_desc')}>
                                    {arrovDownIcon}
                                </Button>
                            </th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>
                                Date{' '}
                                <Button onClick={() => sortBy('created_asc')}>
                                    {arrovUpIcon}
                                </Button>
                                &nbsp; &nbsp;
                                <Button onClick={() => sortBy('created_desc')}>
                                    {arrovDownIcon}
                                </Button>
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
                                        <Button onClick={() => callEdit(pr.id)}>
                                            {editIcon}
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                setToDeleteId(pr.id.valueOf());
                                                openDeleteModalWindow();
                                            }}
                                            variant="danger"
                                        >
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
