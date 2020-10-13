import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState, ReportsState } from "../../store/Store";
import { SSO } from "../../types/SSO";
import { Jumbotron, Container, Card } from "react-bootstrap";
import ReportThunkActions from "../../actions/ReportThunkActions ";


/**
 *  main application dashboard
 *  user see it just after login
 */
const DashBoard = () => {
    
    const dispatch = useDispatch();
    const { sso, reports } = useSelector<AppState, SSO, ReportsState>((state: AppState) => {
        return {
            sso: state.ssoState.sso,
            reports: state.reportsState.reports

        }
    });

    useEffect(() => {
        console.log("dashboard use effect called authenticated: " + JSON.stringify(sso.authenticated))
 
        if (sso.authenticated) {
            console.log("calling dispatch")
            dispatch(ReportThunkActions.fetchReports(sso))
        }
        /// history.push("/")
    }, [sso,dispatch])



    function renderExpenses() {
        console.log("renderExpenses called"  + JSON.stringify(reports))
        return (
            <>
                {
                    reports.map((rp) => {

                        return (
                            <Card key={rp.id}>
                                <Card.Body>{rp.name}</Card.Body>
                            </Card>

                        );

                    })

                }

            </>
        )

    }



    return (

        sso.authenticated ? (

            renderExpenses()


        ) : (
                <Jumbotron>
                    <Container>
                        <h3>Better travel and expense management.</h3>
                        <h3>On OpenShift 4!</h3>
                        <p>
                            This is an example of application running on OpenShift.
                        </p>
                    </Container>
                </Jumbotron>
            )
    );
};

export default DashBoard