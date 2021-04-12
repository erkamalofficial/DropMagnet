import "../TextField/TextField.css"

export default function PriceTextField(props) {
  return (
    <div className="text-field-holder">
      <div className="text-field-title" style={props.titleTopMargin ? {marginTop: props.titleTopMargin} : {}}>{props.title}</div>
      <p2 style={{position: "absolute", paddingLeft: '12px', paddingRight: '8px', paddingTop: '63px'}}>Ξ</p2>
      <input type={props.textFieldType ? props.textFieldType : "text"} 
             style={{paddingLeft: '28px'}}
             onChange={(event) => props.setInputValue(event.target.value)} 
             className="text-field-form" 
             placeholder={props.placeholder} />
    </div>
  )
}