import "../TextField/TextField.css"

export default function PriceTextField(props) {
  return (
    <div className="text-field-holder">
      <div className="text-field-title" style={props.titleTopMargin ? {marginTop: props.titleTopMargin} : {}}>{props.title}</div>
      <p2 style={{position: "absolute", paddingLeft: '12px', paddingRight: '8px', paddingTop: '63px'}}>Ξ</p2>
      <input type={"number"} 
             style={{paddingLeft: '28px'}}
             onChange={(event) =>{
              if(props.isPositiveOnly && event.target.value < 0){
                 return;
               }
              props.setInputValue(event.target.value)
             }}  
             className={props.isCounterPresent ? 'text-field-form':'text-field-form no-number-counter'} 
             placeholder={props.placeholder} 
             value={props.value}
      />    
    </div>
  )
}