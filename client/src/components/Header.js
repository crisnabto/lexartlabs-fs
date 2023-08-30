import React from "react";
import lexart from '../utils/bot.png';
import { useHistory } from 'react-router-dom';
import '../css/chatbot.css';

function Header() {
    const history = useHistory();
    return (
        <div>
            <div className="header">
                <img src={lexart} alt="lexart-logo" />
                <button onClick={(() => history.push('/history'))}>Chat History</button>
            </div>
        </div>
    )
};

export default Header;