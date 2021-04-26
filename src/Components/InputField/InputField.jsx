import React from "react";
import "./style.css";

function InputField({type, placeholder, value, setValue}) {
    return (
        <input
            className={'inputField'}
            type={type}
            placeholder={placeholder}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            value={value}
            required={true}
        />
    );
}

export default InputField;
