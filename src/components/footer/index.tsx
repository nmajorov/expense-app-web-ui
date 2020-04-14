import React from 'react';

//import { Link } from 'preact-router/match';

class Footer extends React.Component {
  render() {
    return (
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Nikolaj Majorov 2019</span>
          </div>
        </div>
      </footer>
    );
  }
}



export default Footer;