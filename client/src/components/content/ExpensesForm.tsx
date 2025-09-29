import { Button, Form, Row, Container } from 'react-bootstrap';
import { Expense } from '../../types/Expense.ts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import {connect} from "react-redux";
import {
    convertAmountToStr,
    convertStrToAmount,
    formatDateStr,
    formateStrToDate,
} from '../../utils/index.ts';
import { AppState } from '../../store/Store.ts';

import {
    useNavigate as useHistory,
} from 'react-router-dom';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpensesThunkActions from '../../actions/ExpensesThunkActions.ts';
   import { useSecurity } from '../../context/SecurityContext.tsx';
import { expensesSelector } from '../../selectors/ExpensesSelector.ts';
import { formatDateISOStr } from '../../utils/DateConverter.ts';
type ExpenseParams = { 
    id?: number
    isEdit:boolean
    reportId?:number
};

/**
 *
 * main content wrapper
 */
export const ExpensesForm = ({id,isEdit,reportId}:ExpenseParams) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {expenses} = useSelector(expensesSelector);

    const { isAuthenticated, user } = useSecurity();

    // const [id, setId] = useState<String | null>(null);

    const [description, setDescription] = useState('');
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);

    const [amount, setAmount] = useState('');
    const [isAmountValid, setIsAmountValid] = useState(false);
    const [createdAT, setCreatedAT] = useState(formatDateStr(new Date()));
    const [isDateValid, setIsDateValid] = useState(true);
    



    // const { sso, expense } = useSelector((state: AppState) => {
    //     console.log(
    //         'use selector ExpensesForm: ' +
    //             JSON.stringify(state.expensesState.newExpense)
    //     );

    //     return {
    //         sso: state.ssoState.sso,
    //         expense: state.expensesState.newExpense,
    //     };
    // });

    /**
     * change description of item
     * @param event change text field event
     */
    const handleDescriptionChange = (event) => {
        const description = event.target.value as string;

        setDescription(description);

        if (description.length > 3) {
            setIsDescriptionValid(true);
        } else {
            setIsDescriptionValid(false);
        }
    };

    /***
     * handle amount changes on the field
     */
    const handleAmountChange = (event) => {
        console.log('set new amount value:' + event.target.value);

        try {
            const amountAsNumber = convertStrToAmount(event.target.value);
            console.log('amount value:' + amountAsNumber);
            setIsAmountValid(true);
            setAmount(event.target.value);
        } catch {
            console.log('error new amount value:' + event.target.value);
            /**
             * throwing exception if amount is not correct
             */
            setIsAmountValid(false);
            setAmount(event.target.value);
        }
    };

    const handleDateChange = (date: string) => {
        console.log('new-date: ' + date);

        setCreatedAT(formatDateStr(date));
        setIsDateValid(true);
    };

    /**
     * handel form submit
     * @param event  a submitted form event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isAuthenticated) {
            if (isEdit) {
                  
                    const expense: Expense = {
                    id: Number(id),
                    amount: convertStrToAmount(amount),
                    description,
                    createdAT: createdAT +"T20:22:00.467444548+02:00",
                     
                };
                dispatch(
                    ExpensesThunkActions.updateExpense(user?.token, expense)
                );
            } else {
                
                //call to iso string to be compliant with golang time
                // https://pkg.go.dev/time
                const expense: Expense = {
                    id: NaN,
                    amount: convertStrToAmount(amount),
                    description,
                    //TODO put it to separate utils method
                    createdAT: createdAT +"T20:22:00.467444548+02:00"
                };
                console.info(
                    `add expnense ${JSON.stringify(expense)} to report ${reportId}`
                );
                dispatch(
                    ExpensesThunkActions.addNewExpense(user?.token, reportId, expense)
                );
            }

            history('/');
        }
    };

    /**
     * hook to render
     */
    useEffect(() => {
        if (isAuthenticated) {
                if (isEdit && id !== undefined){
                    const exp = expenses?.find((e) => e.id === id);
                    if (exp !== undefined){
                        setDescription(exp.description);
                        setIsDescriptionValid(true);
                        setAmount(convertAmountToStr(exp.amount));
                        setIsAmountValid(true);
                        setCreatedAT(formatDateISOStr( exp.createdAT));
                        
                    }
                }           
            }
        }, []);

    // useEffect(() => {
    //     if (expense.id > 0) {
    //         setDescription(expense.description);
    //         setIsDescriptionValid(true);
    //         setAmount(convertAmountToStr(expense.amount));
    //         setIsAmountValid(true);
    //         setCreatedAT(expense.createdAT);
    //     }
    // }, [expense]);

    const renderForm = () => {
        return (
            <Container key="addForm" className="mt-5">
                <Row>
                    <div className="col-lg-6">
                        <div className="card shadow mb-3">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">
                                    {isEdit ? 'Edit' : 'Add'} Expense
                                </h6>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={handleSubmit}>
                                    <div className="col-sm-10">
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                className="form-control"
                                                contentEditable
                                                id="Description"
                                                value={description}
                                                onChange={
                                                    handleDescriptionChange
                                                }
                                                isValid={isDescriptionValid}
                                                isInvalid={!isDescriptionValid}
                                                placeholder="description"
                                                aria-label="Description"
                                            />
                                        </Form.Group>
                                    </div>
                                    <Form.Group>
                                        <div className="col-sm-5">
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control
                                                className="form-control"
                                                contentEditable
                                                id="amount"
                                                onChange={handleAmountChange}
                                                value={amount}
                                                placeholder="0.00"
                                                aria-label="amount"
                                                isValid={isAmountValid}
                                                isInvalid={!isAmountValid}
                                            />
                                        </div>
                                    </Form.Group>

                                    <div className="col-sm-6">
                                        <Form.Label>
                                            Date of Expenses
                                        </Form.Label>
                                        <Form.Group controlId="expensesDate">
                                            <Form.Group controlId="expensesDate">
                                                <DatePicker
                                                    selected={formateStrToDate(
                                                        createdAT
                                                    )}
                                                    id="datepicker"
                                                    dateFormat="yyyy-MM-dd"
                                                    className={
                                                        isDateValid
                                                            ? 'form-control is-valid'
                                                            : 'form-control is-invalid'
                                                    }
                                                    onChange={handleDateChange}
                                                />
                                            </Form.Group>
                                        </Form.Group>
                                    </div>

                                    <Form.Group>
                                        <div className="col-sm-3">
                                            <Button
                                                type="submit"
                                                disabled={
                                                    !(
                                                        isAmountValid &&
                                                        isDateValid &&
                                                        isDescriptionValid
                                                    )
                                                }
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        );
    };

    return <>{renderForm()}</>;
};
