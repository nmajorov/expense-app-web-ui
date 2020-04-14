import React from "react";
import RowComponent from "./RowComponent";
import { Breadcrumb, Alert } from "react-bootstrap";
import axios from "axios";
import { Build } from "../../types/Build";
import { FormText } from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";

import { backEndUrl } from "../../utils";

interface BuildViewProperties {
  projectID?: string;
  buildID: string;
}

type BuildViewState = {
  projectName: string;
  build: Build;
  errorMessage: string;
  log: string;
};

/**
 * Show info of project and log
 *
 */
export default class BuildView extends React.Component<
  BuildViewProperties,
  BuildViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      errorMessage: "",
      build: new Build("", "", 0, "", "", new Date(), new Date(), ""),
      log: ""
    };
  }

  componentDidMount() {
    var self = this;
    let prjName = "";
    let mbuild;
    let logData = "";

    trackPromise(
      // get build
      axios
        .get(backEndUrl + "/build/" + self.props.buildID)
        .then(function(response) {
          // handle success
          const element = response.data;
          console.log("got build: " + JSON.stringify(element));

          mbuild = new Build(
            element.id,
            element.branch,
            element.buildnum,
            element.projectdir,
            element.projectid,
            element.start,
            element.end,
            element.status
          );

          //console.log("get project for build " + mbuild.id)
          axios
            .get(backEndUrl + "/project/show/" + mbuild.projectid)
            .then(function(resp2) {
              prjName = resp2.data.name;

              axios
                .get(backEndUrl + "/build/log/" + mbuild.id)
                .then(response3 => {
                  logData = response3.data;
                  self.setState({
                    projectName: prjName,
                    build: mbuild,
                    log: logData
                  });
                });
            })
            .catch(function(error) {
              self.setState({
                errorMessage: "error at server communication"
              });
            });

          console.log("get project for build " + self.state.projectName);
        })
        .catch(function(error) {
          self.setState({
            errorMessage: "error at getting details for build"
          });
        })
    );
  }

  private getBuildLog() {}

  private AlertError(props) {
    return (
      <Alert key="e" variant={props.variant} show={props.show}>
        <p>{props.error}</p>
      </Alert>
    );
  }

  render() {
    return (
      <>
        {this.state.errorMessage && (
          <RowComponent>
            <this.AlertError
              error={this.state.errorMessage}
              variant="danger"
              show={this.state.errorMessage ? true : false}
            />
          </RowComponent>
        )}

        {this.renderBuildDetails()}
      </>
    );
  }

  private renderBuildDetails = () => {
    return (
      <div id="buildDetails">
        <RowComponent>
          <div className="col-xl-8 col-lg-7">
            <Breadcrumb>
              <Breadcrumb.Item
                href={"/show-project/" + this.state.build.projectid}
              >
                {this.state.projectName}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                {this.state.build.buildnum}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </RowComponent>
        <RowComponent>
          <div className="col-xl-8 col-lg-7">
            <FormText>
              <pre>{this.state.log}</pre>
            </FormText>
          </div>
        </RowComponent>
      </div>
    );
  };
}
