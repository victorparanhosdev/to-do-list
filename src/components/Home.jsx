import style from './home.module.css'
import LogoRocket from '../assets/rocket.svg'
import { Task } from './Task'
import { PlusCircle, Trash } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';
import {BoxEmpty} from './BoxEmpty'
import { v4 as uuidv4 } from 'uuid';
export function Home() {

    const [newTask, setTask] = useState('')
    const [arrayTask, setArrayTask] = useState([])

    function handleTask() {
        event.preventDefault()

        setArrayTask(prevState => [...prevState, {
            id: uuidv4(), content: newTask, isActive: false
        }])
        setTask('')
    }

    function handleCheckBox(valueBoolean, ItemID) {
        setArrayTask((prevState) => {
          return prevState.map((itemTask) => {
            if (itemTask.id === ItemID) {
              return {
                ...itemTask,
                isActive: valueBoolean,
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
                        <p>Tarefas Criadas<span>0</span></p>
                        <p>Concluidas <span>0 de 10</span></p>
                    </div>
                    {arrayTask.length === 0 ? <BoxEmpty /> : <Task onChange={handleCheckBox} onClick={deleteItem} ico={Trash} content={arrayTask} />}


                </div>
            </main>


        </div>
    )
}