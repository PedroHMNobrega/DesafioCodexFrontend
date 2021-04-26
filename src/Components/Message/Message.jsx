import React, {useEffect, useState} from "react";
import "./style.css";

function Message({message, setMessage, type}) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if(message !== '') {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setMessage('');
            }, 4000);
        }
    }, [message, setMessage]);

    function getClass() {
        switch (type) {
            case 'success':
                return 'message-success';
            case 'error':
                return 'message-error';
            default:
                return 'message-alert';
        }
    }

    function getContent() {
        if(showMessage) {
            return (
                <div className={'message ' + getClass()}>
                    <h2 className={'message-text'}>{message}</h2>
                </div>
            );
        }
        return null;
    }

    return getContent();
}

export default Message;
