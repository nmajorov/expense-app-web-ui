import React from 'react';
import './App.css';
import { ContentWrapper, AddProjectForm, ProjectDetailedView ,
      BuildView, 
      DashBoard}
 from './components/content';
import SideBar from './components/sidebar';
import NavBar from './components/navbar/NavBar';
import {
      BrowserRouter as Router,
      Switch,
      Route
} from 'react-router-dom';

const App: React.FC = () => {
      return (

            <div id="wrapper">

                  <SideBar />
                  <ContentWrapper>
                        <NavBar />
                        <div className="container-fluid">
                              <Router>
                                    <Switch>
                                          <Route path="/about">

                                          </Route>
                                          <Route path="/add-expenses">
                                                <AddProjectForm type="git" />
                                          </Route>
                                          <Route exact path="/show-project/:id" render={(props) => {
                                                let id = props.location.pathname.replace("/show-project/","");
                                               return (
                                                      <ProjectDetailedView ID={id} />
                                                )
                                          }

                                          }
                                          />
                                          <Route exact path="/build/:id" render={(props) =>{
                                                let id =  props.location.pathname.replace("/build/","");
                                                return (
                                                      <BuildView buildID={id} />
                                                )
                                          }}/>
                                          <Route path="/">

                                                <DashBoard />
                                          </Route>

                                    </Switch>
                              </Router>
                        </div>
                  </ContentWrapper>
            </div>
      );
}

export default App;
