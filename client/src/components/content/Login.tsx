/**
 *
 * Login form
 *
 */
import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate as useHistory } from 'react-router-dom';

export const ReportForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(String(''));
    const [password, setPassword] = useState(String(''));

    const [isValid, setValid] = useState(false);

    // const { sso } = useSelector((state: AppState) => {
    //     return {
    //         sso: state.ssoState.sso,
    //     };
    // });

    /**
     * handel form submit
     * @param event  a submitted form event
     */
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        // if (sso.authenticated) {
        //     if (isEdit) {
        //         reports[0].name = name;

        //         dispatch(ReportThunkActions.updateReport(sso, reports[0]));
        //     } else {
        //         dispatch(ReportThunkActions.addReport(sso, name));
        //     }
        //     history('/');
        // }
    }

    // useEffect(() => {
    //     if (isEdit) {
    //         if (reports[0] !== undefined) {
    //             checkName(reports[0].name);
    //         }
    //     }
    // }, [reports, isEdit]);

    function checkName(input: string) {
        setName(input);
        if (input.length > 3) {
            setValid(true);
        } else {
            setValid(false);
        }
    }

    return (
        <div id="login-form" className="mt-5">
            <Row>
                <div className="col-lg-6">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                                Login
                            </h6>
                        </div>
                        <div className="card-body">
                            <Form onSubmit={handleSubmit}>
                                <div className="col-sm-10">
                                    <Form.Group>
                                        <Form.Label>username</Form.Label>
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
                                </div>
                                <Form.Group>
                                    <div className="col-sm-3">
                                        <Button type="submit" variant="primary">
                                            Submit
                                        </Button>
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
