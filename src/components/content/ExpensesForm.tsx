
import {Button, Form, Row, Container} from "react-bootstrap";
// import {Expense} from "../../types/Expense";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {connect} from "react-redux";
// import {convertAmountToStr, convertStrToAmount, formatDateStr, formateStrToDate} from "../../utils"
import {AppState} from "../../store/Store";
// import {ThunkDispatch} from "redux-thunk";
// import {AppAction} from "../../actions/AppAction";
// import ExpensesThunkActions from "../../actions/ExpensesThunkActions";
// import { Report } from "../../types/Report";
// import { SSO } from "../../types/SSO";
// import ReportThunkActions from "../../actions/ReportThunkActions";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 *
 * main content wrapper
 */
export const  ExpensesForm =  () =>{

  const history = useHistory();
  const dispatch = useDispatch();
  
  const { sso, reports } = useSelector(
    (state: AppState) => {
      return {
        sso: state.ssoState.sso,
        reports: state.reportsState.reports,
      };
    }
  );

  const { reportChanges } = useSelector(
    (state: AppState) => {
      return {
        reportChanges: state.reportsState.changes,
      };
    }
  );

  const [id, setId] = useState<String | null>(null);


    return (


      <Container key="addForm" className="mt-5">

        <Row>
          <div className="col-lg-6">
            <div className="card shadow mb-3">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  {/**  this.props.editExpenseId ? "Edit": "Add" *
                   */} 
                  Expense
                </h6>
              </div>
              <div className="card-body">
                <Form>
                <div className="col-sm-10">
                  <Form.Group>

                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      className="form-control"
                      contentEditable
                      id="Description"
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
                      placeholder="0.0"
                      aria-label="amount"
                      />
                   </div>
                    </Form.Group>

                    <div className="col-sm-6">
                    <Form.Label>Date of Expenses</Form.Label>
                    <Form.Group controlId="expensesDate">


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





