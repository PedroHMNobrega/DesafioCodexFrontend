import React from "react";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {logout} from "../../../../services/authentication.js";
import {useHistory} from "react-router-dom";

function Header() {
    const history = useHistory();

    async function handleLogoutClick() {
        await logout();
        history.push('/login');
    }

    return (
        <div className={'header'}>
            <div className={'header-logo'} />
            <a onClick={handleLogoutClick} className={'header-logoutContainer'}>
                <h2>Sair</h2>
                <FontAwesomeIcon icon={faSignOutAlt} size={'2x'} className={'header-logout'} />
            </a>
        </div>
    );
}

export default Header;
