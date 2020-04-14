import React,{MouseEvent} from "react";
import { Table, Button,Spinner } from "react-bootstrap";
import RowComponent from "./RowComponent";

import { calcDuration } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlay,
  faCodeBranch,
  faAmbulance
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Build } from "../../types/Build";
import { Project } from "../../types/Project";
import ProjectDetailViewThunkAction from "../../actions/ProjectDetailViewThunkAction";
import { RhoneAppState } from "../../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { TimeInMilliseconds } from "../../types/Common";
import { RhoneAction } from "../../actions/RhoneAction";
import { store } from "../../store/ConfigStore";

export interface ProjectProps {
  ID: string;
}

type ProjectDetailedViewState = {};

type ProjectDetailProperties = {
  project: Project;
  builds: Array<Build>;
};

interface DispatchProps {
  getProject: (id: string) => any;
  getBuilds: (id: string) => any;
  startBuild: (id: string) => any;
  pollInterval: TimeInMilliseconds;
  disableStartBuild: false;
  //setLastRefreshAt: (lastRefreshAt: TimeInMilliseconds) => void;
}

type Props = ProjectProps & ProjectDetailProperties & DispatchProps;

/**
 * detailed project view
 * with list of all builds.
 *
 */

class ProjectDetailedViewContainer extends React.Component<
  Props,
  ProjectDetailedViewState
> {
  private pollTimeoutRef?: number;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (store.getState().projectDetailViewState.builds.length === 0) {
      this.scheduleNextPollingInterval(0);
    }
  }

  componentDidUpdate(prev: Props) {
    // schedule an immediate graph fetch if needed
    const curr = this.props;
    if (prev.pollInterval !== curr.pollInterval) {
      this.scheduleNextPollingIntervalFromProps();
    }
  }

  /**
   *
   * load initial state for component
   *
   */
  private loadInitialState = () => {
    let id = this.props.ID;
    console.log("loadInitialState for project: " + id);
    this.props.getProject(id);
    this.props.getBuilds(id);
    this.scheduleNextPollingIntervalFromProps();
  };

  private scheduleNextPollingInterval(pollInterval: number) {
    // Remove any pending timeout to avoid having multiple requests at once
    this.removePollingIntervalTimer();

    if (pollInterval === 0 || pollInterval === undefined) {
      this.loadInitialState();
    } else {
      // We are using setTimeout instead of setInterval because we have more control over it
      // e.g. If a request takes much time, the next interval will fire up anyway and is
      // possible that it will take much time as well. Instead wait for it to timeout/error to
      // try again.
      this.pollTimeoutRef = window.setTimeout(
        this.loadInitialState,
        pollInterval
      );
      console.log("pollTimeoutRef: " + this.pollTimeoutRef);
    }
  }

  private removePollingIntervalTimer() {
    if (this.pollTimeoutRef) {
      clearTimeout(this.pollTimeoutRef);
      this.pollTimeoutRef = undefined;
    }
  }

  private scheduleNextPollingIntervalFromProps() {
    console.log("this.props.pollInterval " + this.props.pollInterval);
    if (this.props.pollInterval > 0) {
      this.scheduleNextPollingInterval(this.props.pollInterval);
    } else {
      this.removePollingIntervalTimer();
    }
  }

  /**
   * Show status of build on the GUI
   * @param props status of build
   */
  private StatusButton(props) {
    let button = <Spinner animation="grow" variant="info" />;
    switch (props.variant) {
      case "success":
        button = (
          <Button className="btn-circle btn-sm" variant="success">
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        );

        break;

      case "failure":
        button = (
          <Button className="btn-circle btn-sm" variant="danger">
            <FontAwesomeIcon icon={faAmbulance} />
          </Button>
        );
        break;

      default:
        break;
    }

    return button;
  }

  private startBuild = (event: MouseEvent) => {
    event.preventDefault();
    //console.log("disable start build: " + store.getState().projectDetailViewState.disableStartBuild)
    if (store.getState().projectDetailViewState.disableStartBuild) {
      return;
    }
    this.props.startBuild(this.props.ID);
  };

  private renderStartBuildButton() {
    if (store.getState().projectDetailViewState.disableStartBuild) {
      return <></>;
    } else {
      return (
        <Button
          className="btn btn-primary btn-sm"
          variant="info"
          onClick={this.startBuild}
        >
          start build <FontAwesomeIcon icon={faPlay} size="sm" />
        </Button>
      );
    }
  }
  /**
   * render element on the page
   */
  render() {
    return (
      <div id="detailedProjectView" className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="card-title">
            <h6 className="m-0 font-weight-bold text-primary">
              {this.props.project.name}
            </h6>
          </div>
          <div className="card-subtitle">
            <RowComponent>
              <div className="col-2 p-2">
                <FontAwesomeIcon icon={faCodeBranch} size="sm" />{" "}
                {this.props.project.branch}
              </div>
              {this.renderStartBuildButton()}
              <div className="col-4 align-middle"></div>
            </RowComponent>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <Table hover={true}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>start</th>
                  <th>duration</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {this.props.builds.length > 0 ? (
                  this.props.builds.map(element => {
                    let duration = calcDuration(
                      new Date(element.start),
                      new Date(element.end)
                    );
                    return (
                      <tr key={element.id}>
                        <td>
                          <a href={"/build/" + element.id}>
                            {element.buildnum}
                          </a>
                        </td>
                        <td>{element.start}</td>
                        <td>{duration}</td>
                        <td>
                          <this.StatusButton variant={element.status} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <div className="col-xl-3 col-md-6 mb-4">
                        No builds found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RhoneAppState) => {
  return {
    project: state.projectDetailViewState.project,
    pollInterval: state.projectDetailViewState.pollInterval,
    builds: state.projectDetailViewState.builds
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RhoneAppState, void, RhoneAction>
) => ({
  getProject: id => {
    dispatch(ProjectDetailViewThunkAction.fetchProjectDetails(id));
  },

  getBuilds: id => {
    console.log("call dispatch builds for project: " + id )
    dispatch(ProjectDetailViewThunkAction.fetchBuildsForProject(id));
  },
  startBuild: id =>{
    console.log("call dispatch startBuild for project: " + id )
    dispatch(ProjectDetailViewThunkAction.callStartBuild(id));
  }

});

const decorator = connect(mapStateToProps, mapDispatchToProps);

const ProjectDetailedView = decorator(ProjectDetailedViewContainer);

export default ProjectDetailedView;
