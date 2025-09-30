
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faEdit,
    faArrowUp,
    faArrowDown,
    faUtensilSpoon,
} from '@fortawesome/free-solid-svg-icons';

import Table from 'react-bootstrap/Table';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { AppState } from '../../store/Store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmDialogModal } from './ConfirmDialog.tsx';
import ExpensesThunkActions from '../../actions/ExpensesThunkActions.ts';
import { AlertMessage, MessageType } from '../../types/AlertTypes.ts';
import { AlertActions } from '../../actions/AlertAction.ts';
import { use, useContext, useEffect, useState } from 'react';
import { Expense } from '../../types/Expense.ts';
import { NavLink, useNavigate as useHistory, useParams } from 'react-router-dom';

import { useSecurity } from '../../context/SecurityContext.tsx';
import { expensesSelector } from '../../selectors/ExpensesSelector.ts';
import { reportSelector } from "../../selectors/ReportSelector.ts";


const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit} />;
const arrovUpIcon = <FontAwesomeIcon icon={faArrowUp} />;
const arrovDownIcon = <FontAwesomeIcon icon={faArrowDown} />;




const ReportView = ()  => {
    const { isAuthenticated, user } = useSecurity();
    const {expenses} = useSelector(expensesSelector);
    const { id } = useParams();
    const reportID =Number(id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [deleteExpenseDialogOpen, setDeleteExpenseDialogOpen] =
        useState(false);

    const [toDeleteId, setToDeleteId] = useState(Number.NaN);

    const { reports } = useSelector(reportSelector);



     if (isNaN(reportID)) {
        // If the ID is not a number, redirect to a "Not Found" page
         history('/');
         return null; // Don't render anything in this component
    }

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
        history(`/expenses/edit/${id}`);
    }

    /**
     * trigger delete of expense by id
     *
     */
    const deleteExpense = () => {
        console.log('delete expense: ' + toDeleteId);
        if (!Number.isNaN(toDeleteId)) {
            dispatch(
                ExpensesThunkActions.deleteExpense(user?.token, toDeleteId)
            );
        }

        loadExpenses();
    };


    useEffect(() => {
        loadExpenses();
    }, []);

  
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

    function getReportByID(){
     
        if (reports !== undefined) {
            for (const report of reports) {
                if (report.id === reportID) {
                    return report;
                }
            }
        }
      
    }

    if (!isAuthenticated || reports === undefined || reports.length === 0){
        history('/');
    } else {
        console.log("reportID: " + JSON.stringify(reportID));
        
        /**
         * render view
         */
        return (
            
         
            <Container fluid="md" className="mt-3">
                <Row>
                    <Col>
                        <h4>Report: {getReportByID()?.name}</h4>
                    </Col>
                    </Row>
                <Row className="mt-2">
                    <Col>
                    <Button variant="primary"  onClick={() => history('/expenses/add/' + reportID)}>
                             Add Expense
                        </Button>
                    </Col>  
                </Row>   
                <Row className="mt-3">   
                    <Col>
                        {(expenses !== undefined && expenses.length> 0)
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

        return (
            <p>There is no expenses in this report.</p>
          
        );
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
                            <th>Amount{' '}
                                <Button onClick={() => sortBy('amount_asc')}>
                                    {arrovUpIcon}
                                </Button>
                                &nbsp; &nbsp;
                                <Button onClick={() => sortBy('amount_desc')}>
                                    {arrovDownIcon}
                                </Button>
                            </th>
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
                                    <td>{pr.UpdatedAt}</td>
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
