import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const VFMessage = ({ verifying }) => {

    return (
        <div className="vf-message">
            {!verifying ? (
                <>
                    <p>Email Verifed</p>
                    <CheckCircleIcon className="success-icon" />
                </>
            ) : (
                <>
                    <p>Verifying email...</p>
                    <CircularProgress color={"#fff"} />
                </>
            )}
        </div>
    )

}

export default VFMessage
