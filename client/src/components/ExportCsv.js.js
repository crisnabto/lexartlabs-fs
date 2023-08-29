import React from 'react';
import { CSVLink } from 'react-csv'; // Instale a biblioteca react-csv
import Papa from 'papaparse';

const ExportCSVPage = ({ conversations }) => {
    // Função para gerar o conteúdo CSV
    const generateCSVContent = () => {
        const csvData = [];
        csvData.push(['User', 'Message']); // Cabeçalhos

        conversations.forEach((conversation) => {
            const lastUserMessage = conversation.find((message) => message.fromUser);
            if (lastUserMessage) {
                csvData.push([
                    lastUserMessage.fromUser ? 'User' : 'Bot',
                    lastUserMessage.timestamp.toLocaleDateString(), // Adapte para obter a data correta
                    lastUserMessage.text
                ]);
            }
        });

        return csvData;
    };

    const csvContent = Papa.unparse(generateCSVContent()); // Gere o CSV

    return (
        <div>
            <h1>Export Conversation History to CSV</h1>
            <CSVLink data={csvContent} filename={'conversation_history.csv'}>Export CSV</CSVLink>
        </div>
    );
};

export default ExportCSVPage;
