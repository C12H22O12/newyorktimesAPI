import { memo } from "react"
import './Button.style.css'

type ButtonProps = {
    content: string;
}

function Button({content}:ButtonProps) {
    return <button className="DefaultBtn">{content}</button>
}

export default memo(Button)