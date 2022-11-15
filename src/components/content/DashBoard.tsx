import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/Store";
import {
  Card,
  Col,
  Container,
  Dropdown,
  Row,
} from "react-bootstrap";
import ReportThunkActions from "../../actions/ReportThunkActions";
import {
  faTrashAlt,
  faEdit,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfirmDialog } from "./ConfirmDialog";
import { useHistory } from "react-router-dom";
import { SecurityContext } from "../../context/SecurityContext";

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

  const { sso, reports } = useSelector(
    (state: AppState) => {
      return {
        sso: state.ssoState.sso,
        reports: state.reportsState.reports,
      };
    }
  );

  const { reportChanges } = useSelector(
    (state: AppState) => {
      return {
        reportChanges: state.reportsState.changes,
      };
    }
  );

  const [id, setId] = useState<String | null>(null);

  const [toggleDeleteDialog, DeleteConfirmDialog] = useConfirmDialog({
    titleKey: "Delete Report ?",
    messageKey:
      "If you delete this report, all associated expenses will be removed.",
    continueButtonLabel: "Delete",
    onConfirm: onDeleteConfirm,
    continueButtonVariant: "danger",
  });






  useEffect(() => {

    // update token to avoid error

    if (sso.authenticated) {
      keycloak.updateToken(30).then(function () {
        dispatch(ReportThunkActions.fetchReports(sso));
      }).catch(function () {
        console.error('Failed to refresh token');
      });
    }



  }, [sso, reportChanges, dispatch,keycloak]);

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
      <Row className="row-cols-1 row-cols-md-3 mt-3">
        {reports.map((rp) => {
          return renderReport(rp);
        })}
      </Row>
    );
  }

  function renderReport(rp) {
    return (
      <Col key={rp.id}>
        <DeleteConfirmDialog />
        <Card key={rp.id} className="mt-3">
          <Card.Body>
            <Card.Title>
              <Row>
                <Col xs="10">
              <Card.Link onClick={() => {
                history.push(`/report/${rp.id}`);
              }} href="#">{rp.name}</Card.Link>
              </Col>
              <Col md="auto"> 
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
                        history.push("/report/edit/" + rp.id);
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
                </Col>
              </Row>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {" "}
              {rp.createdAT}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    );
  };



  return sso.authenticated ? (
    renderReports()
  ) : (
    <div className={"p-5 mb-4 mt-4 bg-light rounded-3"}>
      <Container className={"container-fluid py-5"}>
      <div className={"h-100 p-5  rounded-3"}>
        <h3>Better travel and expense management.</h3>
        <h3>On OpenShift 4!</h3>
        <p className={"col-md-8 fs-4"}>This is an example of application running on OpenShift.</p>
        </div>
      </Container>
    </div>
  );
};

export default DashBoard;
