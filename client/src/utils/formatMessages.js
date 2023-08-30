export const formatMessages = (messages, userId) => {
    console.log(messages);
    const chatData = []

    messages.map((msg) => {
        const chat = {
            userId,
            message: msg.text,
            sender: msg.fromUser ? 'User' : 'Bot'
        }
        chatData.push(chat);
        return chat;
    })

    console.log(chatData);
    return chatData;
}