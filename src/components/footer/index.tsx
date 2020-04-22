import React from 'react';

//import { Link } from 'preact-router/match';

class Footer extends React.Component {
  render() {
    return (
      <footer className="pt-7 my-md-5 pt-md-5 border-top">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Nikolaj Majorov 2019 - 2020 <a href="https://www.redhat.com/en/global/dach">RedHat</a></span>
          </div>
        </div>
      </footer>
    );
  }
}



export default Footer;