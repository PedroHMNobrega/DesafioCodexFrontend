import React, {useState} from "react";
import "../Login/style.css";
import {userApi} from "../../api/userApi.js";
import {useHistory} from 'react-router-dom';
import Message from "../../Components/Message";
import InputField from "../../Components/InputField";

function Cadastro(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    async function cadastrar(event) {
        event.preventDefault();
        try {
            await userApi.createUser(name, email, password);
            history.push({
                pathname: '/login',
                state: { message: "Conta criada com sucesso!" }
            })
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className={'login'}>
            <Message message={error} setMessage={setError} type={'error'} />
            <form className={'login-form'} onSubmit={cadastrar}>
                <h2 className={'login-form-title'}>Cadastrar</h2>
                <InputField
                    type={'text'}
                    placeholder={'Nome'}
                    setValue={setName}
                    value={name}
                />
                <InputField
                    type={'email'}
                    placeholder={'Email'}
                    setValue={setEmail}
                    value={email}
                />
                <InputField
                    type={'password'}
                    placeholder={'Senha'}
                    setValue={setPassword}
                    value={password}
                />
                <input type="submit" className={'login-submit login-form-input'} value={"Cadastrar"} />
            </form>
        </div>
    )
}

export default Cadastro;
