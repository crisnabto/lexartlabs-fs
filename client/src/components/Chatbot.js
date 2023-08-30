import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateLogin, registerNewUser } from '../api/fetchApi';
import { formatMessages } from '../utils/formatMessages';
import { loanOptions } from '../utils/loanOptions';
import { saveChat } from '../api/fetchApi';
import Header from './Header';
import '../css/chatbot.css';
import { saveToLocal } from '../utils/saveToLocal';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [ellipsisText, setEllipsisText] = useState('');
    const [showEllipsis, setShowEllipsis] = useState(false);
    const [login, setLogin] = useState(false);
    const [getUserName, setUserName] = useState('');
    const [firstMessage, setFirstMessage] = useState(true);
    const [passMsg, setPassMsg] = useState(false);
    const [loanOption, setLoanOption] = useState({ url: '', text: '' });
    const [userId, setUserId] = useState();
    const [register, setRegister] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();

    const validateMessage = (userMessage, botMessage1, fromUser, type, botMessage2) => {
        setTimeout(() => {
            let botResponses = { text: botMessage1, fromUser, type };

            if (botMessage2) {
                setMessages([...messages, userMessage, botMessage1, botMessage2]);
            } else {
                setMessages([...messages, userMessage, botResponses]);
            }
            setShowEllipsis(false);
        }, 1500);
    }

    const validatePassword = (newMessage) => {
        validateMessage(newMessage, `Hello, ${newMessage.text}! Now please tell me your password: `, false, 'text', undefined)
        setPassMsg(false);
        setLogin(true);
    }

    const validateUserData = (newMessage) => {
        setTimeout(async () => {
            const botResponse1 = { text: `Please wait...`, fromUser: false, type: 'text' };
            // validateMessage(newMessage, botResponse1.text, false, 'text');
            const message = { text: '********', fromUser: true, type: 'text' };
            setMessages([...messages, message, botResponse1]);
            let passwordIsValid;
            try {
                const data = await validateLogin(getUserName, newMessage.text);
                setUserId(data.id);
                saveToLocal('userId', data.id);
                passwordIsValid = true;
            } catch (error) {
                passwordIsValid = false;
            }

            const botResponse2Text = passwordIsValid
                ? `All good! How can I help you today, ${getUserName}?`
                : 'Invalid fields. Please try again or type Register to sign up';
            const botResponse = { text: botResponse2Text, fromUser: false, type: 'text' }

            validateMessage(message, botResponse1, false, 'text', botResponse);
            if (!passwordIsValid) {
                setPassMsg(false);
                setLogin(true);
            } else {
                setLogin(false);
            }
        }, 1500);
    };

    const registerUser = async (input) => {
        const parts = input.split(' ');
        const username = parts[0];
        const password = parts[1];
        const id = await registerNewUser(username, password);
        setUserId(id.id);
        const newMessage = { text: '**** ****', fromUser: true, type: 'text' };
        setMessages([...messages, newMessage]);
        setShowEllipsis(true);
        validateMessage(newMessage, `Registered successfully! How can I help you today, ${id.name}?`, false, 'text');
        saveToLocal('userId', id.id);
        setUserName(id.name);
        setNewUser(false);
        setLogin(false);
        setPassMsg(false)
    }

    const setRegisterAndNewUser = (newMessage, setRegister, setNewUser, validateMessage) => {
        setRegister(true);
        validateMessage(newMessage, 'Sure! Please provide a username and a password. Make sure to separate them with a space. ', false, 'text');
        setNewUser(true);
    };

    const setPassMsgAndValidateFirstMessage = (newMessage, setPassMsg, setFirstMessage, validateMessage) => {
        setPassMsg(true);
        validateMessage(newMessage, 'Hello! To start a conversation please tell me your username or type Register to sign up:  ', false, 'text');
        setFirstMessage(false);
    };

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const terms = ['hello', 'good', 'i want'];
        const newMessage = { text: inputMessage, fromUser: true, type: 'text' };

        setMessages([...messages, newMessage]);
        setInputMessage('');
        setShowEllipsis(true);

        if (inputMessage.toLowerCase().includes('register') && !firstMessage) {
            setRegisterAndNewUser(newMessage, setRegister, setNewUser, validateMessage);
        } else if (newUser) {
            registerUser(inputMessage)
        }
        else if (passMsg && !register) {
            setUserName(newMessage.text);
            validatePassword(newMessage);
        }
        else if (login) {
            validateUserData(newMessage);
        }
        else if (terms.some((word) => inputMessage.toLowerCase().includes(word)) && firstMessage) {
            setPassMsgAndValidateFirstMessage(newMessage, setPassMsg, setFirstMessage, validateMessage);
        }
        else if (inputMessage.toLowerCase().includes('loan') && !firstMessage && !newUser) {
            validateMessage(newMessage, ['Do you want to apply for a loan?', 'Loan conditions', 'Help'], false, 'options')
        }
        else if (inputMessage.toLowerCase().includes('goodbye') && !firstMessage && !passMsg) {
            const chatHistory = formatMessages(messages, userId);
            saveChat(chatHistory);
            validateMessage(newMessage, 'See you! I hope my assistance has been helpful.', false, 'goodbye')
        } else {
            validateMessage(newMessage, 'Sorry, I didn\'t understand your message.', false, 'text')
        }
    };

    useEffect(() => {
        sendMessage();
    }, []);

    useEffect(() => {
        let interval;
        if (showEllipsis) {
            let dots = '';
            interval = setInterval(() => {
                dots = dots.length < 3 ? dots + '.' : '';
                setEllipsisText(dots);
            }, 300);
        } else {
            clearInterval(interval);
            setEllipsisText('');
        }
        return () => {
            clearInterval(interval);
        };
    }, [showEllipsis]);

    const handleOptionClick = (option) => {
        const { loanOption, newMessage, botMessage, link } = loanOptions(option);
        setLoanOption(loanOption)
        setMessages([...messages, newMessage]);
        setShowEllipsis(true);
        validateMessage(newMessage, [botMessage, link], false, 'loan');
    };

    return (
        <div className="phone-simulator">
            <div className="phone-frame">
                <Header />
                <div className="chatbot-container">
                    <div className="chatbox">
                        {messages.map((message, messageIndex) => (
                            <div key={messageIndex} className={message.fromUser ? 'user-message' : 'bot-message'}>
                                {message.type === 'text' ? (
                                    message.text
                                ) : message.type === 'options' ? (
                                    <div key={messageIndex}>
                                        Here are some options I found about loans:
                                        <p></p>
                                        {message.text.map((option, optionIndex) => (
                                            <div key={optionIndex}>
                                                <button
                                                    onClick={() => handleOptionClick(optionIndex)}
                                                    className="loan-button"
                                                >
                                                    {option}
                                                </button>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                ) : message.type === 'loan' ? (
                                    <div>
                                        {message.text[0]}
                                        <a href={loanOption.url} target="_blank" rel="noopener noreferrer">
                                            {message.text[1]}
                                        </a>
                                    </div>
                                ) : message.type === 'goodbye' ? (
                                    <div>
                                        {message.text}
                                        <br />
                                        <button
                                            onClick={() => history.push('/history')}
                                            className="loan-button"
                                        >
                                            Chat history
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        ))}

                        {showEllipsis && <div className="loading-ellipsis ellipsis-dot">{ellipsisText}</div>}

                    </div>

                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Say hello..."
                        value={inputMessage}
                        disabled={showEllipsis}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                    />
                    <button
                    className='history-btn'
                        onClick={sendMessage}
                        disabled={showEllipsis}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Chatbot;
