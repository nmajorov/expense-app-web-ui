/**
 * form for add or edit reports
 * found nice article
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * @constructor
 */
import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/Store.ts';
import ReportThunkActions from '../../actions/ReportThunkActions.ts';
import { useSecurity } from '../../context/SecurityContext.tsx';

import {
    useParams,
    useNavigate as useHistory,
} from 'react-router-dom';
import { Report } from '../../types/Report.ts';

type ReportParams = { id: string };

export const ReportForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

     //const params = useParams();

     const { isAuthenticated, user } = useSecurity();


    const [name, setName] = useState(String(''));
    const [isEdit, setIsEdit] = React.useState(false);

    const [isValid, setValid] = useState(false);


    const reports: Array<Report> = useSelector((state: AppState) => {
        return state.reportsState.reports;
    });

    /**
     * handel form submit
     * @param event  a submitted form event
     */
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (isAuthenticated) {
            if (isEdit) {
                reports[0].name = name;

                dispatch(ReportThunkActions.updateReport(user?.token, reports[0]));
            } else {
                dispatch(ReportThunkActions.addReport(user?.token, name));
            }
            
            history('/');

        }
    }

    useEffect(() => {
         if (!isAuthenticated) {
             history('/');

         }
        if (isEdit) {
            if (reports[0] !== undefined) {
                checkName(reports[0].name);
            }
        }
    }, [reports, isEdit]);

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
                                {isEdit ? 'Edit' : 'Add'} Report
                            </h6>
                        </div>
                        <div className="card-body"> 
                            <div className="col-sm-10">
                            <Form onSubmit={handleSubmit}>
                               
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            contentEditable
                                            id="name"
                                            value={name}
                                            onChange={(e) =>
                                                checkName(e.target.value)
                                            }
                                            isValid={isValid}
                                            isInvalid={!isValid}
                                        />
                                    </Form.Group>
                                
                               
                                        <Button type="submit" variant="primary">
                                            Submit
                                        </Button>
                                   
                               
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </div>
    );
};
