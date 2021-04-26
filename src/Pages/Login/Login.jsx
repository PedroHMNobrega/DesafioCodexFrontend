import React, {useEffect, useState} from "react";
import "./style.css";
import Message from "../../Components/Message";
import {login} from "../../services/authentication.js";
import {useHistory} from "react-router-dom";
import InputField from "../../Components/InputField";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(props.location.state && props.location.state.message) {
            setShowMessage(props.location.state.message);
        }
    }, []);

    async function fazerLogin(event) {
        event.preventDefault();
        try {
            await login(email, password);
            history.push('/');
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className={'login'}>
            <Message message={showMessage} setMessage={setShowMessage} type={'success'} />
            <Message message={error} setMessage={setError} type={'error'} />
            <form className={'login-form'} onSubmit={fazerLogin}>
                <h2 className={'login-form-title'}>Login</h2>
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
                <a href={'/cadastrar'} className={'login-form-link'}>Criar Conta</a>
                <input type="submit" className={'login-submit login-form-input'} value={"Login"} />
            </form>
        </div>
    );
}

export default Login;
