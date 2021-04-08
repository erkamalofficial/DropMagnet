import "./TextView.css"

export default function TextView(props) {

  return (
    <div className="text-view-holder">
      <div className="text-view-title" style={props.titleTopMargin ? {marginTop: props.titleTopMargin} : {}}>{props.title}</div>
      <textarea className="text-view-form" type={"text"} style={{height: props.height ? props.height : '125px'}} onChange={(event) => props.setInputValue(event.target.value)} placeholder={props.placeholder} />
    </div>
  )
}