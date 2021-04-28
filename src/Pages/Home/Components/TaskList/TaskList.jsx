import React, {useEffect, useState} from "react";
import "./style.css";
import Task from "../Task";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {getToken, logout} from "../../../../services/authentication.js";
import {userApi} from "../../../../api/userApi.js";
import AddTask from "../AddTask";
import {useHistory} from "react-router-dom";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const history = useHistory();
    const token = getToken();

    async function listTasks() {
        try {
            const apiTasks = await userApi.getTasks(token);
            setTasks(apiTasks);
        } catch (e) {
            history.push('/login');
            await logout();
        }
    }

    useEffect(() => {
        listTasks();
    }, []);

    function handleAddTask() {
        setShowAddTask(true);
    }

    function showLabel() {
        console.log(tasks.length)
        if(tasks.length === 0) {
            return "taskList-hide";
        } else {
            return "";
        }
    }

    return (
        <>
            {showAddTask && <AddTask setShowAddTask={setShowAddTask} listTasks={listTasks} />}
            <div className={'taskList'}>
                <div className={'taskList-header'}>
                    <h1 className={'taskList-title'}>Tarefas</h1>
                    <div className={'taskList-addTask'}>
                        <a onClick={handleAddTask}>
                            <FontAwesomeIcon icon={faPlus} />
                        </a>
                    </div>
                </div>
                <div className={'taskList-list'}>
                    <div className={'taskList-labels ' + showLabel()}>
                        <h2 className={'taskList-label1'}>Prioridade</h2>
                        <h2 className={'taskList-label2'}>Tarefa</h2>
                    </div>
                    {tasks.map(task => {
                        return (
                            <Task task={task} listTasks={listTasks} key={task._id}/>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default TaskList;
