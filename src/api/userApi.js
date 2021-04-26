import {apiUrl} from "../config/apiUrl.js";
import {getToken} from "../services/authentication.js";

async function login(email, password) {
    const body = {
        email: email,
        password: password,
    }
    const response = await postRequest(body, apiUrl + "users/login");
    return response.access_token;
}

async function logout(token) {
    await getRequest(apiUrl + "users/logout", token);
}

async function createUser(name, email, password) {
    const body = {
        name: name,
        email: email,
        password: password,
    }
    await postRequest(body, apiUrl + "users");
}

async function getTasks(token) {
    return await getRequest(apiUrl + "tasks", token);
}

async function addTask(name, priority) {
    const body = {
        name: name,
        priority: priority,
    }
    await postRequest(body, apiUrl + "tasks", getToken());
}

async function deleteTask(id) {
    await deleteRequest(apiUrl + 'task/' + id, getToken());
}

async function updateTask(id, name, priority) {
    const body = {
        name: name,
        priority: priority,
    }
    await putRequest(apiUrl + 'task/' + id, body, getToken());
}

async function getRequest(url, token) {
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(token),
    });

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message);
    }
    return result;
}

async function deleteRequest(url, token) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(token),
    });

    if(!response.status === 204) {
        throw new Error("Erro ao remover tarefa.");
    }
}

async function postRequest(body, url, token) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getHeaders(token),
    });

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message);
    }
    return result;
}

async function putRequest(url, body, token) {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: getHeaders(token),
    });

    if(!response.status === 204) {
        throw new Error("Erro ao editar tarefa.");
    }
}

function getHeaders(token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(token) {
        headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
}

export const userApi = {
    login,
    logout,
    createUser,
    getTasks,
    addTask,
    deleteTask,
    updateTask,
}
