import React, {useState} from "react";
import "./style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {userApi} from "../../../../api/userApi.js";
import EditTask from "../EditTask";

function Task({task, listTasks}) {
    const [showEditTask, setShowEditTask] = useState(false);
    const priority = task.priority;
    const name = task.name;
    const id = task._id;

    function handleEdit() {
        setShowEditTask(true);
    }

    async function handleDelete() {
        try {
            await userApi.deleteTask(id);
        } catch (e) {}
        listTasks();
    }

    function getStyle() {
        if(priority === 'alta') {
            return 'task-highPriority';
        } else {
            return 'task-lowPriority';
        }
    }

    return (
        <div className={'task ' + getStyle()} id={id}>
            {showEditTask && <EditTask task={task} setShowEditTask={setShowEditTask} listTasks={listTasks} />}
            <span>{name}</span>
            <div className={'task-actions'}>
                <a onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPenAlt} className={'task-icons'}/>
                </a>
                <a onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} className={'task-icons'}/>
                </a>
            </div>
        </div>
    );
}

export default Task;
