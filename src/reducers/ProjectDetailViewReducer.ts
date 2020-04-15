

import { ProjectDetailViewState } from "../store/Store";
import { RhoneAction } from "../actions/AppAction";
import { getType } from "typesafe-actions";
import { Project } from "../types/Expense";
import { ProjectDetailViewActions } from "../actions/ProjectDetailViewAction";
import { Build } from "../types/Build";
import { MILLISECONDS } from "../types/Common";


export const PROJECT_DETAIL_VIEW_INITIAL_STATE: ProjectDetailViewState = {
  project: { branch: "", id: "", language: "", name: "" },
  builds: [],
  pollInterval: 0,
  disableStartBuild: false
}


const projectDetailReducer = (state: ProjectDetailViewState = PROJECT_DETAIL_VIEW_INITIAL_STATE, 
    action: RhoneAction): ProjectDetailViewState => {
  const newState: ProjectDetailViewState = {
    ...state
  };
  switch (action.type) {
    case getType(ProjectDetailViewActions.fetchProjectActionSuccess):
      newState.project = action.payload as Project; 
      break;
    
    case getType(ProjectDetailViewActions.fetchBuildsForProjectSuccess):
        newState.builds = action.payload as Array<Build>;
        newState.pollInterval = 5 * MILLISECONDS;
     
        if (newState.builds.length >  0 && newState.builds[0].status ==="pending"){
          newState.disableStartBuild = true;
          console.log("newState.disableStartBuild: " + newState.disableStartBuild)
        }else{
          newState.disableStartBuild = false;
        }
        break;

    case getType(ProjectDetailViewActions.startBuildSuccess):
      newState.disableStartBuild = true;
      break;

    default:
      break;

   
  }

  return newState;
}

export default projectDetailReducer;