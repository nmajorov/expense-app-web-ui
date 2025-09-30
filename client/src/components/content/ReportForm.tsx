/**
 * form for add or edit reports
 * found nice article
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 * @constructor
 */
import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/Store.ts';
import ReportThunkActions from '../../actions/ReportThunkActions.ts';
import { useSecurity } from '../../context/SecurityContext.tsx';

import { useParams, useNavigate as useHistory } from 'react-router-dom';
import { Report } from '../../types/Report.ts';
import { reportSelector } from '../../selectors/ReportSelector.ts';
import { AlertActions } from '../../actions/AlertAction.ts';
import { MessageType } from '../../types/AlertTypes.ts';

type ReportProps = {
    reportToEdit?: Report;
};

export const AddReport = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSecurity();
    if (!isAuthenticated) {
        dispatch(
            AlertActions.addMessage({
                content: 'Not authenticated!',
                show_notification: true,
                type: MessageType.ERROR,
            })
        );
        return <></>;
    }
    return <ReportForm />;
};

export const EditReport = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const reportID = Number(id);

    const { isAuthenticated, user } = useSecurity();

    const { reports } = useSelector(reportSelector);

    function getReportById(id: number): Report | undefined {
        for (let i = 0; i < reports.length; i++) {
            if (reports[i].id === id) {
                return reports[i];
            }
        }
        return undefined;
    }

    if (!isAuthenticated) {
        dispatch(
            AlertActions.addMessage({
                content: 'Not authenticated!',
                show_notification: true,
                type: MessageType.ERROR,
            })
        );
        return <></>;
    }

    const reportToEdit = getReportById(reportID);

    if (isNaN(reportID) && reportToEdit === undefined) {
        // If the ID is not a number, redirect to a "Not Found" page
        dispatch(
            AlertActions.addMessage({
                content: "Can't find report to edit",
                show_notification: true,
                type: MessageType.ERROR,
            })
        );

        return <></>;
    } else {
        return <ReportForm reportToEdit={reportToEdit}></ReportForm>;
    }
};

export const ReportForm = ({ reportToEdit }: ReportProps) => {

    const { isAuthenticated, user } = useSecurity();

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(String(''));
    const [isValid, setValid] = useState(false);

    /**
     * handel form submit
     * @param event  a submitted form event
     */
    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (reportToEdit === undefined) {
            dispatch(ReportThunkActions.addReport(user?.token, name));
        } else {
            reportToEdit.name = name;
            dispatch(
                ReportThunkActions.updateReport(user?.token, reportToEdit)
            );
        }

        history('/');
    }

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
                                {reportToEdit ? 'Edit' : 'Add'} Report
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="col-sm-10">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            {reportToEdit ? 'New Name' : 'Name'}
                                        </Form.Label>
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
