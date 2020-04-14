import React from "react";
import RowComponent from "./RowComponent";
import ProjectViewCard from "./ProjectViewCard";
import { Project } from "../../types/Project";
import { store } from "../../store/ConfigStore";
import { RhoneAppState } from "../../store/Store";
import { ThunkDispatch } from "redux-thunk";
import ProjectThunkAction  from "../../actions/ProjectThunkAction";
import { connect } from "react-redux";
import { RhoneAction } from "../../actions/RhoneAction";
import {TimeInMilliseconds} from "../../types/Common";

type ProjectsStates = {};

interface OwnProps {
  projects: Array<Project>;
}

interface StateProps {

}

interface DispatchProps {
  getProject: () => any;
  pollInterval: TimeInMilliseconds;
  setLastRefreshAt: (lastRefreshAt: TimeInMilliseconds) => void;
  
}

type Props = StateProps & OwnProps & DispatchProps;

/**
 * dashboard for projects
 *
 */
class DashBoardContainer extends React.Component<Props, ProjectsStates> {
  
  private pollTimeoutRef?: number;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (store.getState().projectState.projects.length === 0) {
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

  private scheduleNextPollingInterval(pollInterval: number) {
    // Remove any pending timeout to avoid having multiple requests at once
    this.removePollingIntervalTimer();

    if (pollInterval === 0 || pollInterval === undefined) {
      this.loadProjectsFromBackend()
    } else {
      // We are using setTimeout instead of setInterval because we have more control over it
      // e.g. If a request takes much time, the next interval will fire up anyway and is
      // possible that it will take much time as well. Instead wait for it to timeout/error to
      // try again.
      this.pollTimeoutRef = window.setTimeout(this.loadProjectsFromBackend, pollInterval);
    }
  }


  private removePollingIntervalTimer() {
    if (this.pollTimeoutRef) {
      clearTimeout(this.pollTimeoutRef);
      this.pollTimeoutRef = undefined;
    }
  }


  private scheduleNextPollingIntervalFromProps() {
    console.log("this.props.pollInterval " + this.props.pollInterval )
    if (this.props.pollInterval > 0) {
      this.scheduleNextPollingInterval(this.props.pollInterval);
    } else {
      this.removePollingIntervalTimer();
    }
  }


  



  private loadProjectsFromBackend = () => {
    this.props.getProject()
    this.scheduleNextPollingIntervalFromProps()
  }
  /**
   * render element on the page
   */
  render() {
    return (
      <div id="main list">
        <RowComponent>
          
        </RowComponent>
        <RowComponent>
          {this.props.projects.length > 0 ? (
            this.props.projects.map(pr => {
              return (
                <div className="col-xl-3 col-md-6 mb-4" key={pr.id}>
                  <ProjectViewCard name={pr.name} id={pr.id} key={pr.id}  branch={pr.branch} />
                </div>
              );
            })
          ) : (
            <div className="col-xl-3 col-md-6 mb-4">
              No expenses is available at the moment.
            </div>
          )}
        </RowComponent>
      </div>
    );
  } //end of render
}

const mapStateToProps = (state: RhoneAppState) => {
  return {
    projects: state.projectState.projects,
    pollInterval: state.projectState.pollInterval
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RhoneAppState, void, RhoneAction>
) => ({
  getProject: () => {
    dispatch(ProjectThunkAction.fetchProjectsData());
  }
});



const decorator = connect(mapStateToProps, mapDispatchToProps);

const DashBoard = decorator(DashBoardContainer);

export default DashBoard;
