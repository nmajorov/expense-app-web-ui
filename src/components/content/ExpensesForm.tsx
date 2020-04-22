import React, { FormEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
import { Expense } from "../../types/Expense";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {convertStrToAmount,convertAmountToStr,formatDate,formateDateStr} from "../../utils"
import { AppState } from "../../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../../actions/AppAction";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";




interface DispatchProps extends RouteComponentProps  {
  
    /** selected id of expenses to edit from route */
    editExpenseId: string;
    //expense loaded from backend
    currentInputExpense:Expense;
    loadExpense:(id:string) => any;
    saveExpense:(expense:Expense) => any;
}


type FormState = {
  isDescriptionValid:boolean;
  isAmountValid:boolean;
  isDateValid: boolean;
 // currentInputExpense:Expense;
  
  // iso date for temporary save the datepicker component
  isoDateInput:string; 

};

type Props = DispatchProps 


/**
 * main content wrapper
 */
class ExpensesForm extends React.Component<Props, FormState> {
  constructor(props: Props) {
    super(props);
    this.state={
      
      isoDateInput:"",
      isAmountValid:false,
      isDescriptionValid:false,
      isDateValid:false
    }
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleDescriptionChange = event =>{
    let expense = this.props.currentInputExpense;
     expense.description = event.target.value;
    
    if (expense.description.length>3){
      this.setState(
        {
         // currentInputExpense: expense,
          isDescriptionValid:true
        }
      );
    }else{
      this.setState(
        {
         // currentInputExpense: expense,
          isDescriptionValid:false
        }
      );
    }
   
  };

  private handleAmountChange = event => {
    let previousState = this.state;
    
    console.log("set new amount value:" + event.target.value)
    try{
          let amount =  convertStrToAmount(event.target.value);

        //previousState.currentInputExpense.amount = amount

        this.setState({
            isAmountValid: true
          }
        )

    
      }catch{
        
        /**
         * throwing exception if amount is not correct
         */
        this.setState( {
          isAmountValid: false
        }
        )

     
     }
   
  };

  private handleDateChange(date:string) {
    console.log("new-date: " + date)
    let previousState = this.state;
   
    // previousState.currentInputExpense.createdAT = formatDate(date)
    this.setState(
        {isoDateInput:date, isDateValid:true}
      );
  };

  private handleSubmit(event: FormEvent) {
    event.preventDefault(); 
   // console.log("handleSubmit: " + JSON.stringify(this.state.currentInputExpense));
    if (this.state.isAmountValid && this.state.isDescriptionValid 
      && this.state.isDateValid){
      //this.props.saveExpense(this.state.currentInputExpense);
      //this.props.history.push("/");
    }
  }


  componentDidMount(){
    console.log("componentDidMount started")
    let id = this.props.editExpenseId;
    if (id){
      //load expense from backend
      this.props.loadExpense(id);
    }

  }



  render() {
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
                      value={convertAmountToStr(this.props.currentInputExpense.amount)}
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
                      
                        <DatePicker selected={this.state.isoDateInput} id="example-datepicker" 
                        dateFormat="yyyy/MM/dd"
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


const mapStateToProps = (state: AppState) => {
  
  
  return {
    currentInputExpense: state.addEditExpenseState.newExpense
  };
};


const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({
  saveExpense: (expense:Expense) => {
    console.log("saveExpense: " + JSON.stringify(expense));

    dispatch(ExpensesThunkActions.addNewExpense(expense));
  },
  loadExpense: (id:string) =>{
    dispatch(ExpensesThunkActions.fetchOneExpense(id));
  }
})

const decorator = connect(mapStateToProps, mapDispatchToProps);

export default decorator(ExpensesForm);
