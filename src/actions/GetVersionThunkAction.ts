import { ThunkDispatch } from "redux-thunk";
import { RhoneAppState } from "../store/Store"
import { RhoneAction } from "./RhoneAction";
import { GetVersionActions } from "./GetVersionAction";
import * as API from '../services/Api';

const GetVersionThunkActions = {
  fetchExpenseData: (

  ) => {
    return (dispatch: ThunkDispatch<RhoneAppState, undefined, RhoneAction>, getState: () => RhoneAppState) => {
      return API.getRhoneVersion().then(
        response => {
          const data = response.data;
          dispatch(GetVersionActions.getVersionSuccess(data))
        },
        error => {
          console.log("error get version")
          /**
        let emsg: string;
        if (error.isCanceled) {
          return;
        }
        if (error.response && error.response.data && error.response.data.error) {
          emsg = 'Cannot load the graph: ' + error.response.data.error;
        } else {
          emsg = 'Cannot load the graph: ' + error.toString();
        }
        dispatch(MessageCenterActions.addMessage(emsg));
        dispatch(GraphDataActions.getGraphDataFailure(emsg));
      ***/

        }
      )
    }
  }
}

export default GetVersionThunkActions;
