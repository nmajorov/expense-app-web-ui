import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faCloud, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'



const faCloudIcon = <FontAwesomeIcon icon= {faCloud} />

const faTachometerIcon = <FontAwesomeIcon icon={faTachometerAlt} className="fas fa-fw" />

const faCogIcon = <FontAwesomeIcon icon={faPlusSquare} className="fas fa-fw" />
/**
 * main content wrapper
 */
export default class SideBar extends React.Component {
  

    render(){
        return (


            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


                <a className="sidebar-brand d-flex align-items-center justify-content-left" href="/">
                    <div className="sidebar-brand-icon">
                        {faCloudIcon}
                    </div>
                    <div className="sidebar-brand-text mx-3">Expenses App</div>
                </a>

                <hr className="sidebar-divider my-0" />


                <li className="nav-item">
                    <a className="nav-link" href="/">
                        {faTachometerIcon}
                    <span> Dashboard</span></a>
                </li>


                <hr className="sidebar-divider" />



                <li className="nav-item">
                    <a className="nav-link " href="/add-project">
                        {faCogIcon}
                        <span>  Add Expenses</span>
                    </a>
                    {/**
                    
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Custom Components:</h6>
                            <a class="collapse-item" href="buttons.html">Buttons</a>
                            <a class="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                     */}
                </li>





                {/**
                    
                <hr class="sidebar-divider d-none d-md-block" />


                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
*/}
            </ul>


        )
    }
}