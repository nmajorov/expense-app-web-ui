import { ThunkDispatch } from "redux-thunk";
import { RhoneAppState } from "../store/Store"
import { RhoneAction } from "./RhoneAction";
import * as API from '../services/Api';
import { ProjectDetailViewActions } from "./ProjectDetailViewAction";
import { Build } from "../types/Build";
import { AlertActions } from "./AlertAction";
import { MessageType, AlertMessage } from "../types/AlertTypes";
import { ProjectActions } from "./ProjectAction";

const ProjectDetailViewThunkAction = {
  fetchProjectDetails: (id: string) => {
    return (dispatch: ThunkDispatch<RhoneAppState, undefined, RhoneAction>, getState: () => RhoneAppState) => {
      return API.fetchProject(id).then(
        responseProject => {
          let project = {
            branch: responseProject.data.branch,
            id: responseProject.data.id,
            language: responseProject.data.language,
            name: responseProject.data.name,
          }


          // console.log("builds size: "+ self.state.builds.length)

          // console.log("fetchProjects data: " + data )
          dispatch(ProjectDetailViewActions.fetchProjectActionSuccess(project))
        },
        error => {
          let emsg: string;
          if (error.response && error.response.data && error.response.data.error) {
            emsg = 'Cannot load the data: ' + error.response.data.error;
          } else {
            emsg = 'Cannot load the data: ' + error.toString();
          }
        
          dispatch(ProjectActions.fetchError(emsg))
          let alertMessage: AlertMessage = { 
            content: emsg,
            show_notification: true,
            type: MessageType.ERROR
          }
          dispatch(AlertActions.addMessage(alertMessage))
        
        }
      )
    }
  },

  fetchBuildsForProject: (id: string) => {
    return (dispatch: ThunkDispatch<RhoneAppState, undefined, RhoneAction>, getState: () => RhoneAppState) => {
      return API.getBuildsForProject(id).then(
        response => {
          let builds: Array<Build> = [];
          const objArray = response.data;
          console.log("created objArray" + objArray)

          objArray.forEach(element => {
            builds.push(
              new Build(element.id, element.branch, element.buildnum, element.projectdir,
                element.projectid, element.start, element.end, element.status)

            )
            // console.log("builds size: "+ self.state.builds.length)
          });
          // console.log("fetchProjects data: " + data )
          dispatch(ProjectDetailViewActions.fetchBuildsForProjectSuccess(builds))
        },

        error => {
          console.error("error get project");

        }
      )
    }
  },
  callStartBuild: (id:string) => {
    return (dispatch: ThunkDispatch<RhoneAppState, undefined, RhoneAction>, getState: () => RhoneAppState) => {
      return API.callStartBuild(id).then(
        response =>{
            //no need response  data
            dispatch(ProjectDetailViewActions.startBuildSuccess(response.status))
        },
        error =>{
          console.error("error to callStartBuild")
        }
      )
    }

  }
}

export default ProjectDetailViewThunkAction;
