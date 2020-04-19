import React, { FormEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Button, Row, FormGroup } from "react-bootstrap";
import { Expense } from "../../types/Expense";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {convertStrToAmount} from "../../utils"

interface FormProps extends RouteComponentProps {

}

type FormState = {
  expense: Expense
  isAmountValid:boolean
};



/**
 * main content wrapper
 */
class AddExpensesForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { expense: { amount: 0.0, createdAT: "", description:"",tstamp:""},
      isAmountValid:true};
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleDescriptionChange = event =>{
    let previousState = this.state;
    let expense = previousState.expense;
    expense.description = event.target.value;

    this.setState(
      previousState
    );
  };

  private handleAmountChange = event => {
    let previousState = this.state;
    
    console.log("set new amount value:" + event.target.value)
    try{
          let amount =  convertStrToAmount(event.target.value);

          previousState.expense.amount = amount

        this.setState({
          expense:  previousState.expense ,
          isAmountValid: true
        })

    
      }catch{
        
        /**
         * throwing exception if amount is not correct
         */
        this.setState( ({
          expense: previousState.expense,
          isAmountValid: false
        })
        )

     
     }
   
  };

  private handleDateChange(date:string) {
    console.log("new-date: " + date)
    let previousState = this.state;
   

    previousState.expense.createdAT = date
    this.setState(previousState);
  };

  private handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="addForm">
   
        <Row>
          <div className="col-lg-6">
            <div className="card shadow mb-3">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Add Expense
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
                      defaultValue={this.state.expense.description}
                      onChange={this.handleDescriptionChange}
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
                      defaultValue={String.apply(this.state.expense.amount)}
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
                    
                      <DatePicker selected={this.state.expense.createdAT} id="example-datepicker" dateFormat="yyyy/MM/dd" 
                      
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

export default withRouter(AddExpensesForm);
