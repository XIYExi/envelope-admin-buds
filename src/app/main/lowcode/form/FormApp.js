import React from 'react';
import EnvelopePageSimple from "../../../../@envelope/core/EnvelopePageSimple";
import FormAppHeader from "./FormAppHeader";



function FormApp(props) {


    return(
        <React.Fragment>
            <EnvelopePageSimple
                header={<FormAppHeader />}
                scroll={'content'}
            />
        </React.Fragment>
    )
}

export default FormApp;