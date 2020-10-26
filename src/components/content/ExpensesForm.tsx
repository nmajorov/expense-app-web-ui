import React, {FormEvent} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Button, Form, Row, Container} from "react-bootstrap";
import {Expense} from "../../types/Expense";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {convertAmountToStr, convertStrToAmount, formatDateStr, formateStrToDate} from "../../utils"
import {AppState} from "../../store/Store";
import {ThunkDispatch} from "redux-thunk";
import {AppAction} from "../../actions/AppAction";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";
import { Report } from "../../types/Report";
import { SSO } from "../../types/SSO";


type OwnProps = RouteComponentProps<{ id: string}>;

interface AppOwnProps {
  editExpenseId?: string
  report:Report; //report there expence belong
}

interface DispatchProps  {

    // expense loaded from backend
    currentInputExpense: Expense;
    loadExpense:(id:string) => any;
    saveExpense: (sso:SSO,reportID:string,expense: Expense) => any;
    updateExpense:(expense:Expense)=>any;
    sso:SSO;
}


type FormState = {
  isDescriptionValid ?:boolean;
  isAmountValid:boolean;
  isDateValid: boolean;
 // currentInputExpense:Expense;

  // iso date for temporary save the datepicker component
  isoDateInput:string;
  changedAmount: string;
};

type Props =  DispatchProps & OwnProps & AppOwnProps;


/**
 * main content wrapper
 */
class ExpensesFormContainer extends React.Component<Props, FormState> {
  constructor(props: Props) {
    super(props);
    this.state={
      changedAmount: "0.0",
      isoDateInput:"",
      isAmountValid:false,
      isDateValid:true
    }
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    /**
     * change description of item
     * @param event change text field event
     */
    private readonly handleDescriptionChange = event =>{
        const description = event.target.value as string;
        this.props.currentInputExpense.description =   description;
        if (description.length>3){
            this.setState(
                {
                    isDescriptionValid:true
                }
            );
        }else{
            this.setState(
                {

                    isDescriptionValid:false
                }
            );
        }
    };


  /***
   * handle amount changes on the field
   */
  private readonly handleAmountChange = event => {

    console.log("set new amount value:" + event.target.value)

    try{
        const amount = convertStrToAmount(event.target.value);
      //  console.log("amount value:" + amount)
        this.setState({
            isAmountValid: true,
            changedAmount: "" + amount
          }
        )

        this.props.currentInputExpense.amount = amount;


      }catch{
        console.log("error new amount value:" + event.target.value)

        /**
         * throwing exception if amount is not correct
         */
          this.setState( {
           isAmountValid: false,
           // keep previous value
           changedAmount: event.target.value
          }

        )

     this.props.currentInputExpense.amount = event.target.value;
     }

  };

  private handleDateChange(date:string) {
    console.log("new-date: " + date)

  this.props.currentInputExpense.createdAT = formatDateStr(date);
    this.setState(
      {isDateValid:true}
    );
  };

  private handleSubmit(event: FormEvent) {
    event.preventDefault();
   // console.log("handleSubmit: " + JSON.stringify(this.state.currentInputExpense));
    if (this.state.isAmountValid && this.state.isDescriptionValid
      && this.state.isDateValid){

        let expense = this.props.currentInputExpense;

      if (this.props.editExpenseId){
        // send to update
       this.props.updateExpense(expense);
      }else{
        // some clean up for timestamp
        this.props.currentInputExpense.tstamp = undefined;
        // save new
        let sso= this.props.sso;
        let report_id =  this.props.report.id.toString();
        this.props.saveExpense(sso,report_id,expense);
      }
      //
      this.props.history.push(`/report/${this.props.report.id}`);
    }
  }


  componentDidMount() {
    console.log("componentDidMount started")
    const id = this.props.editExpenseId;
    if (id) {
      // edit expense
      // load expense from backend
      this.props.loadExpense(id);

      this.setState({

        // amount loaded from database is correct
        isDescriptionValid: true,
        isAmountValid: true
      })

    } else {
        this.props.currentInputExpense.description="";
      // handle add expense
      this.setState({
        isDescriptionValid: false,
      })


        const newDateStr = (function (): string {
          const date = new Date();
          return date.toString()
        }());

        this.props.currentInputExpense.createdAT = formatDateStr(newDateStr);


    }
  }



  render() {
    return (


      <Container key="addForm">

        <Row>
          <div className="col-lg-6">
            <div className="card shadow mb-3">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  { this.props.editExpenseId ? "Edit": "Add"}  Expense
                </h6>
              </div>
              <div className="card-body">
                <Form onSubmit={this.handleSubmit}>
                <div className="col-sm-10">
                  <Form.Group>

                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      className="form-control"
                      contentEditable
                      id="Description"
                      value={this.props.currentInputExpense.description}
                      onChange={this.handleDescriptionChange}
                      isValid={this.state.isDescriptionValid}
                      isInvalid={!this.state.isDescriptionValid}
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
                      onChange={this.handleAmountChange}
                      value={  this.props.editExpenseId ?
                         convertAmountToStr(this.props.currentInputExpense.amount):
                         this.state.changedAmount
                        }

                      placeholder="0.0"
                      aria-label="amount"
                      isValid={this.state.isAmountValid}
                      isInvalid={!this.state.isAmountValid}
                    />
                   </div>
                    </Form.Group>

                    <div className="col-sm-6">
                    <Form.Label>Date of Expenses</Form.Label>
                    <Form.Group controlId="expensesDate">

                        <DatePicker selected={formateStrToDate(this.props.currentInputExpense.createdAT)} id="example-datepicker"
                        dateFormat="yyyy-MM-dd"
                        className={ this.state.isDateValid ? "form-control is-valid":"form-control is-invalid"}
                        onChange={this.handleDateChange}/>

                    </Form.Group>
                    </div>


                    <Form.Group>
                      <div className="col-sm-3">
                      <Button type="submit">Submit</Button>
                      </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = (state: AppState,ownProps:Props ) => {
  return {
    editExpenseId: ownProps.match.params.id,
    currentInputExpense: state.expensesState.newExpense,
    report:state.reportsState.reports.length === 1 ? state.reportsState.reports[0]:undefined,
    sso: state.ssoState.sso
  };
};


const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({
  saveExpense: (sso:SSO,reportID:string,expense: Expense) => {
  //    dispatch(ExpensesThunkActions.fetchExpensesData());
      dispatch(ExpensesThunkActions.addNewExpense(sso,reportID,expense));

  },
  loadExpense: (id: string) => {
      console.info("load expense with id: " + id)
    dispatch(ExpensesThunkActions.fetchOneExpense(id));

  },
  updateExpense: (expense: Expense) => {
    //  dispatch(ExpensesThunkActions.fetchExpensesData());
      dispatch(ExpensesThunkActions.updateExpense(expense));
  }

})

const ExpensesForm = withRouter(
  connect<Props>(mapStateToProps, mapDispatchToProps)(ExpensesFormContainer)
);

export {ExpensesForm};
