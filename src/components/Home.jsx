import style from './home.module.css'
import LogoRocket from '../assets/rocket.svg'
export function Home(){
    return (
        <div className={style.home}>
            <header>
                <div>
                    <img src={LogoRocket} alt="Logo Rocket" />
                    <h1>to<span>do</span></h1>
                </div>
            </header>

            <main className={style.content}>
                <div>
                    <input type="text" />
                    <button>Criar</button>
                </div>

                <div>
                    <div>
                        <p>Tarefas Criadas<span>0</span></p>
                        <p>Concluidas <span>0 de 10</span></p>
                    </div>

                    <div>
                        <h1>Voce ainda nao tem tarefas</h1>
                    </div>
                </div>
            </main>


        </div>
    )
}