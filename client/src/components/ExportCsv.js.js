import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../css/chatbot.css';
import { getAllChats, getDate } from '../api/fetchApi';
import { formatDateTime } from '../utils/formatDate';
import { CSVLink } from 'react-csv';
import { useHistory } from 'react-router-dom';

const ExportCSVPage = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const history = useHistory();

    const getChatHistory = async (id) => {
        const chats = await getAllChats(id);
        const groupedByChatId = chats.reduce((result, obj) => {
            const chatId = obj.chatId;
            if (!result[chatId]) {
                result[chatId] = [];
            }
            result[chatId].push(obj);
            return result;
        }, {});
        const groupedArrays = Object.values(groupedByChatId);
        setChatHistory(groupedArrays);

        const updatedGroupedArrays = await Promise.all(
            groupedArrays.map(async (group) => {
                const chatId = group[0].chatId;
                const chat = await getDate(chatId);
                const formated = formatDateTime(chat.createdAt);
                const createdAt = chat ? formated : null;
                return group.map((obj) => ({ ...obj, createdAt }));
            })
        );

        setChatHistory(updatedGroupedArrays);
    }

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('userId'));
        getChatHistory(id);
    }, [])

    return (
        <div className="phone-simulator">
            <div className="phone-frame">
                <Header />
                <div className="chatbot-container">
                    <div className="chatbox">
                        {chatHistory.map((groupedArray, index) => (
                            <div key={index}>
                                <CSVLink data={groupedArray} filename={`export_group_${index}.csv`}>
                                    {`Conversation user #${index + 1} - ${groupedArray[0].createdAt}`}
                                </CSVLink>
                            </div>
                        ))}
                        <button onClick={() => history.push('/chatbot')} className="newchat-btn">New chat</button>

                    </div>

                </div>

            </div>
        </div>

    );
};

export default ExportCSVPage;
