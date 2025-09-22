import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/Store.ts';
import {
    Card,
    Col,
    Container,
    Dropdown,
    Jumbotron,
    Row,
} from 'react-bootstrap';
import ReportThunkActions from '../../actions/ReportThunkActions.ts';
import {
    faTrashAlt,
    faEdit,
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfirmDialog } from './ConfirmDialog.tsx';
import { useNavigate } from 'react-router-dom';
// import { SecurityContext } from '../../context/SecurityContext';

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
    // const { isAuthenticated, session } = useSecurity(); // Assuming useSecurity is from your context
    const sso = { authenticated: true }; // Placeholder
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
    }, [sso, reportChanges, dispatch]);

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
                                                history('/report/edit/' + rp.id);
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
            <Container className="py-5">
                <h3>Better travel and expense management.</h3>
                <h3>Running on SUSE RKE2 or K3s Kubernetes !!</h3>
                <p>
                    This is an example of application built with React and Redux
                    .
                </p>
            </Container>
        </Jumbotron>
    );
};

export default DashBoard;
