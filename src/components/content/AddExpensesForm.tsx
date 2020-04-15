import React, { FormEvent } from "react";
import RowComponent from "./RowComponent";
import Alert from "react-bootstrap/Alert";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import {backEndUrl} from "../../utils";

interface FormProps extends RouteComponentProps {
  type: "git";
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

  private AlertWrongInput(props) {
    return (
      <Alert key="e" variant={props.variant} show={props.show}>
        <p>{props.error}</p>
      </Alert>
    );
  }

  private handleSubmit(event: FormEvent) {
    event.preventDefault();

    let repoForm = this.state.repo;
    let branch = this.state.ref
    console.log("branch  " + branch)
    if (branch === undefined || branch === ""){
      branch = "master"
      console.log("set branch  " + branch)

    }

    if (
      repoForm != null &&
      (repoForm.startsWith("git:") ||
        repoForm.startsWith("https://") ||
        repoForm.startsWith("ssh://") ||
        repoForm.startsWith("file://"))
    ) {
      //sending request
      const params = new URLSearchParams();
      params.append("type", this.props.type);
      params.append("ref", branch);

      params.append("url", repoForm);
      var self = this;
      trackPromise(
        axios
          .post(backEndUrl +"/project/new", params)
          .then(function(response) {
            //all good redirect
            self.props.history.push("/");
          })
          .catch(function(error) {
            var errorMessage = "error";

            messages.push(errorMessage);

            console.log(error.status);

            if (error.response === undefined) {
              errorMessage += ": network error";
            }

            if (error.response != null && error.response.status !== 200) {
              var found = error.response.data.match(
                "configuration file is not found"
              );
              if (found != null) {
                errorMessage += ": no rhone config found in this repository";
              }
            }

            self.setState({
              errorInput: errorMessage,
              errorType: "danger"
            });
          })
      );
    } else {
      let errorMessage = "git url is not valid !";

      messages.push(1);

      this.setState({
        repo: this.state.repo,
        errorInput: errorMessage,
        errorType: "warning"
      });
    }
  }

  render() {
    return (
      <div id="addForm">
        <RowComponent>
          <div className="col-lg-6">
            <this.AlertWrongInput
              error={this.state.errorInput}
              variant={this.state.errorType}
              show={messages.length > 0}
            />
          </div>
        </RowComponent>
        <RowComponent>
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
        </RowComponent>
      </div>
    );
  }
}

export default withRouter(AddExpensesForm);
