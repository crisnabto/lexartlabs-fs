import axios from 'axios';

const defaultPort = 3001;

const port = process.env.REACT_APP_BACKEND_PORT || defaultPort;

const api = axios.create({
  baseURL: `http://localhost:${port}`,
});

export const validateLogin = async (name, password) => {
  const result = await api.post('/login', { name, password });
  return result.data;
};

export const registerNewUser = async (name, password) => {
  const result = await api.post('/register', { name, password });
  return result.data;
};

export const getAllChats = async (id) => {
  const result = await api.get(`/chat/${id}`);
  return result.data;
};

export const getDate = async (id) => {
  const result = await api.get(`/chat-date/${id}`);
  return result.data;
}

export const saveChat = async (chatData) => {
  const result = await api.post('/chat', { chatData })
  return result.data;
}
  
