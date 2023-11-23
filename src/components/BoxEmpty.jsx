import ClipBoard from '../assets/Clipboard.svg'
import style from "./BoxEmpty.module.css"
export function BoxEmpty() {
    return (
        <div className={style.boxEmpty}>
            <img src={ClipBoard} alt="Foto Clip Board" />
            <p><strong>Você ainda não tem tarefas cadastradas</strong>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}