import style from './home.module.css'
import LogoRocket from '../assets/rocket.svg'
import { Task } from './Task'
import { PlusCircle, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from 'react';
import { BoxEmpty } from './BoxEmpty'
import { nanoid } from 'nanoid';
export function Home() {

    const [newTask, setTask] = useState('')
    const [arrayTask, setArrayTask] = useState([])

    function handleTask() {
        event.preventDefault()

        const randomID = nanoid()

        const blockTask = {
            id: randomID,
            content: newTask,
            isActive: false
        }

        setArrayTask(prevState => [blockTask, ...prevState])
        setTask('')

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
    function handleNewTaskValidad() {
        event.target.setCustomValidity("Preencha este campo")
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

    useEffect(() => {
        const localStoreTask = JSON.parse(localStorage.getItem("@listTask:"))
        if (localStoreTask && localStoreTask.length > 0) {
            setArrayTask(localStoreTask)

        }

    }, [])

    useEffect(() => {
        localStorage.setItem("@listTask:", JSON.stringify(arrayTask));
    }, [arrayTask]);


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
                    <input onInvalid={handleNewTaskValidad} required onChange={(event) => {
                        event.target.setCustomValidity('')
                        setTask(event.target.value)
                    }} value={newTask} placeholder="Adicione uma nova tarefa" type="text" />
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