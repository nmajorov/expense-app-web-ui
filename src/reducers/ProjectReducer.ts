

import { ProjectsState } from "../store/Store";
import { RhoneAction } from "../actions/AppAction";
import { ProjectActions } from "../actions/ExpensesAction";
import { getType } from "typesafe-actions";
import { Project } from "../types/Expense";
import { MILLISECONDS } from "../types/Common";

export const PROJECTS_INITIAL_STATE: ProjectsState = {
    projects:[],
    pollInterval: 0
}


const projectsReducer = (state: ProjectsState = PROJECTS_INITIAL_STATE, 
    action: RhoneAction): ProjectsState => {
  const newState: ProjectsState = {
    ...state
  };
  switch (action.type) {
    case getType(ProjectActions.fetchActionSuccess):
      newState.projects = action.payload as Array<Project>; 
      newState.pollInterval = 5 * MILLISECONDS;
      break;
    
    case getType(ProjectActions.fetchError):
      newState.projects = []
      newState.pollInterval = 15 * MILLISECONDS;
      break;

    default:
      break;

      /** 
    return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
      **/



  }

  return newState;
}

export default projectsReducer;