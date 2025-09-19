import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/Store';
import {
    Card,
    Col,
    Container,
    Dropdown,
    Jumbotron,
    Row,
} from 'react-bootstrap';
import ReportThunkActions from '../../actions/ReportThunkActions';
import {
    faTrashAlt,
    faEdit,
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfirmDialog } from './ConfirmDialog';
import { useNavigate as useHistory } from 'react-router-dom';
import { SecurityContext } from '../../context/SecurityContext';

const trashIcon = <FontAwesomeIcon color="red" icon={faTrashAlt} />;
const editIcon = <FontAwesomeIcon icon={faEdit} />;
const kebabIcon = <FontAwesomeIcon icon={faEllipsisH} />;

/**
 *  main application dashboard
 *  user see it just after login
 */
const DashBoard = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const keycloak = useContext(SecurityContext);

    const { sso, reports } = useSelector((state: AppState) => {
        return {
            sso: state.ssoState.sso,
            reports: state.reportsState.reports,
        };
    });

    const { reportChanges } = useSelector((state: AppState) => {
        return {
            reportChanges: state.reportsState.changes,
        };
    });

    const [id, setId] = useState<String | null>(null);

    const [toggleDeleteDialog, DeleteConfirmDialog] = useConfirmDialog({
        titleKey: 'Delete Report ?',
        messageKey:
            'If you delete this report, all associated expenses will be removed.',
        continueButtonLabel: 'Delete',
        onConfirm: onDeleteConfirm,
        continueButtonVariant: 'danger',
    });

    useEffect(() => {
        // update token to avoid error

        if (sso.authenticated) {
            keycloak
                .updateToken(30)
                .then(function () {
                    dispatch(ReportThunkActions.fetchReports(sso));
                })
                .catch(function () {
                    console.error('Failed to refresh token');
                });
        }
    }, [sso, reportChanges, dispatch, keycloak]);

    function openDeleteDialog(id: String) {
        setId(id);
        toggleDeleteDialog();
    }

    function onDeleteConfirm() {
        if (id !== null) {
            dispatch(ReportThunkActions.deleteReport(sso, id));
        }
    }

    function renderReports() {
        return (
            <Row>
                {reports.map((rp) => {
                    return renderReport(rp);
                })}
            </Row>
        );
    }

    function renderReport(rp) {
        return (
            <Col key={rp.id} md={6} className="mt-3">
                <DeleteConfirmDialog />
                <Card key={rp.id}>
                    <Card.Body>
                        <Card.Title>
                            <Card.Link
                                onClick={() => {
                                    history.push(`/report/${rp.id}`);
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
                                                history.push(
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

    return sso.authenticated ? (
        renderReports()
    ) : (
        <Jumbotron>
            <Container>
                <h3>Better travel and expense management.</h3>
                <h3>On OpenShift 4!</h3>
                <p>This is an example of application running on OpenShift.</p>
            </Container>
        </Jumbotron>
    );
};

export default DashBoard;
