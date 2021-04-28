import React, {useState} from "react";
import "../Login/style.css";
import {userApi} from "../../api/userApi.js";
import {useHistory} from 'react-router-dom';
import Message from "../../Components/Message";
import InputField from "../../Components/InputField";
import {faLock, faUser, faSignature} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
            <div className={'login-logo'} />
            <form className={'login-form'} onSubmit={cadastrar}>
                <h2 className={'login-form-title'}>Fazer Cadastro</h2>
                <div className={'login-inputContainer'}>
                    <FontAwesomeIcon icon={faSignature} className={'login-inputIcon'}/>
                    <InputField
                        type={'text'}
                        placeholder={'Nome'}
                        setValue={setName}
                        value={name}
                    />
                </div>
                <div className={'login-inputContainer'}>
                    <FontAwesomeIcon icon={faUser} className={'login-inputIcon'}/>
                    <InputField
                        type={'email'}
                        placeholder={'Email'}
                        setValue={setEmail}
                        value={email}
                    />
                </div>
                <div className={'login-inputContainer'}>
                    <FontAwesomeIcon icon={faLock} className={'login-inputIcon'}/>
                    <InputField
                        type={'password'}
                        placeholder={'Senha'}
                        setValue={setPassword}
                        value={password}
                    />
                </div>
                <input type="submit" className={'login-submit login-form-input'} value={"Cadastrar"} />
            </form>
        </div>
    )
}

export default Cadastro;
