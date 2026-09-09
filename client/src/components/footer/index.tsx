import { useEffect, useState } from 'react';
import * as API from '../../services/Api.ts';

const Footer = () => {
    const [serverVersion, setServerVersion] = useState('');

    useEffect(() => {
        API.fetchVersion()
            .then((response) => {
                const data = response.data;
                const version =
                    typeof data === 'string' ? data : data?.version;
                setServerVersion(version ?? '');
            })
            .catch(() => setServerVersion('unavailable'));
    }, []);

    return (
        <footer className="pt-7 my-md-5 pt-md-5 border-top">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>
                        Copyright &copy;
                        <a href="http://www.majorov.biz">
                            {' '}
                            Nikolaj Majorov{' '}
                        </a>{' '}
                        2019 - 2025
                    </span>
                </div>
                <div className="version text-center text-muted">
                    <small>web-client: v{__APP_VERSION__}</small>
                </div>
                <div className="server-version text-center text-muted">
                    <small>server: {serverVersion}</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
