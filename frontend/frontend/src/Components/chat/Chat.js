import React, { useState, useEffect, useReducer, useContext } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { HttpHeadersContext } from '../context/HttpHeadersProvider';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import "../../css/chat.css";

const initialState = {
    messages: [],
    messageInput: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return { ...state, messages: action.payload };
        case 'ADD_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] };
        case 'SET_MESSAGE_INPUT':
            return { ...state, messageInput: action.payload };
        default:
            return state;
    }
};

const Chat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { messages, messageInput } = state;
    const { headers } = useContext(HttpHeadersContext);
    const [chatRoomId, setChatRoomId] = useState(location.state?.chatRoomId || null);
    const userId = localStorage.getItem("id");
    const [username, serUsername] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        const createChatRoomIfNeeded = async () => {
            if (!chatRoomId) {
                try {
                    const { senderId, receiverId } = location.state;
                    const response = await axios.post(`http://localhost:8080/createChatRoom`, null, {
                        params: { member1Id: senderId, member2Id: receiverId },
                        headers
                    });
                    setChatRoomId(response.data);
                } catch (error) {
                    console.error('Error creating chat room:', error);
                }
            }
        };

        createChatRoomIfNeeded();
    }, [chatRoomId, location.state, headers]);

    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new SockJS('http://localhost:8080/ws');
            const token = localStorage.getItem("bbs_access_token");
            const client = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    "Authorization": `Bearer ${token}`
                },
                onConnect: () => {
                    client.subscribe(`/topic/private/${chatRoomId}`, function (message) {
                        handleReceivedMessage(JSON.parse(message.body));
                    });
                },
                onStompError: (frame) => {
                    console.error(frame);
                },
            });

            client.activate();
            setClient(client);
        };

        if (chatRoomId) {
            connectWebSocket();
            fetchMessages(); // 페이지가 로드될 때 메시지를 불러옴
        }

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [chatRoomId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/findMessage?chatRoomId=${chatRoomId}`, { headers });
            dispatch({ type: 'SET_MESSAGES', payload: response.data });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        if (client && client.connected && messageInput.trim() !== "") {
            try {
                await client.publish({
                    destination: "/app/chat.sendMessage",
                    body: JSON.stringify({ type: "CHAT", sender: localStorage.getItem("id"), content: messageInput, roomId: chatRoomId, senderName:userId })
                });
                dispatch({ type: 'SET_MESSAGE_INPUT', payload: "" });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleReceivedMessage = (message) => {
        dispatch({ type: 'ADD_MESSAGE', payload: message });
    };

    const handleInputChange = (event) => {
        dispatch({ type: 'SET_MESSAGE_INPUT', payload: event.target.value });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <Container className="chat-container">
            <div className='chat-body'>
                {messages.map((msg, index) => (
                    <Row key={index} className="message-row">
                        <Col>
                            {msg.senderName === userId ? (
                                <div className="own-message-bubble">
                                    <p className="chat-message sender"><strong>{msg.senderName}:</strong> {msg.content}</p>
                                </div>
                            ) : (
                                <div className="other-message-bubble">
                                    <p className="chat-message"><strong>{msg.senderName}:</strong> {msg.content}</p>
                                </div>
                            )}
                        </Col>
                    </Row>
                ))}
            </div>
            <Row>
                <Col>
                    <Form className="input-container">
                        <Form.Control
                            type="text"
                            value={messageInput}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            className="message-input"
                        />
                        <Button variant="primary" onClick={sendMessage} className="send-button">Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
