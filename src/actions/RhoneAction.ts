import {GetVersionAction} from "./GetVersionAction";
import { ProjectAction } from "./ProjectAction";
import { AlertAction } from "./AlertAction";
import { ProjectDetailViewAction } from "./ProjectDetailViewAction";

export type RhoneAction = 
| GetVersionAction
| ProjectAction
| AlertAction
| ProjectDetailViewAction