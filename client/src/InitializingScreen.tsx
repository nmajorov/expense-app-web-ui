import * as React from 'react';
import {
  Card,
  Spinner,
  Container,
  Button
 
} from 'react-bootstrap';


import { style } from 'typestyle';


const defaultErrorStyle = style({
    $nest: {
      '& p:last-of-type': {
        textAlign: 'right'
      },
      '& textarea, & hr': {
        display: 'none'
      },
      '& p:first-of-type': {
        textAlign: 'left'
      }
    }
  });


type initializingScreenProps = {
  errorMsg?: string;
  errorDetails?: string;
};


const expandedErrorStyle = style({
  $nest: {
    '& p:last-of-type': {
      display: 'none'
    },
    '& textarea': {
      width: '100%',
      whiteSpace: 'pre'
    }
  }
});

const InitializingScreen: React.FC<initializingScreenProps> = (props: initializingScreenProps) => {
  const errorDiv = React.createRef<HTMLDivElement>();

  const onClickHandler  = () => {
    
    if (errorDiv.current) {
      errorDiv.current.setAttribute('class', expandedErrorStyle);
    }
  };



  return (
<Container>

<Card>

     <Card.Body>
              

            <Card.Header>
              {props.errorMsg ? (
                <div ref={errorDiv} className={defaultErrorStyle}>
                  <p>
                    {/* 
                    <Icon type="pf" name="error-circle-o" /> 
                    */}  
                    
                    {props.errorMsg}
                  </p>
                  {props.errorDetails ? (
                    <>
                      <p>
                      <Button  onClick ={() => onClickHandler}>
                          Show details
                      </Button>
                      </p>
                      <hr />
                      <textarea readOnly={true} rows={10}>
                        {props.errorDetails}
                      </textarea>
                    </>
                  ) : null}
                </div>
              ) : (
                <>
                  <Spinner animation="border" variant="primary" />
                  <h1>Initializing...</h1>
                </>
              )}
            </Card.Header>
      
      </Card.Body>
    </Card>
    </Container>

        
  );
};

export default InitializingScreen;
