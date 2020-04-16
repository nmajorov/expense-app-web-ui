import React from "react";
import Table from 'react-bootstrap/Table'
import RowComponent from "./RowComponent";
import { store } from "../../store/ConfigStore";
import { AppState } from "../../store/Store";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppAction } from "../../actions/AppAction";
import {TimeInMilliseconds} from "../../types/Common";
import { Expense } from "../../types/Expense";
import ExpensesThunkActions from "../../actions/ExpensesThunkActions";



type ProjectsStates = {};

interface OwnProps {
  expenses: Array<Expense>;
}

interface StateProps {

}

interface DispatchProps {
  getExpenses: () => any;
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
  //  if (store.getState().projectState.projects.length === 0) {
  //    this.scheduleNextPollingInterval(0);
  //  }
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
      this.loadExpensesFromBackend();
    } else {
      // We are using setTimeout instead of setInterval because we have more control over it
      // e.g. If a request takes much time, the next interval will fire up anyway and is
      // possible that it will take much time as well. Instead wait for it to timeout/error to
      // try again.
      this.pollTimeoutRef = window.setTimeout(
        this.loadExpensesFromBackend,
        pollInterval
      );
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

  private loadExpensesFromBackend = () => {
    this.props.getExpenses();
    this.scheduleNextPollingIntervalFromProps();
  };

  /**
   * render table with expenses
   */
  private renderExpensesTable() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Created</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {this.props.expenses.map((pr) => {
            return (
              <tr>
                <td>{pr.id}</td>
                <td>{pr.description}</td>
                <td>{pr.amount}</td>
                <td>{pr.amount}</td>
                <td>{pr.createdAT}</td>
                <td>{pr.tstamp}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  /**
   * render element on the page
   */
  render() {
    return (
      <div id="main list">
        <RowComponent></RowComponent>
        <RowComponent>
          {this.props.expenses.length > 0 ? (
            this.renderExpensesTable()
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

const mapStateToProps = (state: AppState) => {
  return {
    expenses: state.expensesState.expenses,
    pollInterval: state.expensesState.pollInterval
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, AppAction>
) => ({
  getExpenses: () => {
    dispatch(ExpensesThunkActions.fetchExpensesData());
  }
});



const decorator = connect(mapStateToProps, mapDispatchToProps);

const DashBoard = decorator(DashBoardContainer);

export default DashBoard;
