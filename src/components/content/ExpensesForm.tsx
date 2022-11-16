
import { Button, Form, Row, Container, DropdownButton, Dropdown} from "react-bootstrap";
import { Expense } from "../../types/Expense";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {connect} from "react-redux";
import { convertAmountToStr, convertStrToAmount, formatDateStr, formateStrToDate, exchange } from "../../utils";
import { AppState } from "../../store/Store";
// import {ThunkDispatch} from "redux-thunk";
// import {AppAction} from "../../actions/AppAction";
// import ExpensesThunkActions from "../../actions/ExpensesThunkActions";
// import { Report } from "../../types/Report";
// import { SSO } from "../../types/SSO";
// import ReportThunkActions from "../../actions/ReportThunkActions";
import { RouteComponentProps, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";
import { ExchangeQuote } from "../../types/ExchangeQuote";
import ExchangeThunkAction from "../../actions/ExchangeThunkAction";


type IdParams = { id: string };

/**
 *
 * main content wrapper
 */
export const ExpensesForm =  (routerProps: RouteComponentProps<IdParams>) => {

  const history = useHistory();
  const dispatch = useDispatch();


  // const [id, setId] = useState<String | null>(null);

  const [description, setDescription] = useState("");
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [createdAT, setCreatedAT] = useState(formatDateStr(new Date()));
  const [isDateValid, setIsDateValid] = useState(true);
  const [isEdit, setIsEdit] = useState(false);



  /**
   * get values from global  application state
   * 
   */
  const { sso, expense ,exchangeQuotes} = useSelector(
    (state: AppState) => {
        // console.log("use selector ExpensesForm: " +
        //  JSON.stringify(state.expensesState.newExpense));
          
      return {
        sso: state.ssoState.sso,
        expense:state.expensesState.newExpense,
        exchangeQuotes: state.exchangeQuotesState.quotes,
     };
    }
  );








  /**
    * change description of item
    * @param event change text field event
    */
  const handleDescriptionChange = event => {
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
  const handleAmountChange = event => {

    
    try {
      
      // 1 check if number
      convertStrToAmount(event.target.value);
      
      // 2. check number after comma  
       
      const stringy = (event.target.value).split(".")[1]
      if (stringy !== undefined && stringy.length > 2) {
         setIsAmountValid(false)
      }else{
        setIsAmountValid(true)
      }
      setAmount(event.target.value);

    } catch {
       console.debug("error new amount value:" + event.target.value)
      /**
       * catch exception if amount is not correct
       */
      setIsAmountValid(false)
      setAmount(event.target.value);
    }
  };


  const handleDateChange = (date: string) => {
    // console.debug("new-date: " + date)

    setCreatedAT(formatDateStr(date));
    setIsDateValid(true)

  };


 /**
   * handel form submit
   * @param event  a submitted form event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (sso.authenticated) {
    
      if (isEdit) {
        const expenseId= routerProps.match.params.id.trim();
        const expense:Expense = {id: Number(expenseId),amount:convertStrToAmount(amount),description,createdAT:createdAT};
        dispatch(ExpensesThunkActions.updateExpense(sso.token, expense));

      } else {
       
        const reportId= routerProps.match.params.id.trim();
        const expense:Expense = {id:NaN,amount:convertStrToAmount(amount),description,createdAT:createdAT};
        // console.info(`add expense ${JSON.stringify(expense)} to report ${reportId}`)
        dispatch(ExpensesThunkActions.addNewExpense(sso, reportId,expense));
       }
  
       history.push("/");
      
    }
  }


  /**
   * 
   * exchange amount with given rate 
   *  
   * @param eventKey exchange currency pair 
   */
  const handleRateSelect = (eventKey) => {
  
    console.log("call convert to:" + eventKey + " amount: " + amount)
    exchangeQuotes.forEach(element => {
      if (element.currencyPair === eventKey){
          const convertedAmount = exchange(element.quote, convertStrToAmount(amount))
          setAmount(convertAmountToStr(convertedAmount));
      }
    });
    
  }

  /**
   * render drop down with currency conversion
   * @returns Dropdown menu
   */
  const renderExchangeDropDown = () => { 
      return (
        
          <DropdownButton disabled={!isAmountValid || exchangeQuotes.length === 0} id="dropdown-fx-btn" 
                onSelect={handleRateSelect} title="Exchange Rate Conversion">
                 {exchangeQuotes.map((eq) => { 
                    return(
                     <Dropdown.Item key={eq.id} eventKey={eq.currencyPair}>{eq.currencyPair}</Dropdown.Item>
                  );}
                  )
                }
          </DropdownButton>
      );
  };




   /**
   * hook to render
   */
    useEffect(() => {
      if (sso.authenticated) {
        
        if (!(history.location.pathname.match("expenses-add"))) {
          // we adding the report
          setIsEdit(true);
          dispatch(
            ExpensesThunkActions.fetchOneExpense(sso.token, routerProps.match.params.id)
           );

        }

        // fetch quotes
        dispatch(
          ExchangeThunkAction.fetchQuotesData()
        );
       
      }
    }, [dispatch]);

    useEffect(() => {
      if (expense.id > 0){
        setDescription(expense.description);
        setIsDescriptionValid(true);
        setAmount(convertAmountToStr(expense.amount));
        setIsAmountValid(true);
        setCreatedAT(expense.createdAT);
      }

    }, [expense]);



  const renderForm = () => { return (


    <Container key="addForm" className="mt-5">

      <Row>
        <div className="col-lg-6">
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                {isEdit? "Edit": "Add"} Expense
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
                      onChange={handleDescriptionChange}
                      isValid={isDescriptionValid}
                      isInvalid={!isDescriptionValid}
                      placeholder="description"
                      aria-label="Description"
                    />


                  </Form.Group>
                </div>
                <Form.Group>
                  <div className="col-sm-5 mt-4">
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
                <Form.Group>
                  <div className="col-sm-5 mt-4">
                  
                    {renderExchangeDropDown()}

                  </div>
                </Form.Group>

              
                <div className="col-sm-6 mt-4">
                  <Form.Label>Date of Expenses</Form.Label>
                  <Form.Group controlId="expensesDate">
                    <Form.Group controlId="expensesDate">

                      <DatePicker selected={formateStrToDate(createdAT)} id="datepicker"
                        dateFormat="yyyy-MM-dd"
                        className={isDateValid ? "form-control is-valid" : "form-control is-invalid"}
                        onChange={handleDateChange} />

                    </Form.Group>


                  </Form.Group>
                </div>


                <Form.Group>
                  <div className="col-sm-3 mt-5">
                    <Button type="submit" disabled={!((isAmountValid && isDateValid && isDescriptionValid))}>Submit</Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );}



  return (<>{ 
  
    renderForm()

  }</>);
}





