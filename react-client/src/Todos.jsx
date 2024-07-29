import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import NewTask from './NewTask'
import { UserContext } from "./UserContext";

export default function Todos() {
    const { userid } = useContext(UserContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    async function loadTasks() {
        let response = await fetch(`http://localhost:3000/tasks`, {
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            credentials: 'include'
        })
        let result = await response.json();
        console.log('result', result);
        setTasks(result);
    }

    useEffect(() => {
        if (!userid) {
            navigate('/');
            return;
        }
        loadTasks();
    }, [userid]);

    function logout() {
        navigate('/')
    };

    return <div className="todo-container" >
        <h1 id="app-title">Todo App</h1>
        <NewTask tasks={tasks} setTasks={setTasks} loadTasks={loadTasks} />
        <section className="task-list" id="todo-list">
            <h2 className="task-header">To do<span id="todo-count"></span></h2>
            {tasks.filter((task) => !task.done).map((task) =>
                <Task task={task} key={task.id} loadTasks={loadTasks} />
            )}
        </section>
        <section className="task-list completed" id="done-list">
            <h2 className="task-header">Done<span id="done-count"></span></h2>
            {tasks.filter((task) => task.done).map((task) =>
                <Task task={task} key={task.id} loadTasks={loadTasks} />
            )}
        </section>
        <button className="logout-btn" onClick={logout}>Log out</button>
    </div>
}