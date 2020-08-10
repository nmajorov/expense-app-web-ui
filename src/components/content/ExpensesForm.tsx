import React, { FormEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
import { Expense } from "../../types/Expense";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {convertStrToAmount,convertAmountToStr,
  formatDateStr,formateStrToDate} from "../../utils"
import { AppState } from "../../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../../actions/AppAction";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";


type OwnProps = RouteComponentProps<{ id: string}>;

interface AppOwnProps {
  editExpenseId?: string
};

interface DispatchProps  {
  
    //expense loaded from backend
    currentInputExpense: Expense;
    loadExpense:(id:string) => any;
    saveExpense:(expense:Expense) => any;
    updateExpense:(expense:Expense)=>any;
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

  private handleDescriptionChange = event =>{
     let description = event.target.value as String;
    
    if (description.length>3){
       this.props.currentInputExpense.description =   event.target.value;
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
  private handleAmountChange = event => {
    
    console.log("set new amount value:" + event.target.value)
    
    try{
        let amount = convertStrToAmount(event.target.value);
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
           //keep previous value  
           changedAmount: event.target.value
          }
          
        )

     this.props.currentInputExpense.amount = event.target.value;
     }
   
  };

  private handleDateChange(date:string) {
    console.log("new-date: " + date)
    
    let changedDate= formatDateStr(date)
 

    this.props.currentInputExpense.createdAT = changedDate;
    this.setState(
      {isDateValid:true}
    );
  };

  private handleSubmit(event: FormEvent) {
    event.preventDefault(); 
   // console.log("handleSubmit: " + JSON.stringify(this.state.currentInputExpense));
    if (this.state.isAmountValid && this.state.isDescriptionValid 
      && this.state.isDateValid){
       


      if (this.props.editExpenseId){
        //send to update
       this.props.updateExpense(this.props.currentInputExpense);
      }else{
        // some clean up for timestamp
        this.props.currentInputExpense.tstamp = undefined;
        //save new 
        this.props.saveExpense(this.props.currentInputExpense);
      }
      //
      this.props.history.push("/");
    }
  }


  componentDidMount() {
    console.log("componentDidMount started")
    let id = this.props.editExpenseId;
    if (id) {
      //edit expense
      //load expense from backend
      this.props.loadExpense(id);
     
      this.setState({
        //amount loaded from database is correct
        isDescriptionValid: true,
        isAmountValid: true
      })

    } else {
      //handle add expense
      this.setState({
        isDescriptionValid: false,
      })

      if (!this.props.currentInputExpense.createdAT) {
        let newDateStr = (function (): string {
          let date = new Date();
          return date.toString()
        }());

        this.props.currentInputExpense.createdAT = formatDateStr(newDateStr);
      }

    }
  }



  render() {

    console.log("render started " + this.state.changedAmount);
    

    return (

    
      <div id="addForm">
   
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
                      className="form-control form-control-user"
                      contentEditable
                      id="Description"
                      defaultValue={this.props.currentInputExpense.description}
                      onChange={this.handleDescriptionChange}
                      isValid={this.state.isDescriptionValid}
                      isInvalid={!this.state.isDescriptionValid}
                      placeholder="description"
                      aria-label="Description"
                    />
                   
                   
                     </Form.Group>
                     </div>
                     <Form.Group>
                    <div className="col-sm-3">
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
      </div>
    );
  }
}


const mapStateToProps = (state: AppState,ownProps:Props ) => {
  
  console.log("state: " + JSON.stringify(state.expensesState.newExpense));
  return {
    editExpenseId: ownProps.match.params.id,
    currentInputExpense: state.expensesState.newExpense
  };
};


const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({
  saveExpense: (expense: Expense) => {
     dispatch(ExpensesThunkActions.addNewExpense(expense));
     dispatch(ExpensesThunkActions.fetchExpensesData());
  },
  loadExpense: (id: string) => {
    dispatch(ExpensesThunkActions.fetchOneExpense(id));
   
  },
  updateExpense: (expense: Expense) => {
    dispatch(ExpensesThunkActions.updateExpense(expense));
    
  }

})

const ExpensesForm = withRouter(
  connect<Props>(mapStateToProps, mapDispatchToProps)(ExpensesFormContainer)
);

export {ExpensesForm};