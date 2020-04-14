import React from 'react';




/**
 * main content wrapper
 */
export default class RowComponent extends React.Component {

    render() {
        return (
            <div className="row">
                {this.props.children}
            </div>
        )
    }

}

