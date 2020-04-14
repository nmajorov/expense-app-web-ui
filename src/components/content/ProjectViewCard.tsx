/**
 * element representing view on the project as card in on the main dashboard

https://blackrockdigital.github.io/startbootstrap-sb-admin-2/cards.html
**/

import React from 'react';
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import * as API from '../../services/Api';

const branchIcon = <FontAwesomeIcon icon={faCodeBranch} />;

const trashIcon = <FontAwesomeIcon icon={faTrash} />;

/**
 * simple view on the project in the dashboard
 * 
 */
class ProjectViewCard extends React.Component<{name:string,  id:string, branch:string}, {lastBuildStatus:string}>{
    constructor(props) {
        super(props);
        this.state = {
           lastBuildStatus: "unknown"
        }

        this.delete = this.delete.bind(this);
    }


    private delete = event => {
       
        event.preventDefault();
        API.deleteProject(this.props.id).then(response => {
           
        })
    };

    render() {

        return (
            <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
        <div className="text-xs font-weight-bold text-uppercase mb-1"><a href={"/show-project/" + this.props.id}>{this.props
        .name}</a></div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {branchIcon} {this.props.branch}
                            </div>
                        </div>
                        <div className="col-auto">
                                <Button  className="btn-circle" variant="danger" onClick={this.delete}>
                                {trashIcon}
                                </Button>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProjectViewCard