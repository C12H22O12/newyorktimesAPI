import { memo } from "react"
import './Button.style.css'

type ButtonProps = {
    content: string;
    handler: any
}

function Button({content, handler}:ButtonProps) {
    return <button className="DefaultBtn" onClick={handler}>{content}</button>
}

export default memo(Button)