/**
 *
 * Login form
 *
 */
import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate as useHistory } from 'react-router-dom';
import LoginThunkActions from '../../actions/LoginThunkActions.ts';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(String(''));
    const [password, setPassword] = useState(String(''));

    const [isValidName, setValidName] = useState(false);
    const [isValidPassword, setValidPassword] = useState(false);

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
        if (isValidName && isValidPassword) {
            dispatch(
                LoginThunkActions.doLogin({
                    username: name,
                    password: password,
                })
            );
        }
        //  history('/');
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

    function checkName(input: string) {
        setName(input);
        if (input.length > 3) {
            setValidName(true);
        } else {
            setValidName(false);
        }
    }

    function checkPassword(input: string) {
        setPassword(input);
        if (input.length > 3) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }

    return (
        <div id="login-form" className="mt-5">
            <Row>
                <div className="col-lg-6">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3"></div>
                        <div className="card-body">
                            <Form onSubmit={handleSubmit}>
                                <div className="col-sm-10">
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            contentEditable
                                            id="name"
                                            value={name}
                                            onChange={(e) =>
                                                checkName(e.target.value)
                                            }
                                            isValid={isValidName}
                                            // isInvalid={!isValidName}
                                        />
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            contentEditable
                                            id="password"
                                            value={password}
                                            type="password"
                                            onChange={(e) =>
                                                checkPassword(e.target.value)
                                            }
                                            isValid={isValidPassword}
                                            // isInvalid={!isValidPassword}
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <div className="col-sm-3">
                                        <Button type="submit" variant="primary">
                                            Log in
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
