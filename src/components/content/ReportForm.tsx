/**
 * form for add or edit reports
 * found nice article
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * @constructor
 */
import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState, ReportsState } from "../../store/Store";
import { SSO } from "../../types/SSO";
import ReportThunkActions from "../../actions/ReportThunkActions";

import { RouteComponentProps, useHistory  } from "react-router-dom";
import { Report } from "../../types/Report";

type ReportParams = { id: string };

export const ReportForm = (routerProps: RouteComponentProps<ReportParams>) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(String(""));
  const [isEdit, setIsEdit] = React.useState(false);

  const [isValid, setValid] = useState(false);

  const { sso } = useSelector<AppState, SSO>((state: AppState) => {
    return {
      sso: state.ssoState.sso
    };
  });

  const reports: Array<Report> = useSelector<AppState, ReportsState>(
    (state: AppState) => {
      return state.reportsState.reports;
    }
  );

  /**
   * handel form submit
   * @param event  a submitted form event
   */
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (sso.authenticated) {
      if (isEdit) {
        reports[0].name = name;

        dispatch(ReportThunkActions.updateReport(sso, reports[0]));
      } else {
        dispatch(ReportThunkActions.addReport(sso, name));
      }
      history.push("/");
    }
  }

  /**
   * hook to render
   */
  useEffect(() => {
    if (sso.authenticated) {
      if (history.location.pathname.endsWith("add")) {
        // we adding the report
      } else {
        setIsEdit(true);
        dispatch(
          ReportThunkActions.fetchOneReport(sso, routerProps.match.params.id)
        );
      }
    }
  }, [dispatch, history.location.pathname, routerProps.match.params.id, sso]);

  useEffect(() => {
    if (isEdit) {
      if (reports[0] !== undefined) {
        checkName(reports[0].name);
      }
    }
  }, [reports,isEdit]);

  function checkName(input: string) {
    setName(input);
    if (input.length > 3) {
      setValid(true);
    } else {
      setValid(false);
    }
  }

  return (
    <div id="addReport" className="mt-5">
      <Row>
        <div className="col-lg-6">
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                {isEdit ? "Edit" : "Add"} Report
              </h6>
            </div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <div className="col-sm-10">
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className="form-control"
                      contentEditable
                      id="name"
                      value={name}
                      onChange={(e) => checkName(e.target.value)}
                      isValid={isValid}
                      isInvalid={!isValid}
                    />
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
};
