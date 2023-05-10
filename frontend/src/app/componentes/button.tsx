import { log } from "console";

export default function Button(props: any): any {
  
  return (
    <>
      <button className={props.className}
        type={props.type}
        value={props.value}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </>
  );
}
