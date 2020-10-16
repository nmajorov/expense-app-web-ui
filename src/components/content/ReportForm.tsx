/**
 * form for add or edit reports
 * found nice article
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * @constructor
 */
import React, {FormEvent, useEffect, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/Store";
import {SSO} from "../../types/SSO";
import ReportThunkActions from "../../actions/ReportThunkActions ";
import { useHistory } from "react-router-dom";

export const ReportForm = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const [name, setName] = useState(String(""));

    const [isValid,setValid] = useState(false);

    const {sso} = useSelector<AppState, SSO>((state: AppState) => {
        return {
            sso: state.ssoState.sso,
        }
    });

    /**
     * handel form submit
     * @param event  a submitted form event
     */
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (sso.authenticated) {
            dispatch(ReportThunkActions.addReport(sso,name))
            history.push("/")
        }
       
    }


    /**
     * hook to render
     */
    useEffect(
        () => {

        },[]
    );

    function checkName(input:string){
        setName(input)
        if (input.length>3){
            setValid(true)
        }else{
            setValid(false)
        }
    }

    return (


        <div id="addReport">

            <Row>
                <div className="col-lg-6">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                                Report
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
                                            onChange={e =>  checkName(e.target.value)}
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


    )
}