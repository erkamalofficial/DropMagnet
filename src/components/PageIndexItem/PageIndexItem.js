import "./PageIndexItem.css";

export default function PageIndexItem(props) {

  return (
    <div className={props.selected ? "index-item-selected" : "index-item"}>
      {props.index}
    </div>
  )
}