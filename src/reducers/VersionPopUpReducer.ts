import { constants as C } from "../utils";
import { VersionPopUpState } from "../store/Store";
import { RhoneAction } from "../actions/AppAction";
import { Version } from "../types/Version";

export const VERSION_POPUP_INITIAL_STATE: VersionPopUpState = {

  version: {
    build: "",
    version: ""
  },
  showModal: false

}


const versionPopUpReducer = (state: VersionPopUpState = VERSION_POPUP_INITIAL_STATE, action: RhoneAction): VersionPopUpState => {
  const newState: VersionPopUpState = {
    ...state
  };
  switch (action.type) {
    case C.SHOW_VERSION:
      newState.version = action.payload as Version; 
      newState.showModal = true
      break;
    
    case C.HIDE_VERSION:
      newState.showModal =action.payload as boolean;
      
     
      
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

export default versionPopUpReducer;