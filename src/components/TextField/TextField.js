import "./TextField.css"

export default function TextField(props) {

  return (
    <div className="text-field-holder">
      <div className="text-field-title" style={props.titleTopMargin ? {marginTop: props.titleTopMargin} : {}}>{props.title}</div>
      <input type={props.textFieldType ? props.textFieldType : "text"} onChange={(event) => props.setInputValue(event.target.value)} className="text-field-form" placeholder={props.placeholder} />
    </div>
  )
}