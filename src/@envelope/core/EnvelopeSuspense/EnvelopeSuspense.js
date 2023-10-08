import EnvelopeLoading from "../EnvelopeLoading";
import PropTypes from 'prop-types';
import { Suspense } from 'react';


function EnvelopeSuspense(props) {

    return <Suspense fallback={<EnvelopeLoading {...props.loadingProps}/>} >{props.children}</Suspense>

}

EnvelopeSuspense.propTypes = {
    loadingProps: PropTypes.object,
};

EnvelopeSuspense.defaultProps = {
    loadingProps: {
        delay: 0,
    },
};

export default EnvelopeSuspense;