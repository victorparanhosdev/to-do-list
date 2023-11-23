import style from "./Task.module.css"
import { useEffect, useState } from "react"
export function Task({ ico: Icon, content, onClick, onChange }) {
    const [stateCheckBox, setStateCheckbox] = useState(true)

    function handleState(itemID){
       setStateCheckbox(!stateCheckBox)
       onChange(stateCheckBox, itemID)
    }

    return (
        <div className={style.listTask}>
            {content.length > 0 && content.map(tasks => {
                return (<div key={String(tasks.id)} className={`${style.task} ${tasks.isActive ? style.isActiveFalse : ''
                  }`}>
                    <label className={style.checkboxcontainer}><input onChange={()=> handleState(tasks.id)} type="checkbox" name="" id="" /></label>
                    <p >{tasks.content}</p>
                    <button>{Icon && <Icon onClick={()=> onClick(tasks.id)} size={14} weight="bold" />}</button>
                </div>)
            })}
        </div>
    )
}
