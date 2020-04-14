import { ThunkDispatch } from "redux-thunk";
import { RhoneAppState } from "../store/Store"
import { Project } from "../types/Project";
import { RhoneAction } from "./RhoneAction";
import { ProjectActions } from "./ProjectAction";
import * as API from '../services/Api';
import { AlertActions } from "./AlertAction";
import {AlertMessage,MessageType} from "../types/AlertTypes";

const ProjectThunkActions = {
  fetchProjectsData: (

  ) => {
    return (dispatch: ThunkDispatch<RhoneAppState, undefined, RhoneAction>, getState: () => RhoneAppState) => {
      return API.fetchProjects().then(
        response => {
          const objArray = response.data;
          console.log("created objArray" + objArray)
          const data: Array<Project> = [] ; 
          objArray.forEach(element => {
            data.push(
                {
                  branch : element.branch,
                  id : element.id,
                  language : element.language,
                  name : element.name
                }
                
             )
            // console.log("builds size: "+ self.state.builds.length)
         });
         // console.log("fetchProjects data: " + data )
          dispatch(ProjectActions.fetchActionSuccess(data))
          dispatch(AlertActions.remoteMessage(""))
        },
        error => {
          
          let emsg: string;
          if (error.response && error.response.data && error.response.data.error) {
            emsg = 'Cannot load the projects: ' + error.response.data.error;
          } else {
            emsg = 'Cannot load the projects: ' + error.toString();
          }
        
          dispatch(ProjectActions.fetchError(emsg))
          let alertMessage: AlertMessage = { 
            content: emsg,
            show_notification: true,
            type: MessageType.ERROR
          }
          dispatch(AlertActions.addMessage(alertMessage))
        
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

export default ProjectThunkActions;
