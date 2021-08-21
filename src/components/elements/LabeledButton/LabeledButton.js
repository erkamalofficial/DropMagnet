import React from 'react'
import "./LabeledButton.css"

const LabeledButton = (props) => {

    return (
        <div className="btn-holder">
            <p1 className="text-field-title" 
            style={props.titleTopMargin ? { marginTop: props.titleTopMargin } : {}}>
                {props.title}
            </p1>
            <button
                className="labeled-btn"
                onClick={props.onClickBtn}
            >
                <p>{props.buttonLabel}</p>
            </button>
        </div>
    )
}

export default LabeledButton
