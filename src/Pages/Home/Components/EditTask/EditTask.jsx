import React, {useState} from "react";
import {userApi} from "../../../../api/userApi.js";
import Message from "../../../../Components/Message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

function EditTask({setShowEditTask, listTasks, task}) {
    const [taskName, setTaskName] = useState(task.name);
    const [priority, setPriority] = useState(task.priority);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleAddTask() {
        try {
            await userApi.updateTask(task._id, taskName, priority);
            setSuccess("Tarefa editada com sucesso !");
            listTasks();
            handleClose();
        } catch (e) {
            setError("Erro ao editar tarefa!");
        }
    }

    function handleClose() {
        setShowEditTask(false);
    }

    return (
        <div className={'addTaskMask'}>
            <Message message={success} setMessage={setSuccess} type={'success'} />
            <Message message={error} setMessage={setError} type={'error'} />
            <div className={'addTask'}>
                <a onClick={handleClose} className={'addTask-close'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </a>
                <h2 className={'addTask-title'}>Editar Tarefa</h2>
                <div className={'addTask-inputContainer'}>
                    <label className={'addTask-label'}>Nome</label>
                    <input
                        required={true}
                        type="text"
                        value={taskName}
                        onChange={event => setTaskName(event.target.value)}
                        className={'addTask-input'}
                    />
                </div>
                <div className={'addTask-inputContainer'}>
                    <label className={'addTask-label'}>Prioridade</label>
                    <select
                        name="priority"
                        className={'addTask-input'}
                        value={priority}
                        onChange={event => setPriority(event.target.value)}
                    >
                        <option value="alta">Alta</option>
                        <option value="baixa">Baixa</option>
                    </select>
                </div>
                <button className={'addTask-button'} onClick={handleAddTask}>
                    Editar
                </button>
            </div>
        </div>
    );
}

export default EditTask;
