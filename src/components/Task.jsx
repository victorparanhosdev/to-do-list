
import style from "./Task.module.css"
import { Circle, CheckCircle } from "@phosphor-icons/react";
export function Task({ ico: Icon, content, onClick, OnChangeCheckBox }) {

 
    return (
        <div className={style.listTask}>
            {content.length > 0 && content.map(tasks => {
                return (<div key={tasks.id} className={`${style.task} ${tasks.isActive ? `${style.isActiveFalse}` : ''}`}>
                    <label htmlFor={tasks.id} className={style.checkboxcontainer}>{tasks.isActive? <CheckCircle weight="fill" size={24}/> : <Circle size={24}/>}<input onChange={()=> OnChangeCheckBox(tasks.id)} type="checkbox" name="mycheckbox" id={tasks.id} /></label>
                    <p >{tasks.content}</p>
                    <button>{Icon && <Icon onClick={()=> onClick(tasks.id)} size={14} weight="bold" />}</button>
                </div>)
            })}
        </div>
    )
}
