import React, { FormEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";


interface FormProps extends RouteComponentProps {

}

type FormState = {
  errorInput?: string;
  repo: string;
  ref: string;
  errorType?: string;
};


//some info or error messages
const messages: any[] = [];



/**
 * main content wrapper
 */
class AddExpensesForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { repo: "" ,ref: "master"};
    this.handleRepoChange = this.handleRepoChange.bind(this);
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleRepoChange = event => {
    while (messages.length > 0) {
      messages.pop();
    }
    this.setState({
      repo: event.target.value
    });
  };

  private handleBranchChange = event => {
    while (messages.length > 0) {
      messages.pop();
    }
    this.setState({
      ref: event.target.value
    });
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
                  Add Project
                </h6>
              </div>
              <div className="card-body">
                <Form onSubmit={this.handleSubmit}>
                <div className="col-sm-10">
                  <Form.Group>
                 
                    <Form.Control
                      className="form-control form-control-user"
                      contentEditable
                      id="add-repo"
                      defaultValue={this.state.repo}
                      onChange={this.handleRepoChange}
                      placeholder="git:// url..."
                      aria-label="GitURL"
                    />
                   
                   
                     </Form.Group>
                     </div>
                     <Form.Group>
                    <div className="col-sm-3">
                    <Form.Control
                      className="form-control"
                      contentEditable
                      id="branch"
                      onChange={this.handleBranchChange}
                      defaultValue={this.state.ref}
                      placeholder="brach"
                      aria-label="branch"
                    />
                    </div>
                    
                  </Form.Group>
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
