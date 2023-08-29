export const formatMessages = (messages) => {
    console.log(messages);
    const chatData = []

    messages.map((msg) => {
        const chat = {
            userId: 1,
            message: msg.text,
            sender: msg.fromUser ? 'User' : 'Bot'
        }
        chatData.push(chat);
        return chat;
    })

    console.log(chatData);
    return chatData;
}