import React from 'react';
import Footer from '../footer';


/**
 * main content wrapper
 */
export default class ContentWrapper extends React.Component {
  
    render (){
        
        return (

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }

}

