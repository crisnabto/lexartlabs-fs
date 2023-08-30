export const formatMessages = (messages, userId) => {
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

    return chatData;
}