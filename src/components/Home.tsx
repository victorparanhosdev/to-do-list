import style from './home.module.css'
import LogoRocket from '../assets/rocket.svg'
import { Task } from './Task'
import { PlusCircle, Trash } from "@phosphor-icons/react";
import { FormEvent, InvalidEvent, useEffect, useState } from 'react';
import { BoxEmpty } from './BoxEmpty'
import { nanoid } from 'nanoid';

export interface PropsTask {
    id: string,
    content: string,
    isActive: boolean
}


export function Home() {

    const [newTask, setTask] = useState('')
    const [arrayTask, setArrayTask] = useState<PropsTask[]>([])

    function handleTask(event: FormEvent) {
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



    function handleCheckBox(ItemID: string) {

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
    function handleNewTaskValidad(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity("Preencha este campo")
    }

    function deleteItem(itemID: string) {
        const isOk = confirm("Tem certeza que deseja excluir?")

        if (isOk) {
            setArrayTask((prevState) => {
                return prevState.filter(task => task.id !== itemID)
            })
        }

    }


    const tasksWithConglutations = arrayTask.filter(task => task.isActive === true);

    useEffect(() => {
        const localStoreTask = localStorage.getItem("@listTask:");

        let parsedTasks: PropsTask[];
        
        if (localStoreTask) {
          try {
            parsedTasks = JSON.parse(localStoreTask);
            setArrayTask(parsedTasks)

          } catch (error) {
            console.error("Erro ao fazer o parse do JSON:", error);
          }
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
                    <input name='input-infotask' onInvalid={handleNewTaskValidad} required onChange={(event) => {
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