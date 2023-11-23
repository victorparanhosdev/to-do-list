import style from './home.module.css'
import LogoRocket from '../assets/rocket.svg'
import { Task } from './Task'
import { PlusCircle, Trash } from "@phosphor-icons/react";
import { useState} from 'react';
import {BoxEmpty} from './BoxEmpty'
import { nanoid } from 'nanoid';
export function Home() {

    const [newTask, setTask] = useState('')
    const [arrayTask, setArrayTask] = useState([])

    function handleTask() {
        event.preventDefault()
        const randomID = nanoid(); 
        setArrayTask(prevState => [...prevState, {
            id: randomID, content: newTask, isActive: false
        }])
        setTask('')
        //handleLocalStoreTask()
    }

    function handleLocalStoreTask(){
        const localStoreTask = JSON.parse(localStorage.getItem("@listTask:"))
        //localStorage.setItem("@listTask:", JSON.stringify(arrayTask))

    }

    function handleCheckBox(ItemID) {
        setArrayTask((prevState) => {
          return prevState.map((itemTask) => {
            if (itemTask.id === ItemID) {
                let variavel = itemTask.isActive
              return {
                ...itemTask,
                isActive: !variavel,
              };
            }
            return itemTask; // Retorna o item inalterado para os outros casos
          });
        });
     
      }

    function deleteItem(itemID) {
        event.preventDefault()
        const isOk = confirm("Tem certeza que deseja excluir?")

        if (isOk) {
            setArrayTask((prevState) => {
                return prevState.filter(task => task.id !== itemID)
            })
        }

    }
    const tasksWithConglutations = arrayTask.filter(task => task.isActive === true);

    return (
        <div className={style.home}>
            <header>
                <div className={style.logo}>
                    <img src={LogoRocket} alt="Logo Rocket" />
                    <h1>to<span>do</span></h1>
                </div>
            </header>

            <main className={style.content}>
                <form onSubmit={handleTask} className={style.inputnewtask}>
                    <input required onChange={(e) => setTask(e.target.value)} value={newTask} placeholder="Adicione uma nova tarefa" type="text" />
                    <button type='submit'>Criar <PlusCircle size={16} weight="bold" /></button>
                </form>

                <div className={style.boxtask}>
                    <div className={style.taskOption}>
                        <p>Tarefas Criadas<span>{arrayTask.length}</span></p>
                        <p>Concluídas <span>{tasksWithConglutations.length} de {arrayTask.length}</span></p>
                    </div>
                    {arrayTask.length === 0 ? <BoxEmpty /> : <Task OnChangeCheckBox={handleCheckBox} onClick={deleteItem} ico={Trash} content={arrayTask} />}


                </div>
            </main>


        </div>
    )
}