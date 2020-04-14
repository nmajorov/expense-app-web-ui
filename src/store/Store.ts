import { Version } from "../types/Version";

import { Project } from "../types/Project";
import { TimeInMilliseconds } from "../types/Common";
import { Build } from "../types/Build";
import { AlertMessage } from "../types/AlertTypes";

/**
 * 
 * state of version pop-up in navigation
 *
 */
export interface VersionPopUpState {
    version : Version;
    showModal: boolean;

}

export interface AlertsState{
    alertMessage: AlertMessage;
}

export interface ProjectsState {
    projects: Array<Project>
    pollInterval: TimeInMilliseconds;
}

export interface ProjectDetailViewState{
    project: Project;
    builds: Array<Build>;
    pollInterval: TimeInMilliseconds;
    disableStartBuild: boolean;
}

export interface RhoneAppState {
    
    versionPopUpState: VersionPopUpState;
    projectState: ProjectsState;
    projectDetailViewState: ProjectDetailViewState;
    alertState: AlertsState;
}
  