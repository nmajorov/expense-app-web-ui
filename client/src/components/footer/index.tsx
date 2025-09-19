import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="pt-7 my-md-5 pt-md-5 border-top">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>
                            Copyright &copy;
                            <a href="mailto:nikolaj.majorov@majorov.biz">
                                {' '}
                                Nikolaj Majorov{' '}
                            </a>{' '}
                            2019 - 2025
                        </span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
