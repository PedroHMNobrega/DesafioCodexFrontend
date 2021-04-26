import React, {useState} from "react";
import "./style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {userApi} from "../../../../api/userApi.js";
import Message from "../../../../Components/Message";

function AddTask({setShowAddTask, listTasks}) {
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState("alta");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleAddTask() {
        try {
            await userApi.addTask(taskName, priority);
            setTaskName("");
            setSuccess("Tarefa adicionada com sucesso !")
            listTasks();
        } catch (e) {
            setError("Erro ao adicionar tarefa!");
        }
    }

    function handleClose() {
        setShowAddTask(false);
    }

    return (
        <div className={'addTaskMask'}>
            <Message message={error} setMessage={setError} type={'error'} />
            <Message message={success} setMessage={setSuccess} type={'success'} />
            <div className={'addTask'}>
                <a onClick={handleClose} className={'addTask-close'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </a>
                <h2 className={'addTask-title'}>Adicionar Tarefa</h2>
                <div className={'addTask-inputContainer'}>
                    <label className={'addTask-label'}>Nome</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={event => setTaskName(event.target.value)}
                        className={'addTask-input'}
                        required={true}
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
                    Adicionar
                </button>
            </div>
        </div>
    );
}

export default AddTask;
