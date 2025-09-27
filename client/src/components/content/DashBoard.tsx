import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/Store.ts';
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap';
import ReportThunkActions from '../../actions/ReportThunkActions.ts';
import {
    faTrashAlt,
    faEdit,
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfirmDialog } from './ConfirmDialog.tsx';
import { useNavigate } from 'react-router-dom';
import { useSecurity } from '../../context/SecurityContext.tsx';
import { Report } from '../../types/Report.ts';

const trashIcon = <FontAwesomeIcon color="red" icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit} />;
const kebabIcon = <FontAwesomeIcon icon={faEllipsisH} />;

/**
 *  main application dashboard
 *  user see it just after login
 */
const DashBoard = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    // Hooks must be called inside the component body.
    const { isAuthenticated, user } = useSecurity();

    const { reports } = useSelector((state: AppState) => {
        return {
            //    sso: state.ssoState.sso,
            reports: state.reportsState.reports,
        };
    });

    const { reportChanges } = useSelector((state: AppState) => {
        return {
            reportChanges: state.reportsState.changes,
        };
    });

    const [id, setId] = useState<number | null>(null);

    const [toggleDeleteDialog, DeleteConfirmDialog] = useConfirmDialog({
        titleKey: 'Delete Report ?',
        messageKey:
            'If you delete this report, all associated expenses will be removed.',
        continueButtonLabel: 'Delete',
        onConfirm: onDeleteConfirm,
        continueButtonVariant: 'danger',
    });

    useEffect(() => {
        // Code to be executed on component load
        if (isAuthenticated) {
            dispatch(ReportThunkActions.fetchReports(user?.token));
        }
    }, []); // Empty dependency array means it will run only once on component mount

    function openDeleteDialog(id: number) {
        setId(id);
        toggleDeleteDialog();
    }

    function onDeleteConfirm() {
        if (id !== null) {
            dispatch(ReportThunkActions.deleteReport(user?.token, id));
        }
    }

    function renderReports() {
        return (
            <Row>
                {reports.map((rp: Report) => {
                    return renderReport(rp);
                })}
            </Row>
        );
    }

    function renderReport(rp: Report) {
        return (
            <Col key={rp.id} md={6} className="mt-3">
                <DeleteConfirmDialog />
                <Card key={rp.id}>
                    <Card.Body>
                        <Card.Title>
                            <Card.Link
                                onClick={() => {
                                    history(`/report/${rp.id}`);
                                }}
                                href="#"
                            >
                                {rp.name}
                            </Card.Link>
                            <div className="float-right">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        size="sm"
                                        variant="secondary"
                                        id="dropdown-basic"
                                    >
                                        {kebabIcon}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            href="#"
                                            onClick={() => {
                                                history(
                                                    '/report/edit/' + rp.id
                                                );
                                            }}
                                        >
                                            Change Name {editIcon}
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="#"
                                            onClick={() => {
                                                openDeleteDialog(rp.id);
                                            }}
                                        >
                                            Delete {trashIcon}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {' '}
                            {rp.createdAT}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    return isAuthenticated ? (
        renderReports()
    ) : (
        <Container className="my-5 jumbotron">
            <Container className="y-5  ">
                <h3>Better travel and expense management.</h3>
                <h3>Running on SUSE RKE2 or K3s Kubernetes !!</h3>
                <p>
                    This is an example of application built with{' '}
                    <a href="https://reactjs.org/">React</a>.
                </p>
            </Container>
        </Container>
    );
};

export default DashBoard;
